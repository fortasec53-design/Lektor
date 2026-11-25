import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Aplicacion } from "./pantallas.js";
import "./estilos.css";

async function arrancar() {
  if (!window.ocr) {
    const { crearApiEscritorio } = await import("./desktop/api.js");
    window.ocr = await crearApiEscritorio();
  }
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Aplicacion />
    </StrictMode>,
  );
}

arrancar();
