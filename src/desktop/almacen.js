/**
 * Datos de la app instalada. Empieza vacío y se guarda en la carpeta de
 * usuario (userData), nunca dentro del programa ni con proyectos de ejemplo.
 */
import { camposTabla, leerTabla, sugerirMapeo } from "./tabla.js";

const OPCIONES = `1	Sí
2	No
9	No sabe`;

export function estadoVacio() {
  return {
    version: 1,
    proyectos: [],
    activo: null,
    usuarios: [],
    instrumentos: [],
    lotes: [],
    documentos: [],
    paginas: [],
    respuestas: [],
    exportaciones: [],
    config: {},
    seguimiento: {},
    locales: {},
    bandeja: [],
    libro: [],
    chats: [],
    cambios: [],
    conectores: [],
    memorias: [],
    asistente: {
      habilitado: false,
      consentimiento: false,
      proveedor: "ollama",
      base: "http://127.0.0.1:11434/v1",
      modelo: "",
    },
  };
}

export async function crearAlmacen({ cargar, guardar, guardarHoja, leerHoja, leerArchivo }) {
  const estado = (await cargar()) ?? estadoVacio();
  for (const clave of Object.keys(estadoVacio())) {
    if (estado[clave] === undefined) estado[clave] = estadoVacio()[clave];
  }
  const imagenes = new Map();
  const tablas = new Map();
  let lector = null;
  let sucio = false;

  function persistir() {
    sucio = true;
  }

  async function flush() {
    if (!sucio) return;
    sucio = false;
    await guardar(JSON.parse(JSON.stringify(estado)));
  }

  function id(lista) {
    return lista.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
  }

  function segDe(proyectoId) {
    const clave = String(proyectoId ?? estado.activo ?? "");
    if (!estado.seguimiento[clave]) {
      estado.seguimiento[clave] = { n: 1, acts: [], eventos: [] };
    }
    return estado.seguimiento[clave];
  }

  function exigirProyecto() {
    if (!estado.proyectos.length) {
      throw new Error("Aún no hay proyectos. Crea uno para empezar.");
    }
  }

  async function hoja(paginaId) {
    if (imagenes.has(paginaId)) return imagenes.get(paginaId);
    const guardada = leerHoja ? await leerHoja(paginaId) : null;
    if (guardada) imagenes.set(paginaId, guardada);
    return guardada;
  }

  async function call(comando, payload = {}) {
    const r = await ejecutar(comando, payload);
    await flush();
    return r;
  }

  async function ejecutar(comando, t) {
    if (comando.startsWith("chat_")) return chats(comando, t);
    if (comando.startsWith("bandeja_") || comando.startsWith("libro_")) return bandeja(comando, t);
    if (comando.startsWith("seg_")) return await seguimientoCmd(comando, t);
    switch (comando) {
      case "estado_inicial":
        return { usuarios: estado.usuarios.length, proyectos: estado.proyectos.length };
      case "primer_arranque":
        return primerArranque(t);
      case "proyectos":
        return { activo: estado.activo, proyectos: estado.proyectos };
      case "proyecto_activar": {
        exigirProyecto();
        const proyecto = estado.proyectos.find((p) => p.id === Number(t.id));
        if (!proyecto) throw new Error("Ese proyecto no existe.");
        estado.activo = proyecto.id;
        persistir();
        return { activo: estado.activo, proyectos: estado.proyectos };
      }
      case "proyecto_config":
        return {
          proyecto: estado.proyectos.find((p) => p.id === estado.activo) ?? null,
          config: estado.config[estado.activo] ?? configVacia(),
        };
      case "proyecto_guardar_config":
        estado.config[estado.activo] = t.config ?? configVacia();
        persistir();
        return { config: estado.config[estado.activo] };
      case "stats":
        return {
          proyectos: estado.proyectos.length,
          instrumentos: estado.instrumentos.length,
          lotes: estado.lotes.length,
          documentos: estado.documentos.length,
          paginas: estado.paginas.length,
          respuestas: estado.respuestas.length,
          en_revision: estado.respuestas.filter((r) => r.aviso && r.valor == null).length,
          usuarios: estado.usuarios.length,
          db: "este equipo",
        };
      case "list":
        return listar(String(t.table || ""));
      case "tablero":
        return { actividades: [], cobertura: [], kpis: {} };
      case "cambios":
        return estado.cambios.filter((c) => !t.estado || c.estado === t.estado);
      case "subidas":
        return [];
      case "crear_lote":
        return crearLote(t);
      case "registrar_pdf":
        return registrarPdf(t);
      case "procesar_documento":
        return procesar(t);
      case "pagina_imagen":
        return (await hoja(Number(t.pagina_id))) ?? { imagen: null };
      case "cola_revision":
        return cola();
      case "revisar":
        return revisar(t);
      case "cola_accion":
        return colaAccion(t);
      case "exportar_lote":
        return { filas: filasDeLote(t.lote_id) };
      case "guardar_usuario":
        return guardarUsuario(t);
      case "importar_plantilla":
        return importarPlantilla(t);
      case "cambio_manual":
        estado.cambios.push({
          ...t,
          id: id(estado.cambios),
          fecha: new Date().toISOString().slice(0, 19),
          estado: "aplicado",
          confianza: 1,
        });
        persistir();
        return { ok: true };
      case "cambio_resolver": {
        const cambio = estado.cambios.find((c) => c.id === Number(t.id));
        if (!cambio) throw new Error("Ese cambio no existe.");
        cambio.estado = t.accion === "rechazar" ? "rechazado" : "aplicado";
        persistir();
        return cambio;
      }
      case "control_conciliar":
        return {
          lotes: estado.lotes.map((lote) => ({
            lote_id: lote.id,
            leidas: estado.paginas.filter((p) =>
              estado.documentos.some((d) => d.id === p.documento_id && d.lote_id === lote.id),
            ).length,
            en_revision: pendientesDe(lote.id),
            diferencia: 0,
            estado: lote.estado,
          })),
          totales: {
            esperado: estado.lotes.length,
            leidas: estado.paginas.length,
          },
        };
      case "control_esperado":
        return { ok: true };
      case "control_informe":
        return { celdas: 0, correctas: 0, porcentaje: 0, paginas: 0, errores: [] };
      case "control_muestra":
        return { paginas: [] };
      case "control_verificar":
        return { ok: true };
      case "control_exportar":
        return { ruta: "" };
      case "marcar_paso":
        return { ok: true };
      default:
        throw new Error(`Comando no disponible (${comando}).`);
    }
  }

  function configVacia() {
    return { seguimiento: { api_url: "", estaticos_url: "" }, instrumento_id: null };
  }

  function primerArranque(t) {
    if (estado.proyectos.length) throw new Error("Esta instalación ya tiene un proyecto.");
    const admin = t.admin ?? {};
    const proyecto = t.proyecto ?? {};
    if (!String(admin.nombre || "").trim() || !/^\S+@\S+\.\S+$/.test(String(admin.email || ""))) {
      throw new Error("Escribe el nombre y un correo válido.");
    }
    if (!String(proyecto.codigo || "").trim() || !String(proyecto.nombre || "").trim()) {
      throw new Error("El proyecto necesita código y nombre.");
    }
    const usuario = {
      id: 1,
      nombre: admin.nombre.trim(),
      email: admin.email.trim(),
      rol: "admin",
    };
    const proy = {
      id: 1,
      codigo: proyecto.codigo.trim(),
      nombre: proyecto.nombre.trim(),
    };
    estado.usuarios = [usuario];
    estado.proyectos = [proy];
    estado.activo = proy.id;
    estado.instrumentos = [plantillaEnBlanco(proy.id)];
    estado.config[proy.id] = { ...configVacia(), instrumento_id: 1 };
    persistir();
    return { ok: true, proyecto: proy };
  }

  function plantillaEnBlanco(proyectoId) {
    return {
      id: 1,
      proyecto_id: proyectoId,
      codigo: "PLANTILLA",
      version: "1",
      paginas: 1,
      activo: true,
      notas:
        "Plantilla en blanco. Lector busca preguntas P1, P2… y las opciones 1 Sí, 2 No y 9 No sabe. No incluye encuestas de ejemplo.",
      plantilla_json: JSON.stringify({
        nombre: "Plantilla en blanco",
        opciones: ["1\tSí", "2\tNo", "9\tNo sabe"],
      }),
    };
  }

  function listar(tabla) {
    const mapa = {
      instrumentos: estado.instrumentos.filter((i) => i.activo !== false),
      lotes: estado.lotes,
      exportaciones: estado.exportaciones,
      usuarios: estado.usuarios,
      documentos: estado.documentos,
      proyectos: estado.proyectos,
    };
    return [...(mapa[tabla] ?? [])].reverse();
  }

  function crearLote(t) {
    exigirProyecto();
    const instrumento = estado.instrumentos.find((i) => i.activo !== false);
    if (!instrumento) {
      throw new Error(
        "Aún no hay un formato de encuesta. Agrégalo en «1 · Subir lote».",
      );
    }
    const lote = {
      id: id(estado.lotes),
      instrumento_id: Number(t.instrumento_id) || instrumento.id,
      proyecto_id: estado.activo,
      estado: "pendiente",
      creado_en: new Date().toISOString().slice(0, 10),
    };
    estado.lotes.push(lote);
    persistir();
    return { id: lote.id };
  }

  const pendientesPdf = new Map();

  function registrarPdf(t) {
    const nombre = String(t.ruta ?? "").split(/[\\/]/).pop() || "archivo.pdf";
    if (estado.documentos.some((d) => d.nombre === nombre && d.lote_id === Number(t.lote_id))) {
      return { id: -1, duplicado: true, lote_id: t.lote_id, ruta: t.ruta };
    }
    const nuevo = id([...estado.documentos, ...[...pendientesPdf.values()]]);
    pendientesPdf.set(nuevo, { id: nuevo, lote_id: Number(t.lote_id), ruta: t.ruta, nombre });
    return { id: nuevo, duplicado: false, lote_id: t.lote_id, ruta: t.ruta };
  }

  async function procesar(t) {
    const pend = pendientesPdf.get(t.documento_id);
    if (!pend) throw new Error(`No hay PDF registrado (${t.documento_id}).`);
    if (!lector) throw new Error("La lectura de PDF no está disponible.");
    const lectura = await lector(pend.ruta);
    const doc = {
      id: pend.id,
      lote_id: pend.lote_id,
      nombre: pend.nombre,
      n_paginas: lectura.paginas.length,
      dpi: lectura.dpi || 144,
    };
    estado.documentos.push(doc);
    let dudosas = 0;
    for (const pagina of lectura.paginas) {
      const paginaId = id(estado.paginas);
      estado.paginas.push({
        id: paginaId,
        documento_id: doc.id,
        folio: pagina.folio || `F${String(pagina.num).padStart(3, "0")}`,
        num: pagina.num,
      });
      const vista = { imagen: pagina.imagen, ancho: pagina.ancho, alto: pagina.alto };
      imagenes.set(paginaId, vista);
      if (guardarHoja) await guardarHoja(paginaId, vista);
      for (const celda of pagina.celdas) {
        if (celda.aviso && (celda.valor == null || celda.valor === "")) dudosas++;
        estado.respuestas.push({
          id: id(estado.respuestas),
          pagina_id: paginaId,
          clave: celda.clave,
          valor: celda.valor == null || celda.valor === "" ? null : String(celda.valor),
          aviso: celda.aviso || null,
          confianza: celda.confianza ?? null,
          tintas: JSON.stringify(celda.tintas || []),
          bbox_x: celda.bbox?.x ?? 0,
          bbox_y: celda.bbox?.y ?? 0,
          bbox_w: celda.bbox?.w ?? 0,
          bbox_h: celda.bbox?.h ?? 0,
          documento: doc.nombre,
          pagina_num: pagina.num,
          lote_id: doc.lote_id,
          folio: pagina.folio,
          opciones: celda.opciones || OPCIONES,
        });
      }
    }
    const lote = estado.lotes.find((l) => l.id === doc.lote_id);
    if (lote) lote.estado = pendientesDe(lote.id) ? "en_revision" : "procesado";
    pendientesPdf.delete(t.documento_id);
    persistir();
    return { documento_id: doc.id, paginas: doc.n_paginas, en_revision: dudosas };
  }

  function pendientesDe(loteId) {
    const docs = new Set(estado.documentos.filter((d) => d.lote_id === loteId).map((d) => d.id));
    const pags = new Set(estado.paginas.filter((p) => docs.has(p.documento_id)).map((p) => p.id));
    return estado.respuestas.filter((r) => pags.has(r.pagina_id) && r.aviso && r.valor == null).length;
  }

  function cola() {
    return estado.respuestas
      .filter((r) => r.aviso && r.valor == null)
      .map((r) => {
        const pagina = estado.paginas.find((p) => p.id === r.pagina_id);
        return { ...r, folio: r.folio ?? pagina?.folio, opciones: r.opciones || OPCIONES };
      });
  }

  function revisar(t) {
    const celda = estado.respuestas.find((r) => r.id === t.respuesta_id);
    if (celda) {
      celda.valor = t.despues == null ? null : String(t.despues);
      celda.aviso = null;
    }
    for (const lote of estado.lotes) {
      if (lote.estado === "en_revision" && !pendientesDe(lote.id)) lote.estado = "procesado";
    }
    persistir();
    return { id: t.respuesta_id, valor: t.despues };
  }

  function colaAccion(t) {
    const lote = estado.lotes.find((l) => l.id === Number(t.lote_id));
    if (!lote) throw new Error("Ese lote no existe.");
    const anterior = lote.estado;
    if (t.accion === "cancelar") lote.estado = "cancelado";
    else if (t.accion === "reanudar") lote.estado = "pendiente";
    else if (lote.estado === "cancelado") throw new Error("El lote está cancelado: reanúdalo primero.");
    else lote.estado = pendientesDe(lote.id) ? "en_revision" : "procesado";
    persistir();
    return { lote_id: lote.id, anterior, estado: lote.estado, documentos: [] };
  }

  function guardarUsuario(t) {
    const usuario = {
      id: id(estado.usuarios),
      nombre: String(t.nombre || "").trim(),
      email: String(t.email || "").trim(),
      rol: t.rol || "revisor",
    };
    estado.usuarios.push(usuario);
    persistir();
    return { id: usuario.id };
  }

  async function importarPlantilla(t) {
    const nombre = String(t.ruta_json || "plantilla.json").split(/[\\/]/).pop();
    let codigo = nombre.replace(/\.json$/i, "").slice(0, 20) || "PLANTILLA";
    let titulo = "Formato propio";
    if (leerArchivo && t.ruta_json) {
      try {
        const bytes = await leerArchivo(t.ruta_json);
        const json = JSON.parse(new TextDecoder("utf-8").decode(bytes));
        if (json.codigo) codigo = String(json.codigo).slice(0, 20);
        if (json.nombre) titulo = String(json.nombre);
      } catch {
        /* el nombre del archivo basta; no se inventan respuestas */
      }
    }
    const instrumento = {
      id: id(estado.instrumentos),
      proyecto_id: estado.activo,
      codigo,
      version: "1",
      paginas: 1,
      activo: true,
      notas: titulo,
      plantilla_json: JSON.stringify({ nombre: titulo, opciones: ["1\tSí", "2\tNo", "9\tNo sabe"] }),
    };
    estado.instrumentos.push(instrumento);
    persistir();
    return { items: 3, casillas: 0, blank: t.ruta_blank || "" };
  }

  function filasDeLote(loteId) {
    const docs = estado.documentos.filter((d) => !loteId || d.lote_id === Number(loteId));
    const porDoc = new Map(docs.map((d) => [d.id, d]));
    const pags = estado.paginas.filter((p) => porDoc.has(p.documento_id));
    const porPag = new Map(pags.map((p) => [p.id, p]));
    return estado.respuestas
      .filter((r) => porPag.has(r.pagina_id))
      .map((r) => {
        const pagina = porPag.get(r.pagina_id);
        const doc = porDoc.get(pagina.documento_id);
        return {
          lote_id: doc.lote_id,
          documento: doc.nombre,
          folio: pagina.folio ?? "",
          pagina: pagina.num,
          clave: r.clave,
          valor: r.valor == null ? "" : String(r.valor),
          aviso: r.aviso ?? "",
          confianza: r.confianza ?? "",
        };
      });
  }

  function chats(comando, t) {
    if (comando === "chat_listar") return estado.chats.filter((c) => !c.borrado);
    if (comando === "chat_crear") {
      const chat = {
        id: id(estado.chats),
        titulo: "Conversación nueva",
        turnos: [],
        actualizado: new Date().toISOString(),
      };
      estado.chats.push(chat);
      persistir();
      return { id: chat.id };
    }
    const chat = estado.chats.find((c) => c.id === t.id);
    if (comando === "chat_leer") return chat ?? { turnos: [] };
    if (comando === "chat_guardar" && chat) {
      chat.turnos = t.turnos ?? [];
      chat.actualizado = new Date().toISOString();
      persistir();
      return { id: t.id };
    }
    if (comando === "chat_borrar" && chat) {
      chat.borrado = true;
      persistir();
      return { id: t.id };
    }
    return { id: t.id };
  }

  function bandeja(comando, t) {
    if (comando === "bandeja_subir") {
      const nombre = String(t.ruta || "documento").split(/[\\/]/).pop();
      const doc = {
        id: id(estado.bandeja),
        nombre,
        clase: "pdf",
        paginas: 0,
        caracteres: 0,
        estado: "por_confirmar",
        propuesta: null,
        clasificacion: null,
        texto: "",
        archivado: false,
      };
      estado.bandeja.unshift(doc);
      persistir();
      return { id: doc.id, nombre, duplicado: false, paginas: 0, caracteres: 0, estado: doc.estado };
    }
    if (comando === "bandeja_listar") {
      return estado.bandeja.filter((d) => !d.archivado && (!t.estado || d.estado === t.estado));
    }
    const doc = estado.bandeja.find((d) => d.id === Number(t.id));
    if (!doc && comando !== "libro_listar" && comando !== "libro_guardar" && comando !== "libro_importar") {
      throw new Error("Ese documento no está en la bandeja.");
    }
    if (comando === "bandeja_leer") return { id: doc.id, nombre: doc.nombre, parte: 1, partes: 1, texto: doc.texto || "" };
    if (comando === "bandeja_confirmar") {
      doc.clasificacion = t.clasificacion;
      doc.estado = "confirmado";
      persistir();
      return { id: doc.id };
    }
    if (comando === "bandeja_archivar") {
      doc.archivado = true;
      persistir();
      return { id: doc.id };
    }
    if (comando === "libro_listar") return estado.libro;
    if (comando === "libro_guardar") {
      estado.libro.push({ id: id(estado.libro), ...t });
      persistir();
      return { ok: true };
    }
    if (comando === "libro_importar") {
      return { importados: 0, omitidos: 0, no_verificados: 0, reclasificados: 0 };
    }
    return { ok: true };
  }

  async function seguimientoCmd(comando, t) {
    const seg = segDe(estado.activo);
    const vivos = () => seg.acts.filter((a) => !a.borrado);
    if (comando === "seg_listar") {
      return {
        actividades: vivos().map((a) => ({ ...a, pasos: a.pasos.filter((p) => !p.borrado) })),
        eventos: seg.eventos.filter((e) => !e.borrado),
      };
    }
    if (comando === "seg_actividad_guardar") {
      const codigo = String(t.codigo || "").trim();
      const nombre = String(t.nombre || "").trim();
      if (!codigo || !nombre) throw new Error("El código y el nombre son obligatorios.");
      if (t.id) {
        const act = vivos().find((a) => a.id === t.id);
        if (!act) throw new Error("Esa actividad no existe.");
        Object.assign(act, { codigo, nombre, responsable: t.responsable || "", inicio: t.inicio || "", fin: t.fin || "", notas: t.notas || "" });
      } else {
        if (vivos().some((a) => a.codigo === codigo)) throw new Error(`Ya existe la actividad ${codigo}.`);
        seg.acts.push({
          id: seg.n++,
          codigo,
          nombre,
          responsable: t.responsable || "",
          inicio: t.inicio || "",
          fin: t.fin || "",
          notas: t.notas || "",
          origen: "app",
          pasos: [],
        });
      }
      persistir();
      return { id: t.id || seg.acts.at(-1).id };
    }
    if (comando === "seg_actividad_borrar") {
      const act = vivos().find((a) => a.id === t.id);
      if (!act) throw new Error("Esa actividad no existe.");
      act.borrado = true;
      persistir();
      return { ok: true };
    }
    if (comando === "seg_paso_guardar") {
      const act = vivos().find((a) => a.id === t.actividad_id);
      if (!act) throw new Error("Esa actividad no existe.");
      const paso = String(t.paso || "").trim();
      if (!paso) throw new Error("El paso necesita nombre.");
      if (t.id) {
        const existente = act.pasos.find((p) => p.id === t.id);
        if (existente) Object.assign(existente, { paso, estado: t.estado || "Sin iniciar", fecha: t.fecha || "" });
      } else act.pasos.push({ id: seg.n++, paso, estado: t.estado || "Sin iniciar", fecha: t.fecha || "" });
      persistir();
      return { ok: true };
    }
    if (comando === "seg_paso_borrar") {
      for (const act of seg.acts) act.pasos = act.pasos.filter((p) => p.id !== t.id);
      persistir();
      return { ok: true };
    }
    if (comando === "seg_evento_guardar") {
      const fecha = String(t.fecha || "");
      if (!/^\d{4}-\d{2}-\d{2}/.test(fecha) || !String(t.texto || "").trim()) {
        throw new Error("La fecha (AAAA-MM-DD) y el texto son obligatorios.");
      }
      seg.eventos.push({ id: seg.n++, fecha, texto: t.texto.trim(), proyectos: t.proyectos || [], origen: "app" });
      persistir();
      return { ok: true };
    }
    if (comando === "seg_evento_borrar") {
      const ev = seg.eventos.find((e) => e.id === t.id);
      if (ev) ev.borrado = true;
      persistir();
      return { ok: true };
    }
    if (comando === "seg_excel_leer") return leerExcel(t);
    if (comando === "seg_excel_importar") return importarExcel(t);
    throw new Error(`Comando no disponible (${comando}).`);
  }

  async function leerExcel(t) {
    if (!leerArchivo) throw new Error("No se puede leer el archivo en este equipo.");
    const tabla = leerTabla(await leerArchivo(t.ruta), t.ruta);
    tablas.set(t.ruta, tabla);
    const mapeo = sugerirMapeo(tabla.encabezados);
    return {
      encabezados: tabla.encabezados,
      mapeo,
      mapeo_auto: mapeo,
      faltan: mapeo.codigo === undefined ? ["codigo"] : [],
      campos: camposTabla(),
      filas: tabla.filas.length,
      muestra: tabla.filas.slice(0, 3),
    };
  }

  async function importarExcel(t) {
    if (!tablas.has(t.ruta)) await leerExcel(t);
    const tabla = tablas.get(t.ruta);
    const mapeo = t.mapeo || {};
    if (mapeo.codigo === undefined || mapeo.codigo < 0) {
      throw new Error("Indica cuál columna trae el código de la actividad.");
    }
    const seg = segDe(estado.activo);
    let nuevas = 0;
    let iguales = 0;
    const detalle = [];
    for (const fila of tabla.filas) {
      const valor = (campo) => (mapeo[campo] === undefined ? "" : String(fila[mapeo[campo]] ?? "").trim());
      const codigo = valor("codigo");
      if (!codigo) continue;
      const existente = seg.acts.find((a) => a.codigo === codigo && !a.borrado);
      if (existente) iguales++;
      else if (t.aplicar) {
        seg.acts.push({
          id: seg.n++,
          codigo,
          nombre: valor("actividad") || codigo,
          responsable: valor("responsable"),
          inicio: valor("inicio"),
          fin: valor("fin"),
          notas: "",
          origen: "excel",
          pasos: valor("paso")
            ? [{ id: seg.n++, paso: valor("paso"), estado: valor("estado") || "Sin iniciar", fecha: valor("fecha") }]
            : [],
        });
        nuevas++;
        if (detalle.length < 12) detalle.push(`${codigo}: se agregó desde el archivo.`);
      } else {
        nuevas++;
        if (detalle.length < 12) detalle.push(`${codigo}: se agregaría «${valor("actividad") || codigo}».`);
      }
    }
    if (t.aplicar) persistir();
    const cero = { nuevas: 0, actualizadas: 0, iguales: 0 };
    return {
      actividades: { nuevas, actualizadas: 0, iguales },
      pasos: cero,
      eventos: cero,
      registros: cero,
      manuales_conservados: iguales,
      borradas_omitidas: 0,
      detalle,
    };
  }

  return {
    call,
    filasDeLote,
    definirLector(fn) {
      lector = fn;
    },
    conectores: {
      lista() {
        return estado.conectores.filter((c) => !estado.activo || c.proyecto_id === estado.activo);
      },
      async guardar(entrada) {
        const previo = estado.conectores.find((c) => c.id === entrada.id);
        const registro = previo
          ? Object.assign(previo, {
              nombre: entrada.nombre || previo.nombre,
              cfg: entrada.cfg ?? previo.cfg,
            })
          : {
              id: `c${Date.now()}`,
              proyecto_id: estado.activo,
              tipo: entrada.tipo,
              nombre: entrada.nombre || entrada.tipo,
              cfg: entrada.cfg ?? {},
              conectado: false,
            };
        if (!previo) estado.conectores.push(registro);
        sucio = true;
        await flush();
        return registro;
      },
      async borrar(idConector) {
        estado.conectores = estado.conectores.filter((c) => c.id !== idConector);
        sucio = true;
        await flush();
        return true;
      },
      async conectar(idConector) {
        const c = estado.conectores.find((item) => item.id === idConector);
        if (!c) throw new Error("Esa conexión no existe.");
        c.conectado = true;
        sucio = true;
        await flush();
        return { ok: true };
      },
      async desconectar(idConector) {
        const c = estado.conectores.find((item) => item.id === idConector);
        if (c) c.conectado = false;
        sucio = true;
        await flush();
        return true;
      },
    },
    seguimiento: {
      async datos() {
        const seg = estado.activo ? segDe(estado.activo) : { acts: [] };
        const hay = seg.acts.some((a) => !a.borrado);
        return {
          vacio: !hay,
          fuente_sugerida: null,
          datos: null,
        };
      },
      async local() {
        return estado.locales[estado.activo] ?? {};
      },
      async guardarLocal(valor) {
        estado.locales[estado.activo] = valor;
        sucio = true;
        await flush();
        return true;
      },
      async importar() {
        throw new Error("Pega la dirección de tu hoja o carga un Excel. No hay una hoja de ejemplo.");
      },
    },
    snapshot: () => JSON.parse(JSON.stringify(estado)),
  };
}
