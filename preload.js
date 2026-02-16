const { contextBridge, ipcRenderer } = require('electron')

// Minimal secure bridge — extend as needed for IPC between renderer <-> main
contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, ...args) => ipcRenderer.send(channel, ...args),
  on: (channel, cb) => ipcRenderer.on(channel, (event, ...args) => cb(...args)),
  versions: process.versions
})
