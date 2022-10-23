import type { MenuItemConstructorOptions } from 'electron'
import { app, BrowserWindow, Menu, shell, ipcMain, globalShortcut, Notification } from 'electron'
import { join } from 'path'
import { URL } from 'url'
// allowSyntheticDefaultImports true
// 安装i18n的types npm i @types/i18n -D
import i18n from 'i18n'
import qs from 'qs'
import axios from 'axios'
import Store from 'electron-store'
import dayjs from 'dayjs'
import sound from 'sound-play'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

// 设置autoUpdater的日志
log.transports.file.level = 'info'
autoUpdater.logger = log

// const { getDoNotDisturb } = require('electron-notification-state')
// On Windows, logs `true` if "quiet hours" are enabled
// On macOS, logs `true` if "do not disturb" is enabled
// console.log('quiet:', getDoNotDisturb())

// axios会去使用XHR 或者 Node.js adapters
axios.defaults.adapter = require('axios/lib/adapters/http')

const store = new Store()
// console.log('userInfo', store.get('userInfo'))
// console.log('token', store.get('token'))

// 显示通知
// 匿名式的函数，需要在使用之前进行定义
const sendStatusToWindow = (text: string) => {
  log.info(text)
  mainWindow?.webContents.send('message', text)
}

// 是否需要进行通知更新
const checkUpdate = async (flag = false) => {
  // 私有仓库:
  // autoUpdater.setFeedURL({
  //   provider: 'github',
  //   repo: 'repo',
  //   owner: 'owner',
  //   private: true,
  //   token: '<personal-access-token>'
  // })

  sendStatusToWindow('Start Checkding')

  flag ? autoUpdater.checkForUpdatesAndNotify() : autoUpdater.checkForUpdates()

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...')
  })
  autoUpdater.on('update-available', (info) => {
    const str = JSON.stringify(info)
    log.info(info)
    sendStatusToWindow('Update available.' + str)
  })
  autoUpdater.on('update-not-available', (info) => {
    const str = JSON.stringify(info)
    log.info(info)
    sendStatusToWindow('Update not available.' + str)
  })
  autoUpdater.on('error', (err) => {
    const str = JSON.stringify(err)
    sendStatusToWindow('Error in auto-updater. ' + str)
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = 'Download speed: ' + progressObj.bytesPerSecond
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
    sendStatusToWindow(log_message)
  })
  autoUpdater.on('update-downloaded', (info) => {
    log.info(info)
    sendStatusToWindow('Update downloaded')
  })
}

// 国际化
i18n.configure({
  locales: ['zh-CN'],
  directory: join(__dirname, '../locales')
})

const isSingleInstance = app.requestSingleInstanceLock()
const isMac = process.platform === 'darwin'

const template: MenuItemConstructorOptions[] = [
  { role: 'appMenu' },
  // ...(isMac ? [{
  //   label: app.name,
  //   submenu: [
  //     { role: 'about', label: '关于我们', accelerator: 'CmdOrCtrl+1' },
  //     { type: 'separator' },
  //     { role: 'services' },
  //     { type: 'separator' },
  //     { role: 'hide' },
  //     { role: 'hideOthers' },
  //     { role: 'unhide' },
  //     { type: 'separator' },
  //     { role: 'quit' }
  //   ]
  // }] as MenuItemConstructorOptions[] : []),
  { role: 'fileMenu' },
  { role: 'editMenu' },
  { role: 'viewMenu' },
  { role: 'windowMenu' },
  {
    role: 'help',
    submenu: [
      {
        label: '查看帮助',
        click: async () => {
          await shell.openExternal('https://front-end.toimc.com')
        }
      },
      {
        label: '检查更新',
        click: async () => {
          checkUpdate()
        }
      }
    ]
  }
]

const dockerMenu: MenuItemConstructorOptions[] = [
  {
    label: 'Docker',
    submenu: [
      {
        label: 'sub1',
        click: () => {
          console.log('from sub1')
        }
      },
      {
        label: 'sub2'
      }
    ]
  }
]

// 设置electron应用的菜单
const menu = Menu.buildFromTemplate(template)
const dockMenu = Menu.buildFromTemplate(dockerMenu)

Menu.setApplicationMenu(menu)

if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}

app.disableHardwareAcceleration()

// console.log(join(__dirname, './test.wav'))

// Install "Vue.js devtools"
if (import.meta.env.MODE === 'development') {
  app
    .whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, VUEJS3_DEVTOOLS }) =>
      installExtension(VUEJS3_DEVTOOLS, {
        loadExtensionOptions: {
          allowFileAccess: true
        }
      })
    )
    .then(() => {
      if (isMac) {
        // 加入dock菜单
        app.dock.setMenu(dockMenu)
      }
    })
    .catch((e) => console.error('Failed install extension:', e))
}

let mainWindow: BrowserWindow | null = null

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      preload: join(__dirname, '../../preload/dist/index.cjs'),
      webSecurity: false
    }
  })

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()

    if (import.meta.env.MODE === 'development') {
      mainWindow?.webContents.openDevTools()
    }
  })

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl =
    import.meta.env.MODE === 'development' && import.meta.env.VITE_DEV_SERVER_URL !== undefined
      ? import.meta.env.VITE_DEV_SERVER_URL
      : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString()

  // 1.做proxy -> 拦截请求 -> 取消请求
  mainWindow.webContents.session.webRequest.onBeforeRequest(
    {
      urls: ['https://open.toimc.com/*']
    },
    async (details, cb) => {
      // 2.获取该请求中的参数 -> 发起请求（token）-可选
      //                   -> 存储到本地的storage中

      const { url } = details
      const params = qs.parse(url.split('?')[1])
      console.log('🚀 ~ file: index.ts ~ line 142 ~ createWindow ~ params', params)
      try {
        const res = await axios.post('http://localhost:3000/login/wxOauth', params)
        // 由前端的页面发送获取用户信息的请求 -> 读取存储在本地storage中的参数信息
        if (res.status === 200) {
          const { code, data, token } = res.data
          if (code === 200) {
            // 主进程如何存储本地化的数据
            // 渲染进程如何获取主进程存储的本地化的数据
            store.set('userInfo', data)
            store.set('token', token)
            mainWindow?.webContents.send('reply-store', 'token', token)
            mainWindow?.webContents.send('reply-store', 'userInfo', data)
            const instance = new Notification({
              title: '登录成功',
              body: '登录时间' + dayjs('2021-10-01').format('YYYY-MM-DD hh:mm:ss'),
              silent: true // 设置系统通知声音为静音
            })
            instance.on('show', () => {
              sound.play(join(__dirname, './test.wav'))
            })
            instance.show()
          }
          // 回退到首页
          mainWindow?.webContents.goBack()
        }
      } catch (error) {
        console.log(error)
      }
      // 1.做proxy -> 拦截请求 -> 取消请求
      cb({ cancel: true })
    }
  )

  await mainWindow.loadURL(pageUrl)
}

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app
  .whenReady()
  .then(() => {
    createWindow()
    // showNotification()
    // 国际化
    // const locale = app.getLocale()
    i18n.setLocale('en')
    // i18n.setLocale(locale)
    console.log(i18n.__('paste'))
    // 注册全局的快捷键
    const ret = globalShortcut.register('CommandOrControl+Shift+1', () => {
      // console.log('pressed keys')
      // app.showAboutPanel()
      const win = BrowserWindow.getFocusedWindow()
      win?.setFullScreen(!win?.isFullScreen())
      // setTimeout(() => {
      //   // 禁止全屏 特别适合于桌面终端设备 -> 防止恶意操作
      //   win?.setFullScreenable(false)
      //   win?.setResizable(false)
      // },0)
    })
    // console.log('🚀 ~ file: index.ts ~ line 164 ~ ret ~ ret', ret)
    if (!ret) {
      console.log('registration failed')
    }
    // if (globalShortcut.isRegistered('CommandOrControl+Shift+1')) {
    //   console.log('register success')
    // }
  })
  .catch((e) => console.error('Failed create window:', e))

// Auto-updates
if (import.meta.env.PROD) {
  app
    .whenReady()
    // .then(() => import('electron-updater'))
    .then(() => {
      return checkUpdate(true)
      // autoUpdater.checkForUpdatesAndNotify()
    })
    .catch((e) => console.error('Failed check updates:', e))
}

ipcMain.on('show-context-menu', (event) => {
  console.log('🚀 ~ file: index.ts ~ line 172 ~ ipcMain.on ~ event', event)
  const win = BrowserWindow.fromWebContents(event.sender)
  if (win) {
    const clickMenu: MenuItemConstructorOptions[] = [
      {
        label: 'Docker',
        submenu: [
          {
            label: 'sub1',
            click: () => {
              event.sender.send('click-pop-menu', {
                event: 'sub1-clicked',
                data: 'hello'
              })
            }
          },
          {
            label: 'sub2'
          }
        ]
      }
    ]
    const popMenu = Menu.buildFromTemplate(clickMenu)
    popMenu.popup({ window: win })
  }
})

ipcMain.on('get-store', (event, key) => {
  event.sender.send('reply-store', key, store.get(key))
})

/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
ipcMain.on('reset-store', (event, key) => {
  store.clear()
})
