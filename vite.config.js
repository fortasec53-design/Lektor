import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: path.resolve("src"),
  base: "./",
  publicDir: path.resolve("public"),
  plugins: [react()],
  build: {
    outDir: path.resolve("dist"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
