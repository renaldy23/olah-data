const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Enables use of Node.js in renderer
      contextIsolation: false,
      webviewTag: true,
      // devTools: true,
    },
    icon: path.join(__dirname, 'frontend', 'public', 'app_logo.ico.ico'),
  });

  win.loadURL('http://localhost:3000');
  // win.loadFile('frontend/build/index.html');
  // win.webContents.on('context-menu', (e) => {
  //   e.preventDefault();
  // });

  // const menuTemplate = [
  //   {
  //     label: 'File',
  //     submenu: [
  //       { role: 'quit' }
  //     ]
  //   },
  //   {
  //     label: 'Edit',
  //     submenu: [
  //       { role: 'undo' },
  //       { role: 'redo' },
  //       { type: 'separator' },
  //       { role: 'cut' },
  //       { role: 'copy' },
  //       { role: 'paste' }
  //     ]
  //   },
  //   {
  //     label: 'View',
  //     submenu: [
  //       { role: 'reload' },
  //       { role: 'forcereload' },
  //       { type: 'separator' },
  //       { role: 'resetzoom' },
  //       { role: 'zoomin' },
  //       { role: 'zoomout' },
  //       { type: 'separator' },
  //       { role: 'togglefullscreen' }
  //       // { role: 'toggledevtools' } // Remove or comment out this line
  //     ]
  //   },
  //   {
  //     label: 'Window',
  //     submenu: [
  //       { role: 'minimize' },
  //       { role: 'close' }
  //     ]
  //   },
  // ];
  // const menu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// app.on('browser-window-created', (e, window) => {
//   window.webContents.on('before-input-event', (event, input) => {
//     // Disable 'Ctrl+Shift+I', 'Ctrl+Shift+C', 'F12'
//     if (input.key === 'F12' || (input.control && input.shift && input.key === 'I')) {
//       event.preventDefault();
//     }
//   });
// });