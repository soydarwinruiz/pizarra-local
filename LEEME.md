# Pizarra Local 1.1

Pizarra infinita estilo Miro, 100 % local.

## Cómo usarla

| Opción | Qué hacer |
|---|---|
| **Windows** | Ejecuta `PizarraLocal-1.1.0-portable.exe`. No necesita instalación. Windows SmartScreen puede avisar porque la app no está firmada: pulsa *Más información → Ejecutar de todas formas*. |
| **Linux** | `chmod +x "Pizarra Local-1.1.0.AppImage"` y ejecútalo. |
| **macOS** | Genera la app en tu Mac (ver abajo). |
| **Navegador** | Abre `index.html` con doble clic en Chrome, Edge o Firefox. |

La app de escritorio y el navegador guardan los tableros por separado. Para pasar tableros de uno a otro, usa *Guardar copia (.json)* e *Importar*.

## Generar la app tú mismo (Windows, macOS o Linux)

Necesitas [Node.js](https://nodejs.org) 18 o superior. En esta carpeta:

```bash
npm install
```

```bash
npm start          # probar sin empaquetar
npm run dist       # crea el instalador para tu sistema en la carpeta dist/
```

- En Windows, `npm run dist` crea además un instalador (`Pizarra Local Setup.exe`).
- En macOS crea un `.dmg`. Como no está firmado, la primera vez ábrelo con clic derecho → *Abrir*.

## Novedades de la 1.1

- **Rotación**: asa redonda encima de la selección (Shift = saltos de 15°; se ajusta sola a 0°/90°). También desde el panel: deslizador, ↺ 90°, ↻ 90° y *Enderezar*. Funciona con notas, formas, texto, imágenes, sellos y dibujos, también con varios elementos a la vez.
- **Comentarios** (tecla `C`): clic en cualquier sitio para abrir un hilo. Admite respuestas, autor con avatar, marcar como resuelto o reabrir, y borrar mensajes. Si sueltas el comentario sobre un elemento, se mueve con él. El panel 💬 lista todos los hilos y el contador marca los pendientes. Los comentarios no salen en las exportaciones.
- **App de escritorio** con menú en español. Los enlaces se abren en el navegador del sistema y al exportar se pregunta dónde guardar.

## Descargas automáticas (GitHub Actions)

- **Cada cambio en `main`** compila la app para Windows (instalador y portátil), macOS (`.dmg` para Intel y Apple Silicon) y Linux (`.AppImage` y `.deb`). Los archivos aparecen en la pestaña **Actions**, dentro de la ejecución, en el apartado *Artifacts*.
- **Para publicar una versión** con enlaces de descarga permanentes: ve a **Releases → Draft a new release**, escribe una etiqueta nueva (p. ej. `v1.1.0`) y pulsa **Publish release**. Unos 10 minutos después, los instaladores aparecen adjuntos a la release.
