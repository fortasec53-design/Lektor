# Qué se reconstruyó

La interfaz salió de `assets/index-BzLNX1sw.js` (React 19.3.1, Lector 1.0.9, commit `5ad52a6`) y la API simulada de `assets/mockApi-BJ7H9aw2.js`. El CSS es `assets/index-DakRZkfX.css`, copiado a `src/estilos.css` sin cambiar las clases.

Esos archivos de la raíz no se regeneran: GitHub Pages sigue sirviéndolos en `/lektor/`.

## Recuperado con el mismo comportamiento

- Pantallas y textos en español, y el diccionario ES/EN.
- Barra lateral (Trabajo, Encuestas, Administración), aviso confidencial, guía F1 y bienvenida (`localStorage`, clave `lector.bienvenida`).
- Subir lote, procesando, revisar (atajos 1–9, 0, Enter, flechas) y exportar.
- Panel de avance, seguimiento, bandeja, conectores, usuarios y personalización.
- Datos ficticios, parámetros `?ia`, `?actualizacion` y `?excel=raro`.
- Comandos de `window.ocr` que la demo ya contestaba, incluidos los que dicen que la exportación real o la IA externa no están en el navegador.

Los nombres de las pantallas (`PantallaRevision`, `PantallaSeguimiento`, etc.) se restauraron. Dentro de cada pantalla muchos estados siguen con nombres cortos (`e`, `t`, `n`): el empaquetador los había minificado y renombrarlos sin el fuente original podía cambiar el programa. La estructura y los textos sí se pueden leer.

## Aproximado o agregado

- **OCR.** No estaba en el paquete. Se diseñó `src/ocr/` y se enchufó en `registrar_pdf`, `procesar_documento` y `pagina_imagen` solo cuando corre Electron. En el navegador esos comandos siguen igual que la demo (no hay imagen de la hoja; el mensaje es «La vista de la hoja no está disponible en este equipo»).
- **Aviso `dudosa`.** La compilación solo nombraba `doble_marca`, `sin_marca`, `marca_tenue` y `posible_borron`. Se agregó la frase para la confianza baja. La pantalla ya mostraba el aviso desconocido tal cual; ahora tiene texto.
- **Excel de escritorio.** `exportar_lote` en la demo no genera el archivo. En Electron se arma un `.xlsx` mínimo (lote, documento, folio, página, clave, valor, aviso, confianza) y «Guardar en…» abre el diálogo.
- **Actualizador.** En la demo es ficticio. En Electron, `electron-updater` habla con GitHub Releases de este repositorio. Sin empaquetar, la fase queda `inactivo` («versión de desarrollo»).
- **Diálogos de archivos que no son el PDF** (formato JSON, hoja en blanco, Excel de seguimiento) siguen respondiendo como la demo. No se interpreta un JSON de plantilla.
- El número de versión visible sigue siendo **1.0.9** / commit `5ad52a6`, el de la compilación. El `package.json` usa la misma versión para que el primer release coincida.

## Qué no se pudo recuperar

- El proyecto Vite original (nombres de archivos, tests, comentarios).
- El código de Electron anterior y la integración con el servicio de pago. No había llaves en el paquete; no se agregó ninguna.
- La plantilla real de casillas (coordenadas por pregunta). Sin eso, la lectura descrita en [ocr.md](ocr.md) es una aproximación para el instrumento `ENC-DEMO`.
