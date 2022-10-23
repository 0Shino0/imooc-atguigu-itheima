const Login = () => import(/* webpackChunkName: 'login' */ '@/views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '@/views/Forget.vue')
const Confirm = () => import(/* webpackChunkName: 'confirm' */ '@/views/Confirm.vue')
const Reset = () => import(/* webpackChunkName: 'reset' */ '@/views/Reset.vue')

export default [
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
