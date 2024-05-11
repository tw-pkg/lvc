const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { League } = require('./league');
const { IpcSender } = require('./ipc/sender');
const { sendSummoner } = require('./model/summoner');
const { register } = require('./ipc/history');

register();

function startup() {
  const mainWindow = createWindow();

  const { webContents } = mainWindow;
  IpcSender.init(webContents);

  webContents.on('did-finish-load', async () => {
    await League.onClientUx();
    sendSummoner();
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 700,
    minHeight: 500,
    width: 1400,
    height: 850,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  return mainWindow;
}

ipcMain.on(IPC_KEY.QUIT_APP, () => {
  app.quit();
});
ipcMain.on(IPC_KEY.CLOSE_APP, () => {
  mainWindow.minimize();
});

app.whenReady().then(() => {
  startup();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) startup();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
