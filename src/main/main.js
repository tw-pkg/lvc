const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { registerGlobalListeners } = require('./ipc/ipc');
const { onLeagueClient, League } = require('./league');
const { IpcSender } = require('./ipc/sender');

registerGlobalListeners();

let mainWindow;

function startup() {
  mainWindow = createMainWindow();

  const { webContents } = mainWindow;
  IpcSender.init(webContents);

  webContents.on('did-finish-load', async () => {
    onLeagueClient().then(([credentials, ws]) => {
      const league = new League(credentials, ws);
      league.sendClient();
    })
  })
}

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('http://localhost:3000');
  return win;
}

app.whenReady().then(() => {
  startup();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) startup();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
