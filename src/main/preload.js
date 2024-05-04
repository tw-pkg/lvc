const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('ipcRenderer', {
  on: (channel, listener) => ipcRenderer.on(channel, listener),
  off: (channel, listener) => ipcRenderer.off(channel, listener),
  once: (channel, listener) => ipcRenderer.once(channel, listener),
  send: (channel, ...args) => ipcRenderer.send(channel, ...args),
  removeListener: (channel, listener) => ipcRenderer.removeListener(channel, listener),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  invoke: async (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  sendSync: (channel, ...args) => ipcRenderer.sendSync(channel, ...args),
  sendToHost: (channel, ...args) => ipcRenderer.sendToHost(channel, ...args),
});

contextBridge.exposeInMainWorld('reload', () => ipcRenderer.send('ytmd:reload'));

contextBridge.exposeInMainWorld('ELECTRON_RENDERER_URL', process.env.ELECTRON_RENDERER_URL);
