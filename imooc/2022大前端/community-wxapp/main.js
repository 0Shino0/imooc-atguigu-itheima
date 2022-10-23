import Vue from 'vue'
import App from './App'

import uView from 'uview-ui'
import httpUtils from '@/common/plugins/http-uview'
import interceptors from '@/common/interceptors'
import apis from '@/api'
import filters from '@/common/filter'
import store from '@/store'

Vue.use(uView)
Vue.use(httpUtils)
Vue.use(interceptors)
Vue.use(apis)

Vue.prototype.$store = store

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})

app.$mount()
