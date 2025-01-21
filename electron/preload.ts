import { contextBridge, ipcRenderer } from 'electron'

// 通过 contextBridge 暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-min'),
  maximize: () => ipcRenderer.send('window-max'),
  close: () => ipcRenderer.send('window-close'),
  onMaximize: (callback: (maximized: boolean) => void) => {
    ipcRenderer.on('window-maximized', (_event, value) => callback(value))
    // 返回清理函数
    return () => {
      ipcRenderer.removeAllListeners('window-maximized')
    }
  },
  // 添加主进程消息监听
  onMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_event, value) => callback(value))
    return () => {
      ipcRenderer.removeAllListeners('main-process-message')
    }
  }
})

// 更新类型声明
declare global {
  interface Window {
    electronAPI: {
      minimize: () => void
      maximize: () => void
      close: () => void
      onMaximize: (callback: (maximized: boolean) => void) => () => void
      onMessage: (callback: (message: string) => void) => () => void
    }
  }
}
