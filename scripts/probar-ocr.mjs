/**
 * Crea una encuesta escaneada de ejemplo y comprueba Tesseract + casillas.
 * También corre un caso sintético (palabras con coordenadas conocidas) para
 * no depender solo del azar del OCR.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "@napi-rs/canvas";
import { PDFDocument } from "pdf-lib";
import { createWorker } from "tesseract.js";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { clasificar, interpretarPagina } from "../src/ocr/analizar.js";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const salidaPdf = path.join(raiz, "samples", "encuesta-escaneada.pdf");
const salidaPng = path.join(raiz, "samples", "encuesta-escaneada.png");
const icono = path.join(raiz, "build", "icon.png");

const PREGUNTAS = [
  { clave: "P1", texto: "Participó en el taller", marcas: { 1: "llena", 2: "vacia", 9: "vacia" } },
  { clave: "P2", texto: "Recomendaría la actividad", marcas: { 1: "vacia", 2: "llena", 9: "vacia" } },
  { clave: "P3", texto: "Hubo algún problema", marcas: { 1: "vacia", 2: "vacia", 9: "vacia" } },
  { clave: "P4", texto: "La sede estaba lista", marcas: { 1: "tenue", 2: "vacia", 9: "vacia" } },
  { clave: "P5", texto: "Asistió la persona titular", marcas: { 1: "llena", 2: "llena", 9: "vacia" } },
  { clave: "P6", texto: "Continúa el próximo mes", marcas: { 1: "borron", 2: "tenue", 9: "vacia" } },
];

function dibujar() {
  const w = 1240;
  const h = 1754;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  const palabras = [];
  const escribir = (texto, x, y, size = 36) => {
    ctx.fillStyle = "#161616";
    ctx.font = `${size}px "Liberation Sans"`;
    ctx.fillText(texto, x, y);
    const ancho = ctx.measureText(texto).width;
    palabras.push({
      text: texto,
      confidence: 96,
      bbox: { x0: x, y0: y - size * 0.82, x1: x + ancho, y1: y + size * 0.18 },
    });
  };
  const caja = (x, y, modo) => {
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, 52, 52);
    if (modo === "llena") {
      ctx.fillStyle = "#111";
      ctx.fillRect(x + 8, y + 8, 36, 36);
    } else if (modo === "tenue") {
      ctx.strokeStyle = "#222";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x + 10, y + 28);
      ctx.lineTo(x + 22, y + 42);
      ctx.lineTo(x + 44, y + 10);
      ctx.stroke();
    } else if (modo === "borron") {
      ctx.fillStyle = "#444";
      for (let i = 0; i < 40; i++) {
        ctx.fillRect(x + 6 + ((i * 19) % 40), y + 6 + ((i * 11) % 40), 4, 4);
      }
    }
  };
  escribir("Encuesta ENC-DEMO", 70, 90, 42);
  escribir("Folio", 70, 150, 32);
  escribir("F001", 180, 150, 32);
  PREGUNTAS.forEach((pregunta, i) => {
    const y = 250 + i * 230;
    escribir(pregunta.clave, 70, y, 40);
    escribir(pregunta.texto, 160, y, 36);
    const opciones = [
      ["1", "Sí", pregunta.marcas[1], 70],
      ["2", "No", pregunta.marcas[2], 430],
      ["9", "No", pregunta.marcas[9], 790],
    ];
    for (const [num, etiqueta, modo, x] of opciones) {
      caja(x, y + 24, modo);
      escribir(num, x + 70, y + 64, 32);
      escribir(etiqueta, x + 110, y + 64, 32);
      if (num === "9") escribir("sabe", x + 180, y + 64, 32);
    }
  });
  return { canvas, palabras, width: w, height: h };
}

function dibujarIcono() {
  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#eff6ff";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "#1d4ed8";
  ctx.beginPath();
  ctx.roundRect(28, 28, 200, 200, 42);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 140px "Liberation Sans"`;
  ctx.fillText("L", 72, 180);
  fs.mkdirSync(path.dirname(icono), { recursive: true });
  fs.writeFileSync(icono, canvas.toBuffer("image/png"));
}

class FabricaCanvas {
  create(width, height) {
    const canvas = createCanvas(width, height);
    return { canvas, context: canvas.getContext("2d") };
  }
  reset(par, width, height) {
    par.canvas.width = width;
    par.canvas.height = height;
  }
  destroy(par) {
    par.canvas.width = 0;
    par.canvas.height = 0;
  }
}

async function rasterizarPdf(bytes) {
  const fabrica = new FabricaCanvas();
  const pdf = await getDocument({
    data: new Uint8Array(bytes),
    disableWorker: true,
    isEvalSupported: false,
    canvasFactory: fabrica,
  }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1 });
  const par = fabrica.create(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({
    canvasContext: par.context,
    viewport,
    canvasFactory: fabrica,
  }).promise;
  const image = par.context.getImageData(0, 0, par.canvas.width, par.canvas.height);
  return {
    width: par.canvas.width,
    height: par.canvas.height,
    data: image.data,
    png: par.canvas.toBuffer("image/png"),
  };
}

function exigir(cond, mensaje) {
  if (!cond) throw new Error(mensaje);
}

async function main() {
  dibujarIcono();
  const dibujo = dibujar();
  const png = dibujo.canvas.toBuffer("image/png");
  fs.mkdirSync(path.dirname(salidaPdf), { recursive: true });
  fs.writeFileSync(salidaPng, png);
  const pdf = await PDFDocument.create();
  const imagen = await pdf.embedPng(png);
  const hoja = pdf.addPage([imagen.width, imagen.height]);
  hoja.drawImage(imagen, { x: 0, y: 0, width: imagen.width, height: imagen.height });
  const pdfBytes = await pdf.save();
  fs.writeFileSync(salidaPdf, pdfBytes);

  const pixeles = dibujo.canvas.getContext("2d").getImageData(0, 0, dibujo.width, dibujo.height);
  const sintetico = interpretarPagina({
    width: dibujo.width,
    height: dibujo.height,
    data: pixeles.data,
    words: dibujo.palabras,
    num: 1,
  });
  console.log("Sintético:");
  for (const celda of sintetico.celdas) {
    console.log(
      `  ${celda.clave} valor=${celda.valor ?? "∅"} aviso=${celda.aviso ?? "-"} conf=${celda.confianza} tintas=${celda.tintas.map((n) => n.toFixed(2)).join(",")}`,
    );
  }
  const baja = clasificar([{ clave: "1", fill: 0.45 }], 90);
  exigir(baja.aviso === "dudosa" && baja.valor == null, "una marca poco segura debe quedar como dudosa");
  const porClave = Object.fromEntries(sintetico.celdas.map((c) => [c.clave, c]));
  exigir(sintetico.folio === "F001", `folio inesperado: ${sintetico.folio}`);
  exigir(sintetico.celdas.length === 6, `se esperaban 6 preguntas, hubo ${sintetico.celdas.length}`);
  exigir(porClave.P1.valor === "1" && !porClave.P1.aviso, "P1 debía aceptarse como Sí");
  exigir(porClave.P2.valor === "2" && !porClave.P2.aviso, "P2 debía aceptarse como No");
  exigir(porClave.P3.aviso === "sin_marca" && porClave.P3.valor == null, "P3 debía ser sin_marca");
  exigir(porClave.P5.aviso === "doble_marca", `P5 debía ser doble_marca, fue ${porClave.P5.aviso}`);
  exigir(porClave.P4.aviso === "marca_tenue", `P4 aviso ${porClave.P4.aviso}`);
  exigir(porClave.P6.aviso === "posible_borron", `P6 aviso ${porClave.P6.aviso}`);
  for (const celda of sintetico.celdas) {
    if ((celda.confianza ?? 1) < 0.75) {
      exigir(celda.aviso, `${celda.clave} con confianza baja no tiene aviso`);
      exigir(celda.valor == null, `${celda.clave} con confianza baja no debe traer valor`);
    }
  }

  const render = await rasterizarPdf(pdfBytes);
  const worker = await createWorker("spa", 1, {
    langPath: path.join(raiz, "public", "tessdata"),
    cachePath: path.join(raiz, "public", "tessdata"),
    gzip: false,
  });
  const reconocido = await worker.recognize(render.png);
  await worker.terminate();
  const ocr = interpretarPagina({
    width: render.width,
    height: render.height,
    data: render.data,
    words: reconocido.data.words,
    num: 1,
  });
  console.log("OCR Tesseract:");
  console.log("  texto:", (reconocido.data.text || "").replace(/\s+/g, " ").slice(0, 400));
  for (const celda of ocr.celdas) {
    console.log(
      `  ${celda.clave} valor=${celda.valor ?? "∅"} aviso=${celda.aviso ?? "-"} conf=${celda.confianza} tintas=${(celda.tintas || []).map((n) => Number(n).toFixed(2)).join(",")}`,
    );
  }
  const texto = reconocido.data.text || "";
  exigir(/ENC-DEMO|Encuesta|Folio|Particip/i.test(texto), "Tesseract no leyó el encabezado de la encuesta");
  exigir(/P\s*1/.test(texto) || ocr.celdas.some((c) => c.clave === "P1"), "No apareció la pregunta P1");
  const ocrClave = Object.fromEntries(ocr.celdas.map((c) => [c.clave, c]));
  exigir(ocrClave.P1?.valor === "1" && !ocrClave.P1.aviso, `OCR P1: ${ocrClave.P1?.valor}/${ocrClave.P1?.aviso}`);
  exigir(ocrClave.P2?.valor === "2" && !ocrClave.P2.aviso, `OCR P2: ${ocrClave.P2?.valor}/${ocrClave.P2?.aviso}`);
  exigir(ocrClave.P3?.aviso === "sin_marca", `OCR P3: ${ocrClave.P3?.aviso}`);
  exigir(ocrClave.P5?.aviso === "doble_marca", `OCR P5: ${ocrClave.P5?.aviso}`);
  exigir(
    ["marca_tenue", "dudosa"].includes(ocrClave.P4?.aviso),
    `OCR P4: ${ocrClave.P4?.aviso}`,
  );
  const dudosas = ocr.celdas.filter((c) => c.aviso);
  exigir(dudosas.length >= 1, "La lectura OCR no produjo marcas para revisar");
  for (const celda of ocr.celdas) {
    if ((celda.confianza ?? 1) < 0.75) exigir(celda.aviso, "confianza baja sin aviso dudosa/estructural");
  }
  console.log(`PDF de muestra: ${salidaPdf}`);
  console.log(`Casillas sintéticas correctas. OCR produjo ${dudosas.length} marca(s) para revisión.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
