import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Aplicacion } from "./pantallas.js";
import "./estilos.css";

/**
 * VITE_ESCRITORIO lo define solo `npm run build:escritorio`.
 * Así el paquete del .exe no incluye mockApi ni los datos ficticios.
 * `npm run dev` y `npm run build` siguen siendo la demo web.
 */
const esEscritorio = import.meta.env.VITE_ESCRITORIO === "1";

async function arrancar() {
  if (!window.ocr) {
    if (esEscritorio) {
      const { crearApiEscritorio } = await import("./desktop/api.js");
      window.ocr = await crearApiEscritorio();
    } else {
      const { mockApi } = await import("./mock/mockApi.js");
      window.ocr = mockApi;
    }
  }
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Aplicacion />
    </StrictMode>,
  );
}

arrancar();
