const { ipcMain, app } = require('electron');
const { History } = require('../models/history');
const { Credentials } = require('../credentials');

function registerGlobalListeners(mainWindow) {
  ipcMain.on('quit', () => {
    app.quit();
  });
  ipcMain.on('close', () => {
    mainWindow.minimize();
  });

  ipcMain.handle('summoner-history', async (_, puuid) => {
    const data = await Credentials.request(`/lol-match-history/v1/products/lol/${puuid}/matches`, 'GET')
    const history = new History(data);
    return history.getStats();
  });
}

module.exports = {
  registerGlobalListeners,
};
