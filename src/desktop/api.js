/**
 * Puente de escritorio. Reutiliza la API simulada para todo lo que el paquete
 * original no ejecutaba de verdad (asistente, seguimiento, conectores) y
 * sustituye la lectura de PDF, la exportación y el actualizador.
 */
import { definirProcesadorOcr, filasDeLote, mockApi } from "../mock/mockApi.js";
import { leerBytes } from "../ocr/leerArchivo.js";
import { libroXlsx } from "../exportar/xlsx.js";

let ultimoExcel = null;

export function crearApiEscritorio() {
  definirProcesadorOcr({
    async leer(ruta) {
      const bytes = await window.lektor.leerArchivo(ruta);
      const nombre = String(ruta).split(/[\\/]/).pop();
      return leerBytes(bytes, nombre);
    },
  });

  return {
    ...mockApi,
    async openPdf() {
      return window.lektor.abrirPdf();
    },
    rutaDe(archivo) {
      return window.lektor.rutaDeArchivo(archivo) || archivo?.name || "";
    },
    async call(comando, payload) {
      if (comando === "exportar_lote") return exportarLote(payload ?? {});
      return mockApi.call(comando, payload);
    },
    async guardarExportacion() {
      if (!ultimoExcel) return null;
      return window.lektor.guardarBytes({
        nombre: ultimoExcel.nombre,
        bytes: ultimoExcel.bytes,
      });
    },
    actualizador: actualizadorEscritorio(),
    async brand() {
      return { productName: "Lector de encuestas", shortName: "Lector" };
    },
  };
}

async function exportarLote(payload) {
  await mockApi.call("exportar_lote", payload);
  const filas = filasDeLote(payload.lote_id);
  ultimoExcel = {
    nombre: `lote-${payload.lote_id || "encuestas"}.xlsx`,
    bytes: libroXlsx(filas),
  };
  const completas = filas.filter((fila) => fila.valor !== "" && !fila.aviso).length;
  return { ruta: ultimoExcel.nombre, filas: filas.length, completas };
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
