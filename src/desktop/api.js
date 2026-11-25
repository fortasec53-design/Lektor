/**
 * API de la app instalada. No importa mockApi: los datos ficticios de la
 * demo web no entran en este paquete.
 */
import { catalogoConectores, validarConector } from "../recuperado/interfaz.jsx";
import { libroTabla, libroXlsx } from "../exportar/xlsx.js";
import { leerBytes } from "../ocr/leerArchivo.js";
import { crearAlmacen } from "./almacen.js";

const CAMPOS_PLANTILLA = [
  "Código",
  "Actividad",
  "Responsable",
  "Paso",
  "Fecha del paso",
  "Estado",
];

export async function crearApiEscritorio() {
  const almacen = await crearAlmacen({
    cargar: () => window.lektor.datos.cargar(),
    guardar: (datos) => window.lektor.datos.guardar(datos),
    guardarHoja: (id, vista) => window.lektor.datos.guardarHoja(id, vista),
    leerHoja: (id) => window.lektor.datos.leerHoja(id),
    leerArchivo: (ruta) => window.lektor.leerArchivo(ruta),
  });
  almacen.definirLector(async (ruta) => {
    const bytes = await window.lektor.leerArchivo(ruta);
    const nombre = String(ruta).split(/[\\/]/).pop();
    return leerBytes(bytes, nombre);
  });
  let ultimoExcel = null;

  return {
    call: async (comando, payload) => {
      if (comando === "exportar_lote") {
        const filas = almacen.filasDeLote(payload?.lote_id);
        await almacen.call("exportar_lote", payload);
        ultimoExcel = {
          nombre: `lote-${payload?.lote_id || "encuestas"}.xlsx`,
          bytes: libroXlsx(filas),
        };
        const completas = filas.filter((fila) => fila.valor !== "" && !fila.aviso).length;
        return { ruta: ultimoExcel.nombre, filas: filas.length, completas };
      }
      return almacen.call(comando, payload);
    },
    seguimiento: almacen.seguimiento,
    async openPdf() {
      return window.lektor.abrirPdf();
    },
    async openExcel() {
      const [ruta] = await window.lektor.abrir({
        titulo: "Cargar Excel de avance",
        filtros: [{ name: "Excel o CSV", extensions: ["xlsx", "csv"] }],
      });
      return ruta || "";
    },
    async openJson() {
      const [ruta] = await window.lektor.abrir({
        titulo: "Formato de encuesta",
        filtros: [{ name: "JSON", extensions: ["json"] }],
      });
      return ruta || "";
    },
    async openImage() {
      const [ruta] = await window.lektor.abrir({
        titulo: "Imagen de la hoja en blanco",
        filtros: [{ name: "Imagen", extensions: ["png", "jpg", "jpeg"] }],
      });
      return ruta || "";
    },
    async openArchivos() {
      return window.lektor.abrir({
        titulo: "Elegir archivos",
        multiple: true,
        filtros: [{ name: "Documentos", extensions: ["pdf", "png", "jpg", "jpeg", "txt", "csv", "xlsx"] }],
      });
    },
    async openSubida() {
      const [ruta] = await window.lektor.abrir({ titulo: "Subir un archivo", multiple: false });
      return ruta || null;
    },
    rutaDe(archivo) {
      return window.lektor.rutaDeArchivo(archivo) || archivo?.name || "";
    },
    async guardarExportacion() {
      if (!ultimoExcel) return null;
      return window.lektor.guardarBytes(ultimoExcel);
    },
    async guardarPlantillaExcel() {
      return window.lektor.guardarBytes({
        nombre: "plantilla-avance.xlsx",
        bytes: libroTabla(CAMPOS_PLANTILLA, []),
      });
    },
    subir: async () => ({ id: 0, duplicado: false, caracteres: 0 }),
    conectores: conectoresPropios(almacen),
    actualizador: actualizadorEscritorio(),
    asistente: asistenteApagado(),
    cerebro: {
      async entrar(correo) {
        const usuarios = await almacen.call("list", { table: "usuarios" });
        const admin = usuarios.find((u) => u.rol === "admin" && u.email === String(correo).trim());
        return { ok: Boolean(admin) };
      },
      async llamar(_correo, accion) {
        if (accion === "listar") return [];
        return { ok: true };
      },
    },
    async brand() {
      return { productName: "Lector de encuestas", shortName: "Lector" };
    },
  };
}

function conectoresPropios(almacen) {
  const noop = () => () => {};
  return {
    catalogo: async () => catalogoConectores.map((c) => ({ ...c, configurado: true })),
    lista: async () => almacen.conectores.lista().map((c) => ({ ...c, alcances: [] })),
    async guardar(entrada) {
      const errores = validarConector(String(entrada.tipo), entrada.cfg ?? {});
      if (errores.length) throw new Error(errores.join(" · "));
      return { ...(await almacen.conectores.guardar(entrada)), alcances: [] };
    },
    borrar: async (id) => almacen.conectores.borrar(id),
    conectar: async (id) => almacen.conectores.conectar(id),
    desconectar: async (id) => almacen.conectores.desconectar(id),
    probar: async (id) => {
      const c = almacen.conectores.lista().find((item) => item.id === id);
      return c?.conectado
        ? { ok: true, detalle: `${c.nombre} está marcada como conectada en este equipo.` }
        : { ok: false, detalle: "Aún no está conectada." };
    },
    listar: async () => [],
    traer: async () => {
      throw new Error("No hay archivos de ejemplo. Elige un archivo de tu equipo.");
    },
    carpetaLocal: async () => "",
    elegir: async () => [],
    enviar: async () => "No se envió nada.",
    alNuevo: noop,
    alBandeja: noop,
  };
}

function asistenteApagado() {
  const config = {
    habilitado: false,
    consentimiento: false,
    proveedor: "ollama",
    base: "http://127.0.0.1:11434/v1",
    modelo: "",
    tieneLlave: false,
    conLlave: [],
    sesion: [],
    googleConfigurado: false,
    proveedores: [
      { id: "ollama", nombre: "En este equipo · Ollama", base: "http://127.0.0.1:11434/v1" },
      { id: "lmstudio", nombre: "En este equipo · LM Studio", base: "http://127.0.0.1:1234/v1" },
    ],
    demo: false,
  };
  return {
    config: async () => config,
    guardar: async (cambio) => Object.assign(config, cambio),
    preguntar: async () => ({ ok: false, necesita: "activar", error: "La IA está apagada." }),
    proponer: async () => ({ error: "No hay propuestas automáticas. Crea el cambio en Seguimiento." }),
    aplicar: async () => ({ ok: false }),
    cancelar: async () => ({ ok: true }),
    modelos: async () => ({ ok: false, modelos: [], error: "No hay un modelo configurado en este equipo." }),
    probar: async () => ({ ok: false, mensaje: "La IA está apagada.", modelos: [] }),
    detectarLocales: async () => [],
    iniciarSesion: async () => ({ ok: false, error: "Inicia sesión en el proveedor desde tu equipo. No hay una sesión de ejemplo." }),
    cerrarSesion: async () => config,
    abrirXai: async () => false,
    cancelarXai: async () => true,
    alCodigoXai: () => () => {},
  };
}

function actualizadorEscritorio() {
  const puente = window.lektor.actualizador;
  return {
    info: () => puente.info(),
    buscar: () => puente.buscar(),
    descargar: () => puente.descargar(),
    instalar: () => puente.instalar(),
    canal: (correo, canal) => puente.canal(correo, canal),
    alCambiar: (cb) => puente.alCambiar(cb),
    alAbrir: (cb) => puente.alAbrir(cb),
    estado: () => puente.info(),
    activar: async () => puente.info(),
  };
}
