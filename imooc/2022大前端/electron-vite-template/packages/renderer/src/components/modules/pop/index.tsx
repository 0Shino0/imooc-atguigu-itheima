import PopComponent from './Pop.vue'
import type { App } from 'vue'
import { createApp } from 'vue'

export const popup = (msg: string, type = '', delay = 2000) => {
  // 注册Pop组件
  const root = document.createElement('div')
  document.body.appendChild(root)

  // 添加实例方法，以供全局进行调用
  const options = {
    msg,
    type,
    delay
  }

  const popCom = createApp({
    setup() {
      const unmount = () => {
        popCom.unmount()
        document.body.removeChild(root)
      }
      const newOptions = Object.assign(options, { unmount })
      return () => <PopComponent {...newOptions} />
    }
  })

  popCom.mount(root)
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$pop = popup
  }
}
