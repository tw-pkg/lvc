const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('league', {
  onClient: (callback) => ipcRenderer.on('on-client', (evt, value) => callback(value)),
  removeOnClient: (callback) => ipcRenderer.removeAllListeners('on-client', (evt, value) => callback(value))
})