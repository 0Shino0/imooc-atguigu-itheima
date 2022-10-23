const req = require.context('./modules', false, /\.js$/)

const install = (Vue) => {
  let api = Vue.prototype.$u.api || {}
  req.keys().forEach(item => {
    const module = req(item)
    // 1.取得所有的方法 -> key值,
    const keys = Object.keys(module)
    keys.forEach(key => {
      api = {
        ...api,
        // 2.取得所有方法对应的function -> value值
        // 3.把上面的对象 -> $u.api
        [key]: module[key]
      }
    })
    // 4.把它封装成为一个插件，以便在后面的方法中使用 this.$u.api.方法名(参数).then(res) ....
  })
  Vue.prototype.$u.api = api
}

export default {
  install
}
