const { app, BrowserWindow, dialog, ipcMain, protocol, net } = require("electron");
const { autoUpdater } = require("electron-updater");
const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const crypto = require("node:crypto");

protocol.registerSchemesAsPrivileged([
  {
    scheme: "lektor",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
      corsEnabled: true,
    },
  },
]);

const ES_DEV = !app.isPackaged && process.env.ELECTRON_DEV === "1";

function dirTessdata() {
  if (app.isPackaged) return path.join(process.resourcesPath, "tessdata");
  return path.join(__dirname, "..", "public", "tessdata");
}

function archivoEstado(nombre) {
  return path.join(app.getPath("userData"), nombre);
}

let estado = {
  fase: "inactivo",
  activo: true,
  empaquetada: false,
  actual: app.getVersion(),
  canal: "estable",
  origen: "github:fortasec53-design/lektor",
  instalacion: null,
  version: null,
  progreso: 0,
  notas: "",
  error: null,
};

function publicar(parcial) {
  estado = { ...estado, ...parcial };
  for (const win of BrowserWindow.getAllWindows()) {
    win.webContents.send("upd:estado", estado);
  }
  return estado;
}

function leerCanal() {
  try {
    const guardado = JSON.parse(fsSync.readFileSync(archivoEstado("canal.json"), "utf8"));
    if (guardado?.canal === "beta" || guardado?.canal === "estable") return guardado.canal;
  } catch {
    /* primera ejecución */
  }
  return "estable";
}

function idInstalacion() {
  const ruta = archivoEstado("instalacion.txt");
  try {
    const previo = fsSync.readFileSync(ruta, "utf8").trim();
    if (previo) return previo;
  } catch {
    /* se crea abajo */
  }
  const id = crypto.randomUUID();
  fsSync.mkdirSync(path.dirname(ruta), { recursive: true });
  fsSync.writeFileSync(ruta, id);
  return id;
}

function configurarActualizador() {
  estado.empaquetada = app.isPackaged;
  estado.actual = app.getVersion();
  estado.canal = leerCanal();
  estado.instalacion = idInstalacion();
  autoUpdater.autoDownload = false;
  autoUpdater.allowPrerelease = estado.canal === "beta";
  autoUpdater.setFeedURL({
    provider: "github",
    owner: "fortasec53-design",
    repo: "lektor",
  });
  autoUpdater.on("checking-for-update", () => publicar({ fase: "buscando", error: null }));
  autoUpdater.on("update-available", (info) => {
    publicar({
      fase: "disponible",
      version: info?.version ?? null,
      notas: String(info?.releaseNotes ?? ""),
      error: null,
    });
    for (const win of BrowserWindow.getAllWindows()) win.webContents.send("upd:abrir");
  });
  autoUpdater.on("update-not-available", () =>
    publicar({ fase: "al-dia", version: null, error: null }),
  );
  autoUpdater.on("download-progress", (p) =>
    publicar({ fase: "descargando", progreso: Math.round(p.percent || 0) }),
  );
  autoUpdater.on("update-downloaded", (info) =>
    publicar({ fase: "listo", version: info?.version ?? estado.version, progreso: 100 }),
  );
  autoUpdater.on("error", (err) =>
    publicar({ fase: "error", error: String(err?.message || err) }),
  );
}

function crearVentana() {
  const win = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    title: "Lector de encuestas",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });
  if (ES_DEV) win.loadURL("http://127.0.0.1:5173/");
  else win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  return win;
}

app.whenReady().then(() => {
  protocol.handle("lektor", (request) => {
    const url = new URL(request.url);
    if (url.hostname !== "tess") return new Response("No encontrado", { status: 404 });
    const nombre = path.basename(url.pathname);
    if (nombre !== "spa.traineddata") return new Response("No encontrado", { status: 404 });
    return net.fetch(pathToFileURL(path.join(dirTessdata(), nombre)).toString());
  });
  configurarActualizador();
  crearVentana();
  if (app.isPackaged) {
    autoUpdater.checkForUpdates().catch((err) =>
      publicar({ fase: "error", error: String(err?.message || err) }),
    );
  } else {
    publicar({ fase: "inactivo", empaquetada: false });
  }
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) crearVentana();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

function dirUsuario() {
  return app.getPath("userData");
}

ipcMain.handle("datos:cargar", async () => {
  try {
    return JSON.parse(await fs.readFile(path.join(dirUsuario(), "datos.json"), "utf8"));
  } catch {
    return null;
  }
});

ipcMain.handle("datos:guardar", async (_evento, datos) => {
  const dir = dirUsuario();
  await fs.mkdir(dir, { recursive: true });
  const destino = path.join(dir, "datos.json");
  const temporal = destino + ".tmp";
  await fs.writeFile(temporal, JSON.stringify(datos));
  await fs.rename(temporal, destino);
  return true;
});

ipcMain.handle("datos:guardarHoja", async (_evento, payload) => {
  const dir = path.join(dirUsuario(), "hojas");
  await fs.mkdir(dir, { recursive: true });
  const id = String(payload?.id ?? "").replace(/[^\d]/g, "");
  if (!id) throw new Error("Hoja no válida");
  await fs.writeFile(path.join(dir, id + ".json"), JSON.stringify(payload.vista ?? null));
  return true;
});

ipcMain.handle("datos:leerHoja", async (_evento, id) => {
  const limpio = String(id ?? "").replace(/[^\d]/g, "");
  if (!limpio) return null;
  try {
    return JSON.parse(await fs.readFile(path.join(dirUsuario(), "hojas", limpio + ".json"), "utf8"));
  } catch {
    return null;
  }
});

ipcMain.handle("dialogo:pdf", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Elegir encuestas escaneadas",
    filters: [
      { name: "PDF o imagen", extensions: ["pdf", "png", "jpg", "jpeg"] },
    ],
    properties: ["openFile", "multiSelections"],
  });
  return canceled ? [] : filePaths;
});

ipcMain.handle("dialogo:abrir", async (_evento, opciones = {}) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: opciones.titulo || "Elegir archivo",
    filters: Array.isArray(opciones.filtros) ? opciones.filtros : [],
    properties: opciones.multiple ? ["openFile", "multiSelections"] : ["openFile"],
  });
  return canceled ? [] : filePaths;
});

ipcMain.handle("archivo:leer", async (_evento, ruta) => {
  if (typeof ruta !== "string" || !path.isAbsolute(ruta)) {
    throw new Error("Ruta no válida");
  }
  const buf = await fs.readFile(ruta);
  return Uint8Array.from(buf);
});

ipcMain.handle("archivo:guardar", async (_evento, payload) => {
  const nombre = String(payload?.nombre || "lote.xlsx").replace(/[\\/]/g, "");
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Guardar Excel",
    defaultPath: nombre,
    filters: [{ name: "Excel", extensions: ["xlsx"] }],
  });
  if (canceled || !filePath) return null;
  const bytes = payload?.bytes;
  await fs.writeFile(filePath, Buffer.from(bytes));
  return filePath;
});

ipcMain.handle("upd:info", () => estado);
ipcMain.handle("upd:buscar", async () => {
  if (!app.isPackaged) return publicar({ fase: "inactivo", empaquetada: false });
  try {
    await autoUpdater.checkForUpdates();
  } catch (err) {
    publicar({ fase: "error", error: String(err?.message || err) });
  }
  return estado;
});
ipcMain.handle("upd:descargar", async () => {
  if (!app.isPackaged) return estado;
  await autoUpdater.downloadUpdate();
  return estado;
});
ipcMain.handle("upd:instalar", () => {
  if (app.isPackaged) autoUpdater.quitAndInstall();
  return false;
});
ipcMain.handle("upd:canal", (_evento, payload) => {
  const canal = payload?.canal === "beta" ? "beta" : "estable";
  fsSync.mkdirSync(app.getPath("userData"), { recursive: true });
  fsSync.writeFileSync(archivoEstado("canal.json"), JSON.stringify({ canal }));
  autoUpdater.allowPrerelease = canal === "beta";
  return publicar({ canal });
});
