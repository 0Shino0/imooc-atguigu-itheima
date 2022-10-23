import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import filters from '@/utils/filter'
import directives from '@/utils/directives'

import '@/utils/veevalidate'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'

Vue.use(Alert)
Vue.use(Pop)

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
