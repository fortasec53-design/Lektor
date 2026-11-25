# Qué se reconstruyó

La interfaz salió de un paquete Vite ya compilado (React 19.3.1, Lector 1.0.9, commit `5ad52a6`) y el CSS se copió a `src/estilos.css` sin cambiar las clases. Esos archivos compilados ya no están en el repositorio: la app que se entrega es la de escritorio.

## Recuperado con el mismo comportamiento

- Pantallas y textos en español, y el diccionario ES/EN.
- Barra lateral (Trabajo, Encuestas, Administración), aviso confidencial, guía F1 y bienvenida (`localStorage`, clave `lector.bienvenida`).
- Subir lote, procesando, revisar (atajos 1–9, 0, Enter, flechas) y exportar.
- Panel de avance, seguimiento, bandeja, conectores, usuarios y personalización.
- Los comandos de `window.ocr` que usa la interfaz (lotes, revisión, seguimiento, bandeja, conectores, asistente). Los contesta el almacén local de la app.

Los nombres de las pantallas (`PantallaRevision`, `PantallaSeguimiento`, etc.) se restauraron. Dentro de cada pantalla muchos estados siguen con nombres cortos (`e`, `t`, `n`): el empaquetador los había minificado y renombrarlos sin el fuente original podía cambiar el programa. La estructura y los textos sí se pueden leer.

## Aproximado o agregado

- **OCR.** No estaba en el paquete original. Vive en `src/ocr/` y alimenta `registrar_pdf`, `procesar_documento` y `pagina_imagen`.
- **Arranque vacío.** No hay datos de ejemplo. `primer_arranque` crea el primer proyecto y una plantilla en blanco. Los datos van a `userData`. `samples/`, `docs/` y `scripts/` no se empaquetan.
- **Aviso `dudosa`.** La compilación solo nombraba `doble_marca`, `sin_marca`, `marca_tenue` y `posible_borron`. Se agregó la frase para la confianza baja. La pantalla ya mostraba el aviso desconocido tal cual; ahora tiene texto.
- **Excel.** Se arma un `.xlsx` mínimo (lote, documento, folio, página, clave, valor, aviso, confianza) y «Guardar en…» abre el diálogo.
- **Actualizador.** `electron-updater` habla con GitHub Releases de este repositorio. Sin empaquetar, la fase queda `inactivo` («versión de desarrollo»).
- **Formato JSON de encuesta.** Se registra el archivo elegido. No se reconstruyó el lector de coordenadas del escritorio original.
- El número de versión visible sigue siendo **1.0.9** / commit `5ad52a6`, el de la compilación. El `package.json` usa la misma versión para que el primer release coincida.

## Qué no se pudo recuperar

- El proyecto Vite original (nombres de archivos, tests, comentarios).
- El código de Electron anterior y la integración con el servicio de pago. No había llaves en el paquete; no se agregó ninguna.
- La plantilla real de casillas (coordenadas por pregunta). Sin eso, la lectura descrita en [ocr.md](ocr.md) usa la plantilla en blanco (P1… y 1 Sí, 2 No, 9 No sabe).
