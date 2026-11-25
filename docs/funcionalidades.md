# Qué hace la app

Lector de encuestas corre en Windows. La primera vez no hay proyectos ni encuestas: el formulario dice «Esta instalación está vacía» y pide el nombre y el correo de administración, más el código y el nombre del primer proyecto. Eso se guarda solo en esta computadora.

Con el proyecto se crea una plantilla en blanco (`PLANTILLA`), sin hojas ni respuestas. Sirve para que se puedan subir PDF. El detalle de cómo se leen las casillas está en [ocr.md](ocr.md).

## Encuestas

1. **Subir lote.** Se arrastran PDF, PNG o JPEG, o se eligen con el diálogo. El original no se modifica. Cada página se rasteriza y se lee en este equipo.
2. **Procesando.** Lista los lotes y deja procesar, reintentar, cancelar o reanudar.
3. **Revisar.** Solo aparecen las celdas con aviso y sin valor: dos marcas, ninguna marca, marca muy tenue, posible borrón o lectura dudosa. Atajos: `1`–`9` elige, `0` deja sin respuesta, `Enter` confirma, `←` y `→` cambian de marca. Lo que queda sin respuesta sale vacío, nunca como 0. Si la página se leyó aquí, se muestra la hoja con un recuadro sobre la zona.
4. **Exportar.** Resume el lote y escribe un Excel. «Guardar en…» abre el diálogo para elegir la carpeta.

## Seguimiento, bandeja y administración

**Seguimiento** abre vacío: «Este proyecto aún no tiene actividades». Se crean con «+ Actividad» o se traen con «Cargar Excel» (`.xlsx` o `.csv`). Nada se guarda hasta «Aplicar cambios».

**Bandeja** empieza sin documentos. Ahí se suben archivos sueltos y se clasifican contra el libro de códigos, que también empieza vacío.

**Conectores** deja armar conexiones propias (carpeta de este equipo, Google, Microsoft, Dropbox, webhook, MCP). No hay archivos ni tokens de ejemplo.

**Usuarios** arranca con la persona de administración que se dio de alta al principio. Se pueden agregar más, con rol de administración, captura, revisión o solo consulta.

**Personalización** cambia el nombre, el logo y el color. El aviso «CONFIDENCIAL · datos de menores y víctimas» no se quita.

**Asistente** abre con la IA apagada. Si se quiere usar, se apunta a un modelo de este equipo (Ollama o LM Studio). No propone cambios por su cuenta ni trae conversaciones de ejemplo.

## Actualización

La esquina inferior muestra la versión. En la copia instalada, busca en GitHub Releases de fortasec53-design/lektor. Si hay una más nueva, se puede descargar y reiniciar para instalarla.
