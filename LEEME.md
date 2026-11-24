# Pizarra Local 1.3

Pizarra infinita estilo Miro, 100 % local.

## Cómo usarla

| Opción | Qué hacer |
|---|---|
| **Windows** | Ejecuta `PizarraLocal-1.3.0-portable.exe`. No necesita instalación. Windows SmartScreen puede avisar porque la app no está firmada: pulsa *Más información → Ejecutar de todas formas*. |
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

## Novedades de la 1.3

- **Texto enriquecido** en notas, formas y textos. Al editar aparece una barra de formato para poner en negrita, cursiva, subrayado, tachado o color **solo una parte del texto**, y para crear **listas con viñetas, numeradas o de tareas (☐/☑)**. Las casillas se marcan con un clic, incluso sin entrar a editar.
- **Recortar imágenes**: doble clic en la imagen (o *✂ Recortar* en el panel), arrastra los bordes y pulsa Enter. El recorte se puede quitar en cualquier momento sin perder la imagen original.
- **Insertar PDF**: cada página se añade como imagen. Se puede arrastrar el archivo, pegarlo o usar el botón de imagen.
- **Copiar formato** (pintor): `Ctrl+Alt+C` o *🖌 Copiar formato* y luego clic en otro elemento (Shift+clic para varios). `Ctrl+Alt+V` pega el formato en lo seleccionado.

> Si usas la versión de navegador (`index.html`), mantén la carpeta `vendor/` junto al archivo: contiene el lector de PDF.

## Novedades de la 1.2

- **Tipografías**: elige la fuente de notas, formas, textos y conectores desde el panel. Incluye las fuentes habituales instaladas y el botón *Cargar todas las fuentes de mi equipo* para usar cualquier fuente del sistema (Chrome, Edge y la app de escritorio). También puedes escribir el nombre de una fuente instalada.
- **Más opciones de texto**: subrayado, tachado, alineación vertical (arriba, en medio, abajo) y botones A−/A+.
- **El texto se ajusta a la nota o forma**: en «Auto (llenar)» ocupa todo el espacio y crece al agrandar la nota; con un tamaño fijo se reduce solo si no cabe, así que nunca se sale. Las palabras muy largas se parten solo si hace falta.

## Novedades de la 1.1

- **Rotación**: asa redonda encima de la selección (Shift = saltos de 15°; se ajusta sola a 0°/90°). También desde el panel: deslizador, ↺ 90°, ↻ 90° y *Enderezar*. Funciona con notas, formas, texto, imágenes, sellos y dibujos, también con varios elementos a la vez.
- **Comentarios** (tecla `C`): clic en cualquier sitio para abrir un hilo. Admite respuestas, autor con avatar, marcar como resuelto o reabrir, y borrar mensajes. Si sueltas el comentario sobre un elemento, se mueve con él. El panel 💬 lista todos los hilos y el contador marca los pendientes. Los comentarios no salen en las exportaciones.
- **App de escritorio** con menú en español. Los enlaces se abren en el navegador del sistema y al exportar se pregunta dónde guardar.

## Descargas automáticas (GitHub Actions)

- **Cada cambio en `main`** compila la app para Windows: instalador (`Pizarra Local Setup.exe`) y versión portátil (`PizarraLocal-…-portable.exe`). Los archivos aparecen en la pestaña **Actions**, dentro de la ejecución, en el apartado *Artifacts*.
- **Para publicar una versión** con enlaces de descarga permanentes: ve a **Releases → Draft a new release**, escribe una etiqueta nueva (p. ej. `v1.3.0`) y pulsa **Publish release**. Unos 10 minutos después, los instaladores aparecen adjuntos a la release.
