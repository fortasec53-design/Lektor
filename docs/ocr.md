# Lectura con Tesseract

La compilación publicada no incluye la llamada al servicio de pago que usaba el escritorio original. Cuando el navegador no trae `window.ocr`, carga `mockApi` y no lee el PDF. Esta versión hace la lectura en Electron, sin llaves y sin salir de la computadora.

## Qué hace

1. La persona elige o arrastra PDF, PNG o JPEG. El original no se modifica: solo se lee.
2. pdf.js dibuja cada página en un canvas (escala 2).
3. Tesseract (`tesseract.js`, idioma `spa`) devuelve palabras con recuadro y confianza. Los datos `spa.traineddata` (tessdata rápida) van en `public/tessdata/` y, ya empaquetada la app, en `resources/tessdata`. El renderer los pide por `lektor://tess/spa.traineddata`. No hace falta red.
4. Se buscan preguntas `P1`…`P9` y las opciones **1 Sí**, **2 No** y **9 No sabe** (el instrumento de ejemplo `ENC-DEMO`).
5. A la izquierda de cada opción, o dentro del recuadro que Tesseract vio como casilla, se mide la tinta interior.
6. Cada celda entra al mismo flujo de «marcas dudosas»: `cola_revision`, `revisar`, atajos y, si hay imagen, `pagina_imagen`.

## Confianza y avisos

| Situación | Aviso | ¿Va a revisión? |
| --- | --- | --- |
| Una casilla llena y confianza ≥ 0.75 | ninguno; se guarda el valor | No |
| Una casilla llena pero confianza < 0.75 | `dudosa` | Sí |
| Ninguna tinta | `sin_marca` | Sí |
| Dos casillas con tinta clara | `doble_marca` | Sí |
| Una marca débil | `marca_tenue` | Sí |
| Dos marcas débiles o un manchón | `posible_borron` | Sí |
| No se reconocen las preguntas | `dudosa` en P1 | Sí |

`dudosa` es el aviso nuevo. Los otros cuatro ya venían en la interfaz. Lo que queda sin respuesta se exporta vacío, nunca como 0. En el escritorio, «Guardar en…» escribe un `.xlsx` de verdad.

## Comprobarlo

```bash
npm run ocr:probar
```

Eso dibuja una hoja, la mete en un PDF de una sola imagen (`samples/encuesta-escaneada.pdf`) y la lee. El caso controlado, con las coordenadas de las palabras, espera:

- P1 → Sí, sin aviso
- P2 → No, sin aviso
- P3 → `sin_marca`
- P4 → `marca_tenue`
- P5 → `doble_marca`
- P6 → `posible_borron`

Tesseract sobre esa misma hoja tiene que repetir ese criterio. En la muestra, «F001» a veces se lee «FOO1»: el modelo confunde 0 y O.

## Límites (con honestidad)

- Al crear el primer proyecto, la app instalada agrega una **plantilla en blanco** (`PLANTILLA`), sin páginas ni respuestas. El lector sigue buscando `P1`, `P2`… y las opciones 1 Sí, 2 No, 9 No sabe, porque ese es el único diseño que sabe medir sin una plantilla de coordenadas. No es el instrumento `ENC-DEMO` ni trae el lote ficticio. Si el cuestionario usa otras preguntas, hay que revisar las celdas a mano o sustituir el formato en «Agregar formato de encuesta».
- No está el formato JSON de casillas del escritorio original. `importar_plantilla` registra el archivo que elija la persona y no rellena respuestas. Sin coordenadas por casilla, la lectura sigue siendo la de la plantilla en blanco.
- Un cuestionario con otro texto, varias encuestas por hoja, marcas en otro lado o fotos oscuras va a caer en `dudosa` o a fallar la detección. Hay que revisarlo a mano.
- TIFF no se acepta. Solo PDF, PNG y JPEG.
- La tinta es un porcentaje de pixeles oscuros dentro del recuadro. No es un modelo de marcas. Un borde grueso, una sombra o un sello pueden contarse como marca.
- Tesseract a veces junta la casilla con el número (`[J2no`). Se recorta el lado izquierdo de esa palabra; si el corte queda mal, la confianza baja y la celda va a revisión en lugar de aceptarse sola.
- El asistente de la app puede seguir configurarse contra un modelo local o un proveedor. Eso no interviene en el OCR y no hay llaves en el repositorio. En la demo web esas pruebas siguen respondiendo que no hay IA externa.
