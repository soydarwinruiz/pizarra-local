// Pizarra Local — envoltorio de escritorio (Electron)
const {app, BrowserWindow, Menu, shell, dialog} = require('electron');
const path = require('path');

let win;

function run(js) {
  if (win && !win.isDestroyed()) win.webContents.executeJavaScript(js).catch(() => {});
}
// Los atajos de edición los gestiona la propia página (registerAccelerator: false);
// el menú solo los muestra. Si el foco está en un campo de texto se usa la acción nativa; si no, la de la pizarra.
const typing = "(document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))";

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 800,
    minHeight: 500,
    title: 'Pizarra Local',
    icon: path.join(__dirname, 'icon.png'),
    backgroundColor: '#f2f2f2',
    show: false,
    webPreferences: {contextIsolation: true, nodeIntegration: false, spellcheck: false}
  });
  win.once('ready-to-show', () => win.show());
  win.loadFile(path.join(__dirname, 'index.html'));

  // Enlaces externos en el navegador del sistema; ventanas en blanco (imprimir/PDF) dentro de la app.
  win.webContents.setWindowOpenHandler(({url}) => {
    if (/^https?:|^mailto:/i.test(url)) { shell.openExternal(url); return {action: 'deny'}; }
    return {action: 'allow', overrideBrowserWindowOptions: {width: 1000, height: 800, autoHideMenuBar: true}};
  });
  // Nunca navegar fuera de la pizarra (p. ej. al soltar un archivo fuera del lienzo).
  win.webContents.on('will-navigate', (e, url) => {
    if (url !== win.webContents.getURL()) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); }
  });
  // Pedir siempre dónde guardar las exportaciones.
  win.webContents.session.on('will-download', (e, item) => {
    const p = dialog.showSaveDialogSync(win, {defaultPath: item.getFilename()});
    if (p) item.setSavePath(p); else item.cancel();
  });
}

const isMac = process.platform === 'darwin';
const template = [
  ...(isMac ? [{role: 'appMenu', label: 'Pizarra Local'}] : []),
  {
    label: 'Archivo',
    submenu: [
      {label: 'Nuevo tablero…', accelerator: 'CmdOrCtrl+N', click: () => run('newBoard()')},
      {label: 'Mis tableros', accelerator: 'CmdOrCtrl+O', click: () => run("document.getElementById('sidebar').classList.add('open'); renderBoardList()")},
      {type: 'separator'},
      {label: 'Importar tablero (.json)…', click: () => run("document.getElementById('fileJson').click()")},
      {label: 'Guardar copia (.json)…', click: () => run('exportJSON()')},
      {type: 'separator'},
      {label: 'Exportar como PNG…', click: () => run('exportPNG(false)')},
      {label: 'Exportar selección como PNG…', click: () => run('exportPNG(true)')},
      {label: 'Exportar como SVG…', click: () => run('exportSVG()')},
      {label: 'Imprimir / PDF…', accelerator: 'CmdOrCtrl+P', click: () => run('printPDF()')},
      {type: 'separator'},
      {label: 'Insertar imagen…', click: () => run("document.getElementById('fileImg').click()")},
      {type: 'separator'},
      isMac ? {role: 'close', label: 'Cerrar ventana'} : {role: 'quit', label: 'Salir'}
    ]
  },
  {
    label: 'Editar',
    submenu: [
      {label: 'Deshacer', accelerator: 'CmdOrCtrl+Z', registerAccelerator: false, click: () => run(`${typing} ? document.execCommand('undo') : undo()`)},
      {label: 'Rehacer', accelerator: 'CmdOrCtrl+Shift+Z', registerAccelerator: false, click: () => run(`${typing} ? document.execCommand('redo') : redo()`)},
      {type: 'separator'},
      {role: 'cut', label: 'Cortar'},
      {role: 'copy', label: 'Copiar'},
      {role: 'paste', label: 'Pegar'},
      {label: 'Duplicar', accelerator: 'CmdOrCtrl+D', registerAccelerator: false, click: () => run('duplicateSelection()')},
      {label: 'Seleccionar todo', accelerator: 'CmdOrCtrl+A', registerAccelerator: false, click: () => run(`${typing} ? document.execCommand('selectAll') : selectAll()`)},
      {type: 'separator'},
      {label: 'Buscar…', accelerator: 'CmdOrCtrl+F', registerAccelerator: false, click: () => run('openSearch()')}
    ]
  },
  {
    label: 'Ver',
    submenu: [
      {label: 'Ver todo', click: () => run('zoomToFit()')},
      {label: 'Zoom 100 %', click: () => run("document.getElementById('zoomPct').onclick()")},
      {label: 'Acercar', click: () => run('zoomAt(innerWidth/2, innerHeight/2, 1.25)')},
      {label: 'Alejar', click: () => run('zoomAt(innerWidth/2, innerHeight/2, 0.8)')},
      {type: 'separator'},
      {label: 'Comentarios', click: () => run("document.getElementById('commentsBtn').click()")},
      {label: 'Modo oscuro', click: () => run("document.getElementById('themeBtn').click()")},
      {label: 'Presentar marcos', accelerator: 'F5', click: () => run('present()')},
      {type: 'separator'},
      {role: 'togglefullscreen', label: 'Pantalla completa'}
    ]
  },
  {
    label: 'Ayuda',
    submenu: [
      {label: 'Atajos de teclado', click: () => run('showHelp()')},
      {role: 'toggleDevTools', label: 'Herramientas de desarrollo'},
      {type: 'separator'},
      {label: 'Acerca de Pizarra Local', click: () => dialog.showMessageBox(win, {type: 'info', title: 'Pizarra Local', message: `Pizarra Local ${app.getVersion()}`, detail: 'Pizarra infinita 100 % local. Tus tableros se guardan en este equipo.'})}
    ]
  }
];

// Una sola instancia: si se abre de nuevo, enfocar la ventana existente.
if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.whenReady().then(() => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    createWindow();
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
  });
  app.on('window-all-closed', () => { if (!isMac) app.quit(); });
}
