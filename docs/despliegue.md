# Compilar y publicar

La app se distribuye como instalador de Windows. No hay sitio web que publicar desde este repositorio.

## Compilar

```bash
npm install
npm run build
```

Eso genera `dist/` con la interfaz. Electron la carga con rutas relativas.

El instalador:

```bash
npm run dist
```

Queda en `release/Lector-de-encuestas-Setup-<versión>.exe`, junto con `latest.yml` y el `.blockmap`. Esos tres archivos son los que usa la actualización automática.

En Linux hace falta Wine, incluido el de 32 bits, porque NSIS y la herramienta que escribe el ícono del `.exe` son programas de Windows. En una computadora Windows el mismo comando no necesita Wine. Sin certificado de firma, el instalador no va firmado.

`npm run dist:linux` arma `release/linux-unpacked/` para probar el empaquetado en Linux. No es el instalador que se entrega.

Para abrir la interfaz ya compilada, sin empaquetar:

```bash
npx electron .
```

## Publicar un Release

1. Sube `version` en `package.json`.
2. Con un token que pueda escribir en el repositorio: `GH_TOKEN=… npm run dist -- --publish always`.
3. O sube a mano, en un release público de https://github.com/fortasec53-design/lektor/releases, el `.exe`, el `.blockmap` y `latest.yml`.

`electron-updater` lee ese release con `provider: github`, `owner: fortasec53-design` y `repo: lektor`. El canal beta (`allowPrerelease`) usa los releases marcados como prelanzamiento. La app empaquetada busca actualización al abrir. En una copia sin empaquetar (`npx electron .`) el aviso queda en «versión de desarrollo» y no descarga nada.

## Qué no entra al instalador

`samples/`, `docs/`, `scripts/` y el código de `src/` no se empaquetan. Los datos de la persona van a la carpeta de usuario de Windows (`datos.json` y `hojas/`). El único extra que sí viaja es el idioma de Tesseract, `spa.traineddata`, en `resources/tessdata`.
