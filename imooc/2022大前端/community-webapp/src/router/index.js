import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import moment from 'dayjs'
import {
  SET_USER,
  SET_ISLOGIN,
  SET_TOKEN,
  INIT_WEBSOCKET
} from '@/store/mutation-types'
import { MessageBox } from 'mint-ui'

const Home = () => import(/* webpackChunkName: 'home' */ '@/views/home')
const Catalog = () =>
  import(/* webpackChunkName: 'catalog' */ '@/views/home/catalog.vue')

const Detail = () => import(/* webpackChunkName: 'detail' */ '@/views/detail')

// 注册登录&找回密码
const Login = () => import(/* webpackChunkName: 'login' */ '@/views/user/login')
const Reg = () => import(/* webpackChunkName: 'reg' */ '@/views/user/reg')
const Forget = () =>
  import(/* webpackChunkName: 'forget' */ '@/views/user/forget')

const User = () => import(/* webpackChunkName: 'forget' */ '@/views/user/user')
const Hot = () => import(/* webpackChunkName: 'hot' */ '@/views/hot')
const Msg = () => import(/* webpackChunkName: 'msg' */ '@/views/msg')
// 修改密码
const Passwd = () =>
  import(/* webpackChunkName: 'passwd' */ '@/views/user/passwd')
// 修改个人设置
const Settings = () =>
  import(/* webpackChunkName: 'settings' */ '@/views/user/settings')
// 我的帖子
const MyPost = () =>
  import(/* webpackChunkName: 'mypost' */ '@/views/user/mypost')
// 新增帖子
const NewPost = () => import(/* webpackChunkName: 'newpost' */ '@/views/newpost')
// 我的收藏
const MyFav = () => import(/* webpackChunkName: 'myfav' */ '@/views/user/myfav')
// 浏览历史
const MyHistory = () => import(/* webpackChunkName: 'myhisory' */ '@/views/user/myhistory')
// 我的签到
const Sign = () => import(/* webpackChunkName: 'sign' */ '@/views/user/sign')
// 我的主页
const Center = () =>
  import(/* webpackChunkName: 'center' */ '@/views/user/center')
// 热门相关
const HotPost = () =>
  import(/* webpackChunkName: 'hotpost' */ '@/views/hot/post')
const HotComments = () =>
  import(/* webpackChunkName: 'hotcomments' */ '@/views/hot/comments')
const HotSign = () =>
  import(/* webpackChunkName: 'hotsign' */ '@/views/hot/sign')

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '',
    component: Home,
    name: 'home',
    // 修复默认路由
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Catalog
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Catalog,
        props: true
      }
    ]
  },
  // 详情页
  {
    path: '/detail/:tid',
    name: 'detail',
    props: true,
    component: Detail
  },
  // 注册登录
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget
    // meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  // 修改设置
  {
    path: '/passwd',
    name: 'passwd',
    component: Passwd,
    meta: { requiresAuth: true }
  },
  // 修改设置
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  // 我的帖子
  {
    path: '/mypost',
    name: 'mypost',
    component: MyPost,
    meta: { requiresAuth: true }
  },
  // 新增帖子
  {
    path: '/newpost',
    name: 'newpost',
    component: NewPost,
    meta: { requiresAuth: true }
  },
  // 我的收藏
  {
    path: '/myfav',
    name: 'myfav',
    component: MyFav,
    meta: { requiresAuth: true }
  },
  // 我的历史
  {
    path: '/myhistory',
    name: 'myhistory',
    component: MyHistory,
    meta: { requiresAuth: true }
  },
  // 签到中心
  {
    path: '/sign',
    name: 'sign',
    component: Sign,
    meta: { requiresAuth: true }
  },
  // 个人主页
  {
    path: '/center',
    name: 'center',
    component: Center,
    meta: { requiresAuth: true }
  },
  {
    path: '/hot',
    name: 'hot',
    component: Hot,
    props: true,
    // 修复默认路由
    redirect: '/hot/post',
    children: [
      {
        path: 'post',
        name: 'index',
        component: HotPost
      },
      {
        path: 'comments',
        name: 'catalog',
        component: HotComments
      },
      {
        path: 'sign',
        name: 'catalog',
        component: HotSign
      }
    ]
  },
  {
    path: '/msg/:type',
    name: 'msg',
    component: Msg,
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active'
})

// 1. 基于角色的路由守卫
// 2. 组件级的权限控制 -> directive

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    // method 1
    // const payload = jwt.decode(token)
    // method 2
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // 取localStorage里面缓存的token信息 + 用户信息
      // 8-24小时， refresh token 1个月
      store.commit('user/' + SET_TOKEN, token)
      store.commit('user/' + SET_USER, userInfo)
      store.commit('user/' + SET_ISLOGIN, true)
      if (!store.state.ws) {
        store.commit(INIT_WEBSOCKET, {})
      }
    } else {
      localStorage.clear()
    }
  }
  // to and from are Route Object,next() must be called to resolve the hook
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isLogin = store.state.user.isLogin
    // 需要用户登录的页面进行区别
    if (isLogin) {
      // 已经登录的状态
      // 权限判断，meta元数据
      next()
    } else {
      // 未登录的状态
      // next('/login')
      MessageBox.confirm('您还未登录，需要登录吗？')
        .then((action) => {
          next('/login')
        })
        .catch((cancel) => {})
    }
  } else {
    // 公共页面，不需要用户登录
    next()
  }
})

export default router
