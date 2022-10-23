import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from '@/plugins/filter'
import directives from '@/plugins/directives'

import '@/plugins/veevalidate'

// common css
import 'normalize.css/normalize.css'
import '@/assets/styles/theme.scss'

// 引用mint-ui组件
import '@/plugins/mint-ui'
import '@/plugins/common'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

console.log('toimc')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
