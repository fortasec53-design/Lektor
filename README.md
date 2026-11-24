# Lector de encuestas

Demo web de **Lector de encuestas**. Convierte encuestas en papel, ya escaneadas en PDF, en datos, en tres pasos: subir el lote, revisar las marcas dudosas y exportar. Trae un panel de avance por proyecto y actividades, usuarios con roles, y un asistente con guía rápida (F1).

En esta publicación todo es ficticio. Si el navegador no trae `window.ocr` (la app de escritorio), el JavaScript compilado importa `assets/mockApi-BJ7H9aw2.js` y la interfaz trabaja contra esa API simulada, en memoria y en `localStorage`. No hay datos reales ni un servicio detrás.

**Este repositorio solo guarda la compilación** (HTML, CSS, JavaScript y los iconos que produce Vite). No está el código fuente: no hay `src/`, `package.json` ni forma de volver a compilar la app desde aquí.

## Qué hace la demo

La bienvenida lo resume así: «Convierte encuestas en papel en datos, en tres pasos.»

1. **Subir.** Se arrastran los PDF escaneados. La interfaz dice que el original no se modifica.
2. **Revisar.** Solo salen las marcas que no se leyeron con seguridad. Lo que se deja sin respuesta queda vacío, nunca como 0.
3. **Exportar.** La bienvenida lo describe como descargar el Excel o CSV para el análisis. En esta demo la exportación está simulada y el formato que registra `mockApi` es `xlsx`: responde que la exportación real solo existe en la app de escritorio.

La barra lateral agrupa el resto:

| Grupo | Pantallas |
| --- | --- |
| Trabajo | Asistente IA, Panel de avance, Seguimiento, Bandeja de entrada |
| Encuestas | 1 · Subir lote, Procesando, 2 · Revisar, 3 · Exportar |
| Administración | Conectores, Usuarios y roles, Personalización |

Arriba se cambia el idioma (ES / EN), aparece el aviso «CONFIDENCIAL · datos de menores y víctimas» y el botón **?** abre la guía rápida. La misma guía se abre con **F1**. El detalle de cada pantalla está en [docs/funcionalidades.md](docs/funcionalidades.md).

## Estructura

```
index.html                  página de entrada
favicon.ico                 icono 16×16
icono-32.png                icono 32×32
assets/index-BzLNX1sw.js    interfaz compilada (React)
assets/index-DakRZkfX.css   estilos compilados
assets/mockApi-BJ7H9aw2.js  API simulada y datos ficticios
docs/                       documentación
```

Los nombres con hash los generó Vite. La ruta base quedó fija en `/lektor/`: `index.html` pide `/lektor/assets/...` y el ayudante de precarga del JS (`modulepreload`) antepone `/lektor/` a los módulos. Por eso el sitio vive en:

https://fortasec53-design.github.io/lektor/

## Verla y publicarla

Hace falta un servidor que sirva **esta carpeta** en la ruta `/lektor/`. Abrir `index.html` con `file://` no carga los scripts.

En local, con el clon en una carpeta llamada `lektor`:

```bash
cd ..
python3 -m http.server 8080
```

Abre http://127.0.0.1:8080/lektor/

En GitHub Pages se publica la rama `main`, carpeta raíz (`/`). Los pasos y el caso en que la carpeta del clon tiene otro nombre están en [docs/despliegue.md](docs/despliegue.md).

## Versiones de Windows (.exe)

Las versiones de escritorio para Windows se van a publicar como archivos `.exe` en **GitHub Releases** de este repositorio:

https://github.com/fortasec53-design/lektor/releases

Hoy no hay instaladores aquí. Esta rama es solo la demo web compilada. La propia demo distingue esa app de escritorio: ahí estaría la exportación real, la lectura de los PDF en el equipo y el inicio de sesión con un proveedor de IA. En la web esas acciones responden como simulación.

## Procedencia

El historial de `main` es el de [KodaHub2026/lector-demo](https://github.com/KodaHub2026/lector-demo) (rama `main`; no había otras ramas ni etiquetas). El commit de esa demo es `1301ca857b1ba343cdc2c3d80e881bd89f251d78`. Encima de ese historial solo se cambió la ruta base de `/lector-demo/` a `/lektor/` y se agregó esta documentación.
