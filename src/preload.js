const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('league', {
  summoner: (callback) => ipcRenderer.on('summoner', (evt, value) => callback(value))
})