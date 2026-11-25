# Lector de encuestas

Convierte encuestas en papel, ya escaneadas en PDF, en datos: subir el lote, revisar las marcas dudosas y exportar. La interfaz está en español (México), con cambio a inglés, aviso de confidencialidad y guía rápida (F1).

Este repositorio tenía solo la compilación de Vite (HTML, CSS y JavaScript en la raíz). El código fuente se reconstruyó a partir de esos paquetes. La app de escritorio es React + Electron y la lectura de casillas usa **Tesseract** (`spa`), sin servicio de pago ni llaves.

La demo que publica GitHub Pages sigue siendo la compilación de la raíz (`index.html` y `assets/`). El build nuevo sale en `dist/` y no la sustituye. Los detalles de qué se recuperó tal cual y qué se aproximó están en [docs/reconstruccion.md](docs/reconstruccion.md).

## Cómo correrla

```bash
npm install
npm run dev
```

Abre http://127.0.0.1:5173/lektor/

En el navegador (`npm run dev` y `npm run build`) no hay `window.lektor`, así que entra la API simulada (`src/mock/mockApi.js`): los PDF no se leen, los datos son ficticios y viven en memoria y en `localStorage`. Sirven `?ia`, `?actualizacion` y `?excel=raro`. Ese mock **no entra** en el `.exe`: el build de escritorio usa `VITE_ESCRITORIO=1` y un almacén vacío.

La app instalada abre sin proyectos ni encuestas. La primera vez pide el administrador y el primer proyecto («Esta instalación está vacía»). Lo que se capture se guarda en la carpeta de usuario del sistema (`userData/datos.json`), no dentro del programa. `samples/` y `npm run ocr:probar` quedan en el repositorio para desarrollo y electron-builder no los empaqueta. Ver [docs/ocr.md](docs/ocr.md).

## Compilar

| Comando | Resultado |
| --- | --- |
| `npm run build` | Sitio web en `dist/`, con base `/lektor/` |
| `npm run build:escritorio` | La misma interfaz con rutas relativas, en `dist-electron/` |
| `npm run dist` | Instalador NSIS `release/Lector-de-encuestas-Setup-<versión>.exe` |
| `npm run dist:linux` | Carpeta `release/linux-unpacked/` para probar el empaquetado en Linux |
| `npm run ocr:probar` | Genera `samples/encuesta-escaneada.pdf` y comprueba Tesseract |

En Linux, `npm run dist` necesita Wine (incluido Wine de 32 bits) porque NSIS y rcedit son herramientas de Windows. En una computadora Windows el mismo comando no necesita Wine. El instalador no va firmado si no hay certificado.

Para ver el sitio compilado:

```bash
npm run build
mkdir -p /tmp/sitio-lektor
ln -s "$(pwd)/dist" /tmp/sitio-lektor/lektor
python3 -m http.server 8080 --directory /tmp/sitio-lektor
```

Abre http://127.0.0.1:8080/lektor/

## Escritorio y actualizaciones

Electron abre con `contextIsolation`, sin `nodeIntegration`, y con el preload en sandbox. El proceso principal solo muestra diálogos, lee el PDF que eligió la persona y escribe el Excel.

`electron-updater` apunta a los **GitHub Releases** de [fortasec53-design/lektor](https://github.com/fortasec53-design/lektor/releases). Al empaquetar se genera `app-update.yml` con `provider: github`, `owner: fortasec53-design`, `repo: lektor`.

Para publicar una versión:

1. Sube `version` en `package.json`.
2. En una máquina con permiso de escritura al repositorio: `GH_TOKEN=… npm run dist -- --publish always` (o sube a mano el `.exe`, el `.blockmap` y `latest.yml` que quedan en `release/`).
3. El release tiene que ser público. La app instalada, al abrirse, consulta ese release. El canal beta usa `allowPrerelease`.

La demo web no instala nada: el aviso de versión sigue siendo el simulado.

## OCR

El paquete compilado no trae la llamada al servicio de pago: en el navegador todo pasa por `mockApi`. En Electron, subir un PDF rasteriza cada página con pdf.js, corre Tesseract en español (datos `spa` en `public/tessdata/`, también copiados al instalador) y mide la tinta de las casillas. Lo que no queda seguro entra a «Revisar» con un aviso. Confianza menor a 0.75 y sin un aviso más específico se guarda como `dudosa`.

No hay llaves ni dependencias de un proveedor de IA para la lectura. El asistente de la interfaz sigue pudiendo apuntar a un modelo que configure la persona (Ollama, etc.); en la demo esas pruebas responden que no hay IA externa.

Limitaciones y el PDF de ejemplo: [docs/ocr.md](docs/ocr.md).

## Mapa del código

```
src/index.html              entrada de Vite (base /lektor/ o ./ en Electron)
src/main.jsx                elige mockApi o la API de escritorio
src/pantallas.js            nombres de las pantallas
src/recuperado/interfaz.jsx interfaz recuperada del paquete
src/estilos.css             CSS recuperado (mismas clases)
src/mock/mockApi.js         API simulada recuperada
src/ocr/                    Tesseract, pdf.js y casillas
src/desktop/api.js          puente de Electron
src/exportar/xlsx.js        Excel mínimo para el escritorio
electron/                   main y preload
public/tessdata/spa.traineddata
samples/encuesta-escaneada.pdf
```

La raíz (`index.html`, `assets/`, iconos) es la compilación anterior y no se regenera con `npm run build`.
