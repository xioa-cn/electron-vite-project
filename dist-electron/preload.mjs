"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => electron.ipcRenderer.send("window-min"),
  maximize: () => electron.ipcRenderer.send("window-max"),
  close: () => electron.ipcRenderer.send("window-close"),
  onMaximize: (callback) => {
    electron.ipcRenderer.on("window-maximized", (_event, value) => callback(value));
    return () => {
      electron.ipcRenderer.removeAllListeners("window-maximized");
    };
  },
  // 添加主进程消息监听
  onMessage: (callback) => {
    electron.ipcRenderer.on("main-process-message", (_event, value) => callback(value));
    return () => {
      electron.ipcRenderer.removeAllListeners("main-process-message");
    };
  }
});
