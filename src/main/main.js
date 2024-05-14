const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { registerGlobalListeners } = require('./ipc/ipc');
const { onLeagueClient, League } = require('./league');
const { IpcSender } = require('./ipc/sender');

let mainWindow;

function startup() {
  mainWindow = createMainWindow();

  registerGlobalListeners(mainWindow);

  const { webContents } = mainWindow;
  IpcSender.init(webContents);

  webContents.on('did-finish-load', async () => {
    onLeagueClient().then(([credentials, ws]) => {
      const league = new League(credentials, ws);
      league.sendClient();
      league.subscribes();
    })
  })
}

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 500,
    width: 1400,
    height: 850,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolvePath());

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  return mainWindow;
}

function resolvePath() {
  if(process.env.NODE_ENV === 'production') {
    return `file://${path.join(__dirname, '../../build/', 'index.html')}`;
  }

  return 'http://localhost:3000';
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
