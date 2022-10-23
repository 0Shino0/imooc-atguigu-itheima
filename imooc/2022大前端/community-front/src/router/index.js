import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
import routes from './routers'

import Vue from 'vue'
import Router from 'vue-router'
import { instance } from '../utils/errorHandle'

Vue.use(Router)

const router = new Router(routes)

// 1. 基于角色的路由守卫
// 2. 组件级的权限控制 -> directive

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  // method 1
  // const payload = jwt.decode(token)
  // method 2
  const payload = jwt.decode(token)
  const refPayload = jwt.decode(refreshToken)
  if (refPayload && moment().isBefore(moment(refPayload.exp * 1000))) {
    if (token && moment().isBefore(moment(payload.exp * 1000))) {
      // 刷新页面的时候保存数据
      // 每次进入页面之前，就将localStorage的内容储存到vuex中，vuex的持久化
      store.commit('setToken', localStorage.getItem('token'))
    } else {
      // 使用await， 避免路由拦截先于请求响应成功
      instance.post('/login/refresh', null, {
        headers: {
          'Authorization': 'Bearer ' + refreshToken
        }
      }).then(res => {
        store.commit('setToken', res.data.token)
      })
    }
    store.commit('setIsLogin', true)
    store.commit('setUserInfo', userInfo)
    if (!store.state.ws) {
      store.commit('initWebSocket', {})
    }
  } else {
    // 用户要重新登录
    localStorage.clear()
    store.commit('setToken', '')
    store.commit('setUserInfo', {})
    store.commit('setIsLogin', false)
  }
  // to and from are Route Object,next() must be called to resolve the hook
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    // 需要用户登录的页面进行区别
    if (isLogin) {
      // 已经登录的状态
      // 权限判断，meta元数据
      next()
    } else {
      // 未登录的状态
      next('/login')
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
