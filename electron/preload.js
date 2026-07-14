const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Platform info
  platform: process.platform,

  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('window-minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window-maximize'),
  closeWindow: () => ipcRenderer.invoke('window-close'),

  // Storage
  getStorage: (key) => ipcRenderer.invoke('storage-get', key),
  setStorage: (key, value) => ipcRenderer.invoke('storage-set', key, value),
  removeStorage: (key) => ipcRenderer.invoke('storage-remove', key),

  // App info
  getAppVersion: () => ipcRenderer.invoke('app-version'),

  // Updates
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
})