import { strToU8, zipSync } from "fflate";

function xml(valor) {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const ENCABEZADOS = [
  "lote_id",
  "documento",
  "folio",
  "pagina",
  "clave",
  "valor",
  "aviso",
  "confianza",
];

/** Libro .xlsx mínimo. El valor vacío se escribe como celda en blanco, nunca como 0. */
export function libroXlsx(filas) {
  const tabla = [
    ENCABEZADOS,
    ...filas.map((fila) => ENCABEZADOS.map((clave) => fila[clave] ?? "")),
  ];
  const rows = tabla
    .map((fila, i) => {
      const celdas = fila
        .map((valor, c) => {
          const ref = `${String.fromCharCode(65 + c)}${i + 1}`;
          return `<c r="${ref}" t="inlineStr"><is><t>${xml(valor)}</t></is></c>`;
        })
        .join("");
      return `<row r="${i + 1}">${celdas}</row>`;
    })
    .join("");
  const hoja = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${rows}</sheetData></worksheet>`;
  const archivos = {
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
    "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets><sheet name="Encuestas" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>`,
    "xl/worksheets/sheet1.xml": hoja,
  };
  const binarios = {};
  for (const [nombre, texto] of Object.entries(archivos)) binarios[nombre] = strToU8(texto);
  return zipSync(binarios);
}
