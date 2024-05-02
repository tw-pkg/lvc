const { onLeagueClientUx, League } = require('./league')

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL('http://localhost:3000');

  win.webContents.on('did-finish-load', () => {
    onLeagueClientUx().then(([credentials, ws]) => {
      const league = new League(credentials, ws, win.webContents);
      league.subscribes();
    })
  })
}

module.exports = {
  createWindow,
  win
}