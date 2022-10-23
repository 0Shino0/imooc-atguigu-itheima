import AlertComponent from './Alert.vue'

const Alert = {}

Alert.install = (Vue) => {
  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement('div'))

  // 4. 添加实例方法
  Vue.prototype.$alert = (msg) => {
    document.body.appendChild(instance.$el)
    // 逻辑...
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
    instance.instance = instance
  }

  Vue.prototype.$confirm = (msg, success, cancel) => {
    document.body.appendChild(instance.$el)
    // 逻辑...
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    instance.instance = instance
    if (typeof success !== 'undefined') {
      instance.success = success
    }
    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    }
  }
}

export default Alert
