import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
const modules = {}

// 动态加载vuex
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
  modules
})
