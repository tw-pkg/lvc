const { ipcMain } = require('electron')
const { History } = require("./history")

ipcMain.on('profile-history', async (_, puuid) => {
  const history = await History.fetch(puuid);
  return history.getStats();
})
