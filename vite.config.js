import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const escritorio = process.env.ELECTRON === "1";

export default defineConfig({
  root: path.resolve("src"),
  base: escritorio ? "./" : "/lektor/",
  publicDir: path.resolve("public"),
  plugins: [react()],
  build: {
    outDir: path.resolve(escritorio ? "dist-electron" : "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
