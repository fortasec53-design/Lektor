import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Aplicacion } from "./pantallas.js";
import { mockApi } from "./mock/mockApi.js";
import "./estilos.css";

async function arrancar() {
  if (!window.ocr) {
    if (window.lektor?.esEscritorio) {
      const { crearApiEscritorio } = await import("./desktop/api.js");
      window.ocr = crearApiEscritorio();
    } else {
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
