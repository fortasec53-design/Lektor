/**
 * Lectura de casillas a partir de una imagen y las palabras de Tesseract.
 *
 * No usa la plantilla de casillas del escritorio original (esa parte no venía
 * en el paquete compilado). Ubica preguntas P1…P9 y, a la izquierda de cada
 * opción, mide la tinta. La confianza baja se guarda como aviso `dudosa`
 * para la pantalla «marcas dudosas».
 */

const OPCIONES_TEXTO = `1	Sí
2	No
9	No sabe`;

const UMBRAL_MARCA = 0.42;
const UMBRAL_TENUE = 0.12;
const CONFIANZA_SEGURA = 0.75;

export function interpretarPagina({ width, height, data, words, num }) {
  const palabras = normalizarPalabras(words);
  const folio = detectarFolio(palabras, num);
  const anclas = detectarAnclas(palabras);
  const celdas = anclas.length
    ? anclas.map((ancla, i) => {
        const tope = anclas[i + 1]?.y0 ?? height;
        const zona = palabras.filter(
          (p) => p.y0 >= ancla.y0 - 10 && p.y0 < tope - 4,
        );
        return leerPregunta(ancla, zona, { width, height, data });
      })
    : [celdaSinLectura(width, height, palabras)];
  return { num, folio, ancho: width, alto: height, celdas };
}

function normalizarPalabras(words) {
  return (words ?? [])
    .map((w) => {
      const bbox = w.bbox ?? {};
      const x0 = num(bbox.x0, bbox.x);
      const y0 = num(bbox.y0, bbox.y);
      const x1 = num(bbox.x1, x0 + num(bbox.w, 0));
      const y1 = num(bbox.y1, y0 + num(bbox.h, 0));
      return {
        text: String(w.text ?? "").trim(),
        confidence: num(w.confidence, 0),
        x0,
        y0,
        x1,
        y1,
      };
    })
    .filter((w) => w.text);
}

function num(a, b) {
  const n = Number(a);
  return Number.isFinite(n) ? n : Number(b) || 0;
}

function detectarFolio(palabras, numPagina) {
  const texto = palabras.map((p) => p.text).join(" ");
  const m = texto.match(/folio\s*([A-Za-z0-9-]+)/i);
  return m ? m[1] : `F${String(numPagina).padStart(3, "0")}`;
}

function detectarAnclas(palabras) {
  const anclas = [];
  for (let i = 0; i < palabras.length; i++) {
    const token = palabras[i].text.replace(/\s+/g, "");
    let clave = token.match(/^P([1-9])$/i)?.[1];
    if (
      !clave &&
      /^P$/i.test(token) &&
      palabras[i + 1] &&
      /^[1-9]$/.test(palabras[i + 1].text)
    ) {
      clave = palabras[i + 1].text;
    }
    if (!clave) continue;
    anclas.push({
      clave: `P${clave}`,
      y0: palabras[i].y0,
      x0: palabras[i].x0,
      x1: palabras[i].x1,
      y1: palabras[i].y1,
      confianzaTexto: palabras[i].confidence,
    });
  }
  const vistas = new Set();
  return anclas.filter((a) =>
    vistas.has(a.clave) ? false : vistas.add(a.clave),
  );
}

function leerPregunta(ancla, zona, imagen) {
  const opciones = emparejarOpciones(zona).map((op) => {
    const rect = rectanguloCaja(op.ancla, zona);
    const tinta = rect ? medirRect(imagen, rect) : medirTinta(imagen, op.ancla);
    return { ...op, ...tinta };
  });
  const confianzaTexto = Math.max(
    ancla.confianzaTexto,
    ...opciones.map((op) => op.ancla.confidence || 0),
    0,
  );
  const decision = clasificar(opciones, confianzaTexto);
  const xs = [ancla.x0, ...opciones.map((o) => o.ancla.x0 - 80)];
  const ys = [ancla.y0, ...opciones.map((o) => o.ancla.y0)];
  const xe = [ancla.x1, ...opciones.map((o) => o.ancla.x1)];
  const ye = [ancla.y1, ...opciones.map((o) => o.ancla.y1)];
  const x = Math.max(0, Math.min(...xs));
  const y = Math.max(0, Math.min(...ys));
  return {
    clave: ancla.clave,
    valor: decision.valor,
    aviso: decision.aviso,
    confianza: decision.confianza,
    tintas: decision.tintas,
    opciones: OPCIONES_TEXTO,
    bbox: {
      x,
      y,
      w: Math.max(8, Math.max(...xe) - x),
      h: Math.max(8, Math.max(...ye) - y),
    },
  };
}

function celdaSinLectura(width, height, palabras) {
  const confianzaTexto = palabras.length
    ? palabras.reduce((s, p) => s + p.confidence, 0) / palabras.length
    : 0;
  return {
    clave: "P1",
    valor: null,
    aviso: "dudosa",
    confianza: Math.round(Math.min(0.4, confianzaTexto / 100) * 100) / 100,
    tintas: [0, 0, 0],
    opciones: OPCIONES_TEXTO,
    bbox: { x: 40, y: 40, w: Math.max(20, width - 80), h: Math.max(20, height * 0.2) },
  };
}

function mismaLinea(a, b) {
  const centro = (p) => (p.y0 + p.y1) / 2;
  return Math.abs(centro(a) - centro(b)) < Math.max(14, (a.y1 - a.y0) * 0.8);
}

function emparejarOpciones(zona) {
  const usados = new Set();
  const resultado = [];
  for (const sabe of zona.filter((p) => /^sabe$/i.test(p.text))) {
    const no = zona.find(
      (p) =>
        !usados.has(p) &&
        /^no$/i.test(p.text) &&
        mismaLinea(p, sabe) &&
        sabe.x0 >= p.x0 &&
        sabe.x0 - p.x1 < 90,
    );
    const numero = zona.find(
      (p) =>
        !usados.has(p) &&
        p !== no &&
        p.text === "9" &&
        mismaLinea(p, sabe) &&
        sabe.x0 - p.x1 < 180,
    );
    usados.add(sabe);
    if (no) usados.add(no);
    if (numero) usados.add(numero);
    resultado.push({ clave: "9", etiqueta: "No sabe", ancla: numero || no || sabe });
  }
  for (const p of zona) {
    if (usados.has(p) || !/^(sí|si)$/i.test(p.text)) continue;
    const numero = zona.find(
      (n) =>
        !usados.has(n) &&
        n.text === "1" &&
        mismaLinea(n, p) &&
        p.x0 >= n.x0 &&
        p.x0 - n.x1 < 80,
    );
    usados.add(p);
    if (numero) usados.add(numero);
    resultado.push({ clave: "1", etiqueta: "Sí", ancla: numero || p });
  }
  for (const p of zona) {
    if (usados.has(p) || !/^no$/i.test(p.text)) continue;
    const numero = zona.find(
      (n) =>
        !usados.has(n) &&
        n.text === "2" &&
        mismaLinea(n, p) &&
        p.x0 >= n.x0 &&
        p.x0 - n.x1 < 80,
    );
    usados.add(p);
    if (numero) usados.add(numero);
    resultado.push({ clave: "2", etiqueta: "No", ancla: numero || p });
  }
  for (const [clave, etiqueta] of [
    ["1", "Sí"],
    ["2", "No"],
    ["9", "No sabe"],
  ]) {
    if (resultado.some((r) => r.clave === clave)) continue;
    const numero = zona.find((p) => !usados.has(p) && p.text === clave);
    if (!numero) continue;
    usados.add(numero);
    resultado.push({ clave, etiqueta, ancla: numero });
  }
  return resultado.sort((a, b) => a.ancla.x0 - b.ancla.x0);
}

function rectanguloCaja(ancla, zona) {
  let mejor = null;
  let mejorDist = Infinity;
  for (const p of zona) {
    if (p === ancla) continue;
    const w = p.x1 - p.x0;
    const h = p.y1 - p.y0;
    if (h < 18 || w < 18) continue;
    if (!mismaLinea(p, ancla)) continue;
    const dist = ancla.x0 - p.x1;
    if (dist < -6 || dist > h * 3.2) continue;
    if (dist < mejorDist) {
      mejor = p;
      mejorDist = dist;
    }
  }
  if (!mejor) return null;
  const alto = mejor.y1 - mejor.y0;
  const ancho = mejor.x1 - mejor.x0;
  const lado = Math.min(ancho, alto * 1.2);
  return {
    x0: mejor.x0,
    y0: mejor.y0,
    x1: mejor.x0 + lado,
    y1: mejor.y0 + Math.min(alto, lado),
  };
}

function medirRect(imagen, rect) {
  const ancho = Math.max(1, rect.x1 - rect.x0);
  const alto = Math.max(1, rect.y1 - rect.y0);
  const ix = Math.max(2, Math.round(ancho * 0.22));
  const iy = Math.max(2, Math.round(alto * 0.22));
  let interior = 0;
  let total = 0;
  const x0 = Math.max(0, Math.round(rect.x0 + ix));
  const y0 = Math.max(0, Math.round(rect.y0 + iy));
  const x1 = Math.min(imagen.width - 1, Math.round(rect.x1 - ix));
  const y1 = Math.min(imagen.height - 1, Math.round(rect.y1 - iy));
  if (x1 <= x0 || y1 <= y0) return { fill: 0, dispersa: false };
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      total++;
      if (luminancia(imagen.data, imagen.width, x, y) < 150) interior++;
    }
  }
  return { fill: total ? interior / total : 0, dispersa: false };
}

function luminancia(data, width, x, y) {
  const i = (y * width + x) * 4;
  return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
}

export function medirTinta(imagen, ancla) {
  const altoTexto = Math.max(16, ancla.y1 - ancla.y0);
  let x = Math.round(ancla.x0 - altoTexto * 2.5);
  let y = Math.round(ancla.y0 - altoTexto * 0.45);
  let w = Math.round(altoTexto * 2.2);
  let h = Math.round(altoTexto * 1.9);
  x = Math.max(0, Math.min(imagen.width - 2, x));
  y = Math.max(0, Math.min(imagen.height - 2, y));
  w = Math.max(2, Math.min(w, imagen.width - x));
  h = Math.max(2, Math.min(h, imagen.height - y));
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -1;
  let maxY = -1;
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      if (luminancia(imagen.data, imagen.width, xx, yy) < 150) {
        if (xx < minX) minX = xx;
        if (yy < minY) minY = yy;
        if (xx > maxX) maxX = xx;
        if (yy > maxY) maxY = yy;
      }
    }
  }
  if (maxX < 0) return { fill: 0, dispersa: false };
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const inset = Math.max(3, Math.round(Math.min(bw, bh) * 0.22));
  let interior = 0;
  let total = 0;
  const x0 = minX + inset;
  const y0 = minY + inset;
  const x1 = maxX - inset;
  const y1 = maxY - inset;
  if (x1 <= x0 || y1 <= y0) return { fill: 0, dispersa: false };
  for (let yy = y0; yy <= y1; yy++) {
    for (let xx = x0; xx <= x1; xx++) {
      total++;
      if (luminancia(imagen.data, imagen.width, xx, yy) < 150) interior++;
    }
  }
  const fill = total ? interior / total : 0;
  const dispersa = bw > altoTexto * 1.15 && bh > altoTexto * 1.15 && fill < UMBRAL_MARCA && fill >= UMBRAL_TENUE;
  return { fill, dispersa };
}

export function clasificar(opciones, confianzaTexto = 90) {
  const tintas = [0, 0, 0];
  const indice = { 1: 0, 2: 1, 9: 2 };
  for (const op of opciones) {
    const i = indice[op.clave];
    if (i !== undefined) tintas[i] = Math.max(tintas[i], op.fill || 0);
  }
  if (!opciones.length) {
    return { valor: null, aviso: "dudosa", confianza: 0.2, tintas };
  }
  const fuertes = opciones.filter((o) => o.fill >= UMBRAL_MARCA);
  const tenues = opciones.filter((o) => o.fill >= UMBRAL_TENUE && o.fill < UMBRAL_MARCA);
  let aviso = null;
  let valor = null;
  let confianza = 0.3;
  if (fuertes.length >= 2 || (fuertes.length === 1 && tenues.length >= 1)) {
    aviso = "doble_marca";
    confianza = 0.62;
  } else if (fuertes.length === 1) {
    confianza = Math.min(0.98, 0.5 + fuertes[0].fill * 0.5);
    if (confianzaTexto < 50) confianza = Math.min(confianza, 0.62);
    if (confianza >= CONFIANZA_SEGURA) valor = fuertes[0].clave;
    else aviso = "dudosa";
  } else if (tenues.length > 1) {
    aviso = "posible_borron";
    confianza = 0.4;
  } else if (tenues.length === 1) {
    aviso = confianzaTexto < 45 ? "dudosa" : "marca_tenue";
    confianza = 0.46;
  } else {
    aviso = "sin_marca";
    confianza = 0.9;
  }
  if (confianza < CONFIANZA_SEGURA && !aviso) aviso = "dudosa";
  return {
    valor: aviso ? null : valor,
    aviso,
    confianza: Math.round(confianza * 100) / 100,
    tintas,
  };
}
