const { contextBridge, shell } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  openExternalLink: (url) => shell.openExternal(url)
});