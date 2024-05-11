const { ipcMain } = require('electron');
const { History } = require('../model/history');

function register() {
  ipcMain.handle('summoner-history', async (_, puuid) => {
    const history = await History.fetch(puuid);
    return history.getStats();
  });
}

module.exports = {
  register,
};
