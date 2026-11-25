import { strFromU8, unzipSync } from "fflate";

const CAMPOS = [
  ["codigo", "Código de la actividad"],
  ["actividad", "Nombre de la actividad"],
  ["proyecto", "Proyecto"],
  ["responsable", "Responsable"],
  ["inicio", "Fecha de inicio"],
  ["fin", "Fecha límite"],
  ["paso", "Paso"],
  ["fecha", "Fecha del paso"],
  ["estado", "Estado del paso"],
];

const ALIAS = {
  codigo: ["codigo", "código", "clave"],
  actividad: ["actividad", "nombre", "qué se hace", "que se hace"],
  proyecto: ["proyecto"],
  responsable: ["responsable", "quien", "quién"],
  inicio: ["inicio", "fecha de inicio"],
  fin: ["fin", "fecha límite", "fecha limite", "fecha límite"],
  paso: ["paso", "etapa"],
  fecha: ["fecha", "fecha del paso"],
  estado: ["estado", "situación", "situacion"],
};

export function camposTabla() {
  return CAMPOS.map(([campo, etiqueta]) => ({ campo, etiqueta }));
}

export function leerTabla(bytes, nombre = "") {
  const datos = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const esZip = datos[0] === 0x50 && datos[1] === 0x4b;
  if (/\.xlsx$/i.test(nombre) || esZip) return leerXlsx(datos);
  if (/\.xls$/i.test(nombre) && !esZip) {
    throw new Error("El .xls antiguo no se lee. Guárdalo como .xlsx o .csv.");
  }
  return parsearDelimitado(new TextDecoder("utf-8").decode(datos));
}

export function sugerirMapeo(encabezados) {
  const mapeo = {};
  const usados = new Set();
  for (const [campo, alias] of Object.entries(ALIAS)) {
    const idx = encabezados.findIndex((texto, i) => {
      if (usados.has(i)) return false;
      const n = normalizar(texto);
      return alias.some((a) => n === normalizar(a));
    });
    if (idx >= 0) {
      mapeo[campo] = idx;
      usados.add(idx);
    }
  }
  return mapeo;
}

function normalizar(texto) {
  return String(texto ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function parsearDelimitado(texto) {
  const limpio = texto.replace(/^\uFEFF/, "").trim();
  if (!limpio) return { encabezados: [], filas: [] };
  const lineas = limpio.split(/\r?\n/).filter((l) => l.trim());
  const muestra = lineas[0];
  const sep =
    (muestra.match(/;/g) || []).length > (muestra.match(/,/g) || []).length
      ? ";"
      : (muestra.match(/\t/g) || []).length > (muestra.match(/,/g) || []).length
        ? "\t"
        : ",";
  const tabla = lineas.map((linea) => partirLinea(linea, sep));
  return { encabezados: tabla[0] ?? [], filas: tabla.slice(1).filter((f) => f.some(Boolean)) };
}

function partirLinea(linea, sep) {
  const celdas = [];
  let actual = "";
  let comillas = false;
  for (let i = 0; i < linea.length; i++) {
    const c = linea[i];
    if (comillas) {
      if (c === '"' && linea[i + 1] === '"') {
        actual += '"';
        i++;
      } else if (c === '"') comillas = false;
      else actual += c;
    } else if (c === '"') comillas = true;
    else if (c === sep) {
      celdas.push(actual.trim());
      actual = "";
    } else actual += c;
  }
  celdas.push(actual.trim());
  return celdas;
}

function leerXlsx(datos) {
  const zip = unzipSync(datos);
  const compartidas = leerCompartidas(zip["xl/sharedStrings.xml"]);
  const hoja =
    zip["xl/worksheets/sheet1.xml"] ||
    Object.entries(zip).find(([nombre]) => /xl\/worksheets\/sheet\d+\.xml$/.test(nombre))?.[1];
  if (!hoja) throw new Error("El Excel no tiene una hoja legible.");
  const xml = strFromU8(hoja);
  const filas = [];
  for (const fila of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const celdas = [];
    let col = 0;
    for (const celda of fila[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const ref = /r="([A-Z]+)/.exec(celda[1]);
      const destino = ref ? columna(ref[1]) : col;
      while (col < destino) {
        celdas.push("");
        col++;
      }
      celdas.push(textoCelda(celda[1], celda[2], compartidas));
      col++;
    }
    if (celdas.some(Boolean)) filas.push(celdas);
  }
  return { encabezados: filas[0] ?? [], filas: filas.slice(1) };
}

function leerCompartidas(binario) {
  if (!binario) return [];
  const xml = strFromU8(binario);
  return [...xml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) =>
    [...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => decodificar(t[1])).join(""),
  );
}

function textoCelda(atributos, interior, compartidas) {
  if (/t="s"/.test(atributos)) {
    const v = /<v>(\d+)<\/v>/.exec(interior);
    return compartidas[Number(v?.[1] ?? 0)] ?? "";
  }
  if (/t="inlineStr"/.test(atributos)) {
    return [...interior.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => decodificar(t[1])).join("");
  }
  const v = /<v>([\s\S]*?)<\/v>/.exec(interior);
  return decodificar(v?.[1] ?? "");
}

function columna(letras) {
  return [...letras].reduce((n, c) => n * 26 + (c.charCodeAt(0) - 64), 0) - 1;
}

function decodificar(texto) {
  return String(texto)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}
