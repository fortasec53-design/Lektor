/**
 * Rasteriza un PDF (o una imagen) y corre Tesseract en español.
 * Pensado para el proceso de render de Electron, donde hay canvas.
 * Los datos `spa` se leen de un directorio local (`lektor://tess` o `public/tessdata`).
 */
import * as pdfjs from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { createWorker } from "tesseract.js";
import workerPath from "tesseract.js/dist/worker.min.js?url";
import corePath from "tesseract.js-core/tesseract-core-simd-lstm.wasm.js?url";
import { interpretarPagina } from "./analizar.js";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

let workerPromise;

function rutaIdioma() {
  if (typeof window !== "undefined" && window.lektor?.tessUrl) return window.lektor.tessUrl;
  const base = import.meta.env.BASE_URL || "/";
  return `${base}tessdata`;
}

async function obtenerWorker() {
  if (!workerPromise) {
    workerPromise = createWorker("spa", 1, {
      langPath: rutaIdioma(),
      workerPath,
      corePath,
      gzip: false,
      cacheMethod: "none",
    });
  }
  return workerPromise;
}

function esPdf(bytes, nombre) {
  if (/\.pdf$/i.test(nombre || "")) return true;
  return bytes.length > 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46;
}

async function paginasPdf(bytes) {
  const pdf = await pdfjs.getDocument({ data: bytes }).promise;
  const paginas = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    paginas.push({ num: i, canvas });
  }
  return paginas;
}

async function paginaImagen(bytes, nombre) {
  if (!/\.(png|jpe?g)$/i.test(nombre || "")) {
    throw new Error("Solo se leen PDF, PNG o JPEG. El TIFF no está soportado en esta versión.");
  }
  const blob = new Blob([bytes]);
  const url = URL.createObjectURL(blob);
  try {
    const img = await cargarImagen(url);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
    return [{ num: 1, canvas }];
  } finally {
    URL.revokeObjectURL(url);
  }
}

function cargarImagen(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo abrir la imagen."));
    img.src = url;
  });
}

export async function leerBytes(buffer, nombre = "archivo.pdf") {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  const paginas = esPdf(bytes, nombre) ? await paginasPdf(bytes) : await paginaImagen(bytes, nombre);
  const worker = await obtenerWorker();
  const salida = [];
  for (const pag of paginas) {
    const reconocido = await worker.recognize(pag.canvas);
    const ctx = pag.canvas.getContext("2d");
    const image = ctx.getImageData(0, 0, pag.canvas.width, pag.canvas.height);
    const leida = interpretarPagina({
      width: pag.canvas.width,
      height: pag.canvas.height,
      data: image.data,
      words: reconocido.data.words,
      num: pag.num,
    });
    salida.push({ ...leida, imagen: pag.canvas.toDataURL("image/png") });
  }
  return { paginas: salida, dpi: 144 };
}
