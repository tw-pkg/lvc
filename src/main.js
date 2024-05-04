const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { onLeagueClientUx, League } = require('./league')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('http://localhost:3000');

  const { webContents } = mainWindow;

  webContents.on('did-finish-load', async () => {
    const [credentials, ws] = await onLeagueClientUx();
    const league = new League(credentials, ws);
    league.subscribes();
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})