const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { registerGlobalListeners } = require('./ipc/ipc');
const { onLeagueClient } = require('./league');
const IpcSender = require('./ipc/sender');
const { autoUpdater } = require("electron-updater");
const { handle } = require('./handler');

let mainWindow;

function startup() {
  mainWindow = createMainWindow();

  registerGlobalListeners(mainWindow);

  const { webContents } = mainWindow;
  IpcSender.init(webContents);

  webContents.on('did-finish-load', async () => {
    const { ws, summoner } = await onLeagueClient();
    handle(ws, summoner);
  });

  autoUpdater.checkForUpdates();
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
  if(app.isPackaged) {
    return `file://${path.join(__dirname, '../index.html')}`;
  }
  return 'http://localhost:3000';
}

app.on('ready', () => {
  startup();
});

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    startup();
  }
})

// 현재 app version
// const version = app.getVersion();
// 일렉트론 앱 종료 후 최신 버전으로 다시 설치
// autoUpdater.quitAndInstall();

autoUpdater.on("update-available", () => {
  console.log("update_available");
});
autoUpdater.on("update-downloaded", () => {
  console.log("update_downloaded");
});

app.on('window-all-closed', function () {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});
