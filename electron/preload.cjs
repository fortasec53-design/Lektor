const { contextBridge, ipcRenderer, webUtils } = require("electron");

contextBridge.exposeInMainWorld("lektor", {
  esEscritorio: true,
  tessUrl: "lektor://tess",
  abrirPdf: () => ipcRenderer.invoke("dialogo:pdf"),
  leerArchivo: (ruta) => ipcRenderer.invoke("archivo:leer", ruta),
  guardarBytes: (payload) => ipcRenderer.invoke("archivo:guardar", payload),
  rutaDeArchivo: (archivo) => {
    try {
      return webUtils.getPathForFile(archivo);
    } catch {
      return "";
    }
  },
  actualizador: {
    info: () => ipcRenderer.invoke("upd:info"),
    buscar: () => ipcRenderer.invoke("upd:buscar"),
    descargar: () => ipcRenderer.invoke("upd:descargar"),
    instalar: () => ipcRenderer.invoke("upd:instalar"),
    canal: (correo, canal) => ipcRenderer.invoke("upd:canal", { correo, canal }),
    alCambiar: (cb) => {
      const fn = (_evento, siguiente) => cb(siguiente);
      ipcRenderer.on("upd:estado", fn);
      return () => ipcRenderer.removeListener("upd:estado", fn);
    },
    alAbrir: (cb) => {
      const fn = () => cb();
      ipcRenderer.on("upd:abrir", fn);
      return () => ipcRenderer.removeListener("upd:abrir", fn);
    },
  },
});
