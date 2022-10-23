import type { IpcRendererEvent } from 'electron'
import { contextBridge, ipcRenderer } from 'electron'

const _ipcRenderer = {
  // 暴露出去的ipcRenderer上的API
  on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, listener)
    return _ipcRenderer
  },
  send: (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, ...args)
  }
}

const apiKey = 'electron'
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api: ElectronApi = {
  versions: process.versions,
  ipcRenderer: _ipcRenderer
}

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api)

// window.electron.versions
