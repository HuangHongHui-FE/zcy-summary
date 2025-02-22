const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions

  ping: () => ipcRenderer.invoke("ping"),
});

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})


contextBridge.exposeInMainWorld('electronAPI', {
  // 进程间通信 - 渲染器到主进程（单向）
  setTitle: (title) => ipcRenderer.send('set-title', title),
  // 进程间通信 - 渲染器到主进程（双向）
  openFile: () => ipcRenderer.invoke('dialog:openFile'),

  // 进程间通信 - 主进程到渲染器
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  counterValue: (value) => ipcRenderer.send('counter-value', value)
})
