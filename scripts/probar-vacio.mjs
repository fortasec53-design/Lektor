/**
 * El almacén de escritorio arranca sin proyectos ni encuestas de ejemplo.
 */
import { crearAlmacen, estadoVacio } from "../src/desktop/almacen.js";

function memoria() {
  let guardado = null;
  return {
    cargar: async () => (guardado ? JSON.parse(JSON.stringify(guardado)) : null),
    guardar: async (datos) => {
      guardado = JSON.parse(JSON.stringify(datos));
    },
    leerArchivo: async () => new TextEncoder().encode("Código,Actividad\nP1,Mi actividad\n"),
  };
}

function exigir(cond, mensaje) {
  if (!cond) throw new Error(mensaje);
}

const prohibido = /A-PRA|B-PRB|C-PRC|DEMO-A|ejemplo_ficticio|ENC-DEMO|fictici|lote_ficticio|Persona Admin/;

const vacio = estadoVacio();
exigir(vacio.proyectos.length === 0 && vacio.usuarios.length === 0, "el estado inicial trae datos");
exigir(!prohibido.test(JSON.stringify(vacio)), "el estado vacío menciona datos de ejemplo");

const deps = memoria();
const almacen = await crearAlmacen(deps);
const inicio = await almacen.call("estado_inicial");
exigir(inicio.proyectos === 0 && inicio.usuarios === 0, "estado_inicial no está vacío");
const seguimiento = await almacen.seguimiento.datos();
exigir(seguimiento.vacio === true && seguimiento.datos == null, "el seguimiento no arranca vacío");
exigir((await almacen.call("list", { table: "lotes" })).length === 0, "hay lotes de ejemplo");
exigir((await almacen.call("cola_revision")).length === 0, "hay marcas de ejemplo");

await almacen.call("primer_arranque", {
  admin: { nombre: "Ana López", email: "ana@example.com" },
  proyecto: { codigo: "PRY1", nombre: "Mi proyecto" },
});
const despues = await almacen.call("proyectos");
exigir(despues.proyectos.length === 1 && despues.proyectos[0].codigo === "PRY1", "no se creó el proyecto propio");
exigir((await almacen.call("list", { table: "lotes" })).length === 0, "crear el proyecto inventó un lote");
const instrumento = (await almacen.call("list", { table: "instrumentos" }))[0];
exigir(instrumento.codigo === "PLANTILLA", "la plantilla por defecto no es la en blanco");
exigir(!prohibido.test(JSON.stringify(almacen.snapshot())), "después de crear el proyecto aparecen ejemplos");

const otro = await crearAlmacen(deps);
const reabierto = await otro.call("proyectos");
exigir(reabierto.proyectos[0]?.codigo === "PRY1", "los datos no se guardaron para la siguiente apertura");
exigir((await otro.call("cola_revision")).length === 0, "al reabrir hay marcas");

console.log("Almacén de escritorio vacío: ok");
