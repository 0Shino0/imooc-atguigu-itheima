import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV === 'development'
// console.log('🚀 ~ file: index.js ~ line 5 ~ debug', debug)

Vue.use(Vuex)

const state = {
  token: uni.getStorageSync('token') || '',
  refreshToken: uni.getStorageSync('refreshToken') || '',
  userInfo: uni.getStorageSync('userInfo') || {},
  type: 'comment',
  tab: ''
}

const mutations = {
  setToken (state, value) {
    state.token = value
    // token的持久化
    uni.setStorageSync('token', value)
  },
  setRefreshToken (state, value) {
    state.refreshToken = value
    // token的持久化
    uni.setStorageSync('refreshToken', value)
  },
  setUserInfo (state, value) {
    if (value === '') return
    state.userInfo = value
    // token的持久化
    uni.setStorageSync('userInfo', value)
  },
  setType (state, value) {
    state.type = value || 'comment'
  },
  setTab (state, value) {
    state.tab = value || ''
  }
}

const actions = {
  logout ({ commit }) {
    commit('setToken', '')
    commit('setUserInfo', {})
    commit('setRefreshToken', '')
    uni.clearStorage()
  }
}

const getters = {
  isLogin: (state) => typeof state.userInfo._id !== 'undefined'
}

const plugins = debug ? [createLogger()] : []

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins
})

export default store
