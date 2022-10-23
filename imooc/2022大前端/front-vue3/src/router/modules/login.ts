import { RouteRecordRaw } from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */ '@/views/login/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/login/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '@/views/login/Forget.vue')
const Confirm = () => import(/* webpackChunkName: 'confirm' */ '@/views/login/Confirm.vue')
const Reset = () => import(/* webpackChunkName: 'reset' */ '@/views/login/Reset.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm
  },
  {
    path: '/reset',
    name: 'reset',
    component: Reset
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
  }
]

export default routes
