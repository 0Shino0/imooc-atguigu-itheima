import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
    sid: '',
    loaded: false
  },
  mutations: {
    //
    setSid(state, value) {
      state.sid = value
    },
    setLoaded(state, value) {
      state.loaded = value
    }
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
