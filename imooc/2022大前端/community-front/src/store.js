import Vue from 'vue'
import Vuex from 'vuex'
import WebSocketClient from '@/utils/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    isHide: false,
    ws: null,
    num: 0
  },
  mutations: {
    initWebSocket (state, config) {
      state.ws = new WebSocketClient(config)
      state.ws.init()
    },
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    // 设置用户的基本信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      // 本地存储用户的基本信
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // 设置isLogin的状态
    setIsLogin (state, value) {
      state.isLogin = value
    },
    // 设置container的状态
    setHide (state, value) {
      state.isHide = value
    },
    setMessage (state, value) {
      state.num = value
    }
  },
  getters: {
    uid: (state) => state.userInfo ? state.userInfo._id : ''
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    }
  }
})
