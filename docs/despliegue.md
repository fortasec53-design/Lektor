# Despliegue

La demo es un sitio estático. No hay servidor de aplicación ni paso de compilación en este repositorio: se publican los archivos tal como están.

## Ruta base `/lektor/`

Vite dejó las direcciones absolutas del sitio anterior. Para publicarlo en `fortasec53-design.github.io/lektor` se reemplazó únicamente el prefijo `/lector-demo/` por `/lektor/` en:

- `index.html`, en el `<script>` del JS y el `<link>` del CSS
- `assets/index-BzLNX1sw.js`, en el ayudante de precarga: `function (e) { return "/lektor/" + e }`

Los iconos siguen en relativo (`./favicon.ico`, `./icono-32.png`). `mockApi` se importa con `./mockApi-BJ7H9aw2.js`, también relativo al JS, así que no llevaba el prefijo viejo.

No se renombraron archivos ni se cambió la lógica de la app.

## Nombre del repositorio

En GitHub el repositorio se llama **`Lektor`**, con L mayúscula: [fortasec53-design/Lektor](https://github.com/fortasec53-design/Lektor). La dirección `…/lektor` abre el mismo repositorio porque GitHub no distingue mayúsculas en el nombre, pero el sitio de Pages sí las distingue en la ruta.

Esta compilación pide los archivos en `/lektor/` (minúsculas). Con el nombre actual, Pages publicaría en `https://fortasec53-design.github.io/Lektor/` y el navegador no encontraría `/lektor/assets/…`.

Antes de activar Pages, en **Settings → General** cambia el nombre del repositorio a `lektor`, todo en minúsculas. La URL del sitio queda entonces:

https://fortasec53-design.github.io/lektor/

## GitHub Pages

El sitio debe salir de la rama **`main`**, carpeta **`/` (raíz)**.

En el repositorio: **Settings → Pages → Build and deployment → Deploy from a branch**, rama `main` y carpeta `/ (root)`, y guardar.

Desde aquí no se pudo activar Pages: la credencial con la que se empujó el historial puede escribir en el repositorio, pero GitHub responde 403 («Resource not accessible by integration») al crear el sitio. Lo activa el dueño de la cuenta en Settings.

GitHub tarda un momento en publicar el primer build. La página correcta pide los assets en `/lektor/assets/`. Si el navegador pide `/lector-demo/assets/`, está viendo la compilación anterior a este cambio.

Para volver a publicar basta con empujar a `main`. Pages vuelve a tomar la raíz de esa rama.

## Verla en esta computadora

Los scripts no cargan si se abre el HTML como archivo local, porque el navegador busca `https://…/lektor/assets/…` (o `file:///lektor/…`, que no existe).

Hace falta un servidor estático y que la carpeta del repositorio se vea con el nombre de ruta `lektor`.

Si el clon ya se llama `lektor`:

```bash
cd ..
python3 -m http.server 8080
```

Abre http://127.0.0.1:8080/lektor/

Si el clon tiene otro nombre, sirve un directorio que contenga un enlace con ese nombre:

```bash
mkdir -p /tmp/sitio-lektor
ln -s "$(pwd)" /tmp/sitio-lektor/lektor
python3 -m http.server 8080 --directory /tmp/sitio-lektor
```

Abre la misma URL. Recarga forzada si el navegador guardó el `index.html` viejo.

Qué comprobar:

- `http://127.0.0.1:8080/lektor/` muestra el título «Lector de encuestas» y la bienvenida o el asistente.
- `http://127.0.0.1:8080/lektor/assets/index-BzLNX1sw.js` y `index-DakRZkfX.css` responden, igual que `mockApi-BJ7H9aw2.js`.
- En la red del navegador no queda ninguna petición a `/lector-demo/`.

La política de seguridad del HTML solo permite scripts, estilos e imágenes del mismo origen (`default-src 'self'`). Una llamada a otro origen (un proveedor de IA o `127.0.0.1` desde Pages) queda bloqueada. En esta demo, además, `mockApi` no hace esas llamadas.

## Parámetros útiles al probar

Se agregan a la URL de la demo, por ejemplo `http://127.0.0.1:8080/lektor/?ia`.

| Parámetro | Efecto en `mockApi` |
| --- | --- |
| `?ia` | Marca el asistente como encendido con Grok (`xai`, `grok-4.6`). La respuesta sigue siendo simulada. |
| `?actualizacion` | Muestra una actualización ficticia 1.0.3. |
| `?excel=raro` | El archivo de avance simulado se llama `columnas_raras.xlsx` y trae otros encabezados. |

Sin esos parámetros, la IA aparece apagada y el aviso de versión dice que la demo está al día.

## Releases de Windows

Los `.exe` de las versiones de escritorio que se publiquen más adelante van en GitHub Releases:

https://github.com/fortasec53-design/lektor/releases

Eso es independiente de Pages. Un release no sustituye la rama `main`: la demo web sigue siendo la compilación de la raíz. Este repositorio no incluye hoy el proyecto con el que se generaría ese instalador.
