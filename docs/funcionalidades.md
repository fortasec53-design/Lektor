# Funcionalidades de la demo

Lo que sigue sale de la compilación publicada (`assets/index-BzLNX1sw.js` y `assets/mockApi-BJ7H9aw2.js`) y sigue valiendo para la interfaz reconstruida en `src/`. Describe la interfaz y lo que la API simulada contesta. No describe un backend real: en el navegador, `mockApi` ocupa el lugar de `window.ocr`.

En Electron la lectura del PDF ya no es simulada: ver [ocr.md](ocr.md). El resto de las pantallas (seguimiento, bandeja, conectores, asistente) se comporta como aquí.

Los textos de ejemplo (proyectos, personas, sedes, documentos) están marcados como ficticios dentro de los datos.

## Arranque

La app abre en **Asistente IA**. La primera vez muestra la bienvenida «Bienvenido a Lector», con los tres pasos y un botón para ir a subir el primer lote. Esa visita queda guardada en el navegador (`localStorage`, clave `lector.bienvenida`). **F1** o el botón **?** vuelven a abrir esa guía.

La barra superior también tiene el cambio **ES / EN** y el aviso «CONFIDENCIAL · datos de menores y víctimas». En esta demo no hay expedientes reales: los nombres usan `example.com` y el texto dice «ficticio».

## Encuestas: subir, procesar, revisar, exportar

**Subir lote.** Se arrastran PDF o se eligen archivos. `mockApi` no lee el PDF: al procesar registra `lote_ficticio.pdf` con 12 páginas. Al abrir, la demo ya trae `ejemplo_ficticio.pdf` (24 páginas, preguntas P1–P6 en cada una). El generador usa una semilla fija y marca 4 de esas 144 celdas con aviso, así que el lote abre en revisión. Si un archivo viene marcado como repetido, la interfaz dice «Ya estaba: no se repitió»; `registrar_pdf` en la demo siempre contesta que no es duplicado.

**Procesando.** Lista los lotes y deja proponer procesar, reintentar, cancelar o reanudar. Los estados que pinta la interfaz incluyen Pendiente, Procesado, En revisión, Listo, Cancelado y Con errores. En la demo el cambio de estado ocurre en memoria.

**Revisar.** La cola solo trae celdas con aviso y sin valor. Los avisos son: dos marcas, ninguna marca, marca muy tenue o posible borrón. Cada celda muestra la pregunta (P1–P6), las opciones de ejemplo (1 Sí, 2 No, 9 No sabe) y, cuando hay imagen, un recuadro sobre la hoja. `pagina_imagen` no está en `mockApi`, y la pantalla cae en «La vista de la hoja no está disponible en este equipo».

Atajos de esa pantalla: `1`–`9` elige una opción, `0` deja sin respuesta, `Enter` confirma, `←` y `→` pasan a la marca anterior o siguiente. Al confirmar se llama a `revisar`. Lo que queda sin respuesta sale vacío, nunca como 0.

**Exportar.** Resume proyectos, lotes, páginas y celdas por revisar, y ofrece la descarga. `exportar_lote` guarda un registro con formato `xlsx` y responde: «la exportación real sólo existe en la app de escritorio». `guardarExportacion` devuelve una ruta simulada (`Documentos/lote.xlsx`). La bienvenida habla de Excel o CSV; el archivo que simula la demo es xlsx.

El instrumento de ejemplo es `ENC-DEMO` (proyecto `DEMO-A`, una página en la plantilla). `importar_plantilla` contesta con conteos fijos (`items: 6`, `casillas: 24`) y no lee un JSON de verdad, aunque el selector de archivos devuelve el nombre `plantilla_demo.json`.

## Panel de avance

Pide el comando `tablero`. Muestra dos proyectos de ejemplo:

- `DEMO-A` — Proyecto de ejemplo A
- `DEMO-B` — Proyecto de ejemplo B

Los indicadores que arma con los lotes en memoria son: lotes, páginas leídas, celdas, celdas por revisar, porcentaje leído sin revisión, encuestas aplicadas contra una muestra de 40, avance de actividades, vencidas y próximas.

Las actividades de ejemplo mezclan pasos manuales y, en una de ellas, pasos que la demo marca sola: aplicación en sede, PDF importado, lectura OCR, muestra completa, revisión humana y Excel exportado. Esos pasos leen los conteos simulados (páginas, celdas pendientes, exportaciones). No hay un motor de OCR en este repositorio: el paso se llama «Lectura OCR» y el número sale de las páginas que `mockApi` inventó al «procesar» el lote.

También hay cobertura por unidad (en el ejemplo, `PRA-E1` / instrumento `PRA-LA`), pendientes por persona y una bitácora con tres movimientos ficticios.

## Seguimiento

Es otra pantalla, con otra base ficticia. Tres programas:

- `A-PRA` — Programa A · Escuelas
- `B-PRB` — Programa B · Jóvenes
- `C-PRC` — Programa C · Familias

Cada uno tiene las actividades Vinculación inicial, Diagnóstico, Encuesta de línea base, Talleres, Seguimiento de casos, Encuesta final e Informe, con sedes de ejemplo (`PRA-E1`, `PRB-C1`, `PRC-L1`, etc.). El tablero pinta avance real contra avance programado y un semáforo (verde, amarillo, rojo), más vencidas, próximas a vencer, calendario, indicadores, pendientes, documentos, diarios de campo y observaciones. Hay una unidad marcada como fuera de alcance (`PRA-E4`).

Las pestañas son Actualizaciones, Calendario, Indicadores, Pendientes, Documentos, Bitácora, Diarios, Gestionar e Importar.

**Gestionar** crea y edita actividades, pasos y eventos en este navegador (`localStorage`, clave `demo-segbd-v1-p` más el id del proyecto). Borrar una actividad o un paso pide confirmación. Los estados de paso que acepta el asistente son: Sin iniciar, En proceso, Avanzado, Hecho, Terminado y No aplica.

**Importar** ofrece traer un Excel o CSV y mapear columnas (código, actividad, responsable, paso, fecha, estado, y otras). En la demo `seg_excel_leer` no abre el archivo: devuelve encabezados de ejemplo. Con `?excel=raro` en la URL, el nombre simulado es `columnas_raras.xlsx` y los encabezados cambian. Aplicar la importación fusiona contra los datos ficticios y conserva lo editado en la app.

El corte de ejemplo usa la zona `America/Matamoros` y una «Hoja de control (ficticia)».

## Bandeja de entrada

Documentos que llegan sueltos (PDF, y en los textos de la interfaz también fotos, Excel, Word o texto). Cada uno recibe una clasificación propuesta contra un libro de códigos: tipo, unidad, proyecto, instrumento y actividad, con una confianza y un motivo. Los estados son propuesto, por confirmar y confirmado. Archivar lo oculta; la demo dice que no se borra el archivo.

El libro de ejemplo trae Oficio (`OF`), Diario de campo (`DC`) y Unidad de ejemplo (`U01`). Se pueden agregar códigos (categoría, código, nombre, palabras clave). `libro_importar` responde en ceros: no importa un archivo de verdad.

Unas subidas ficticias ya vienen cargadas (diario, evidencia, documento). Unas reglas locales (`reglas-locales`, no un modelo externo) proponen asociarlas a actividades de Seguimiento o dejarlas por confirmar. Confirmar, rechazar o deshacer cambia ese estado en `localStorage` (`demo-actualizaciones-v1`).

## Asistente IA

Al abrir, la IA está apagada. El texto de la barra dice «IA apagada · respondo con lo que calcula la app».

La pantalla de ajustes lista estos proveedores:

| Id | Nombre en la pantalla | Dónde apunta en la demo |
| --- | --- | --- |
| `ollama` | En este equipo · Ollama | `http://127.0.0.1:11434/v1` |
| `lmstudio` | En este equipo · LM Studio | `http://127.0.0.1:1234/v1` |
| `llamacpp` | En este equipo · llama.cpp | `http://127.0.0.1:8080/v1` |
| `hermes` | Hermes (local) | `http://127.0.0.1:8642/v1` |
| `openrouter` | OpenRouter (iniciar sesión) | `https://openrouter.ai/api/v1` |
| `gemini` | Google Gemini (iniciar sesión) | API de Gemini, modo compatible con OpenAI |
| `xai` | Grok (iniciar sesión con xAI) | `https://api.x.ai/v1` |

En esta demo web, probar la conexión y listar modelos responden «En la demo web no hay IA externa». Iniciar sesión con xAI muestra un código ficticio (`DEMO-1234`) y termina en «no se inició sesión». Detectar Hermes también está simulado.

Con `?ia` en la URL, `mockApi` marca el asistente como encendido, con proveedor `xai` y modelo `grok-4.6`, solo para que se vea esa configuración. Las respuestas siguen siendo el texto simulado.

Lo que sí recorre la demo, aunque la IA externa no conteste, es el flujo de propuestas: el asistente arma una tarjeta (crear o editar una actividad, un paso o un evento; traer un Excel adjunto; clasificar o archivar un documento; resolver una celda; mover un lote; anotar una memoria) y **no guarda nada hasta que se pulsa Aplicar**. Aplicar llama a los comandos simulados y ofrece Deshacer. Las conversaciones viven solo en la memoria de la página: se pierden al recargar.

Las herramientas de consulta que el código declara —lotes, cola, revisión, resultados, seguimiento, documentos, libro de códigos, conciliación, verificación, resumen semanal— en la demo no llaman a un modelo: la respuesta visible es un texto fijo según si el mensaje menciona un archivo, un lote o un calendario.

## Conectores

La pantalla deja armar conexiones y probarlas. En la demo, «Conectar» no abre el navegador: la autorización OAuth queda simulada y «Probar» responde «Simulado (demo)».

Tipos que declara el catálogo:

- **Google.** Drive, hojas, documentos, calendario y correo. El correo solo se lee y se preparan borradores; la descripción dice que nunca se envía nada. Hay filtros de ejemplo (adjuntos de 14 o 30 días, PDF, no leídos). También se puede pedir guardar en Drive solo archivos creados por la app.
- **Microsoft (OneDrive / SharePoint).** PDF de una carpeta de OneDrive, una carpeta para guardar resultados y, en avanzado, un id de sitio de SharePoint.
- **Dropbox.** Traer PDF de una carpeta o guardar resultados.
- **Carpeta de este equipo.** Vigila PDF nuevos. El selector devuelve la ruta ficticia `C:\Encuestas\Escaneos (ficticio)`.
- **Webhook / REST.** Entrada en `127.0.0.1` (puerto y clave), salida por POST a una dirección `https`, y una dirección GET opcional para leer. Al conectar un webhook, la demo devuelve el secreto `demo-token-ficticio`.
- **Servidor MCP.** La descripción dice que lee recursos de un servidor de confianza, por comando local (el ejemplo es `npx mi-servidor-mcp`) o por una dirección, con clave opcional.

Listar archivos remotos devuelve dos nombres ficticios. Traer uno devuelve un párrafo de ejemplo, no el archivo.

## Usuarios y roles

La tabla de usuarios usa estos roles:

| Valor | Etiqueta |
| --- | --- |
| `admin` | Administración |
| `capturista` | Captura |
| `revisor` | Revisión |
| `lector` | Solo consulta |

Ya vienen dos personas ficticias: Persona Admin (`admin@example.com`, administración) y Persona Revisora (`revisor@example.com`, revisión). El formulario para agregar a alguien pide nombre y correo, y el rol inicial del formulario es revisión. El alta solo empuja el registro al arreglo en memoria.

Personalización (nombre, logo y color) dice «Solo administradores». El nombre que devuelve `brand()` es «Lector de encuestas (demo)» y el corto es «Lector».

## Proyectos y avisos de versión

Hay dos proyectos de ejemplo y se puede marcar uno como activo (`proyecto_activar`). La configuración por proyecto que guarda la demo incluye una URL de seguimiento y una de estáticos; el valor de ejemplo de los estáticos es `https://ejemplo.invalid/data`.

El aviso de actualizaciones, en condiciones normales, dice que la demo está al día (`fase: al-dia`, versión `demo`) y `instalar` devuelve `false`: desde el navegador no se instala nada. Con `?actualizacion` en la URL, la demo muestra una actualización ficticia `1.0.3` sobre `1.0.2`. Cambiar el canal (estable / beta) pide un correo, pero `actualizador.canal` no lo revisa: solo guarda el canal nuevo en memoria.
