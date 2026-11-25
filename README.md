# Lector de encuestas

Aplicación de escritorio para Windows. Convierte encuestas en papel, ya escaneadas en PDF, en datos: se sube el lote, se revisan las marcas dudosas y se exporta un Excel. La lectura corre en la computadora con Tesseract (español), sin servicio de pago.

La primera vez la instalación está vacía: pide la cuenta de administración y el primer proyecto. Lo que se capture se guarda en la carpeta de usuario de Windows, no dentro del programa.

## Instalar

El instalador se publica en los Releases de este repositorio:

https://github.com/fortasec53-design/lektor/releases

Descarga `Lector-de-encuestas-Setup-<versión>.exe`, ábrelo y sigue el asistente (se puede elegir la carpeta). Al terminar, abre **Lector de encuestas**.

## Actualizar

La app instalada usa `electron-updater` y consulta esos mismos Releases (`owner: fortasec53-design`, `repo: lektor`). Si hay una versión más nueva, el aviso de la esquina permite descargarla y reiniciar para instalarla. El canal beta toma los releases marcados como prelanzamiento.

Para que eso funcione, el release debe incluir el `.exe`, el `.blockmap` y `latest.yml`. Los pasos para generarlos están en [docs/despliegue.md](docs/despliegue.md).

## Compilar

Hace falta Node.js. En Linux, el instalador de Windows además necesita Wine de 32 bits.

```bash
npm install
npm run build
npm run dist
```

`npm run build` deja la interfaz en `dist/` (rutas relativas, listas para Electron). `npm run dist` arma `release/Lector-de-encuestas-Setup-<versión>.exe`.

Para abrir la app en esta computadora sin generar el instalador:

```bash
npm run build
npx electron .
```

## Probar el OCR

```bash
npm run ocr:probar
```

Genera `samples/encuesta-escaneada.pdf` (solo para desarrollo; no va en el instalador) y comprueba la lectura. El detalle y los límites están en [docs/ocr.md](docs/ocr.md).

## Qué trae

Subir PDF, revisar marcas dudosas, exportar Excel, seguimiento, bandeja, conectores, usuarios y un asistente que arranca apagado. El recorrido de las pantallas está en [docs/funcionalidades.md](docs/funcionalidades.md). Cómo se recuperó la interfaz, en [docs/reconstruccion.md](docs/reconstruccion.md).
