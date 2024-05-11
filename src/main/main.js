const { app, BrowserWindow } = require('electron');
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
    width: 1400,
    height: 850,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL('http://localhost:3000');
  return mainWindow;
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
