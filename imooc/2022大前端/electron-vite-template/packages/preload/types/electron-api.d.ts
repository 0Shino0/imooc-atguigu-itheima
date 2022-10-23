declare type IpcRenderType = {
  on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): this
  send(channel: string, ...args: any[]): void
}
interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>
  ipcRenderer: IpcRenderType
}

declare interface Window {
  electron: Readonly<ElectronApi>
  electronRequire?: NodeRequire
}
