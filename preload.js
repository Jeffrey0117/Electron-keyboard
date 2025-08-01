const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  copyToClipboard: (text) => ipcRenderer.send('copy-to-clipboard', text),
  openUrl: (url) => ipcRenderer.send('open-url', url)
})