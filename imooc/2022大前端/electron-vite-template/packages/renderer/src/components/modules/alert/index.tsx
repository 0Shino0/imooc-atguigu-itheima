import type { App } from 'vue'
import { createApp } from 'vue'
import AlertComponent from './Alert.vue'

export const alert = (msg: string) => {
  const root = document.createElement('div')
  document.body.appendChild(root)

  const options = {
    type: 'alert',
    msg
  }

  const alertCom = createApp(AlertComponent, {
    ...options,
    unmount() {
      alertCom.unmount()
      document.body.removeChild(root)
    }
  })

  alertCom.mount(root)
}

export const confirm = (msg: string, success: Function, cancel: Function) => {
  // 1. 添加alert 根点
  const root = document.createElement('div')
  document.body.appendChild(root)
  // 2. 添加Alert组件 -> props

  const options = {
    type: 'confirm',
    msg,
    success,
    cancel
  }

  const alertCom = createApp(AlertComponent, {
    ...options,
    unmount() {
      alertCom.unmount()
      document.body.removeChild(root)
    }
  })

  alertCom.mount(root)
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$alert = alert

    app.config.globalProperties.$confirm = confirm
  }
}
