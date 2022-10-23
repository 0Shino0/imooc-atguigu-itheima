import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index'
import moment from 'dayjs'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  ...routes
})

// 1. 基于角色的路由守卫
// 2. 组件级的权限控制 -> directive

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  if (token !== '' && token !== null) {
    // method 1
    // const payload = jwt.decode(token)
    // method 2
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 取localStorage里面缓存的token信息 + 用户信息
      // 8-24小时， refresh token 1个月
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
      if (!store.state.ws) {
        store.commit('initWebSocket', {})
      }
    } else {
      localStorage.clear()
    }
  }
  // to and from are Route Object,next() must be called to resolve the hook
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin: boolean = store.state.isLogin
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
