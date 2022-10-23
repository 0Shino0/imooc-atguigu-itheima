const Center = () => import(/* webpackChunkName: 'center' */ '@/views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '@/components/user/Center.vue')
const Settings = () => import(/* webpackChunkName: 'settings' */ '@/components/user/Settings.vue')
const Posts = () => import(/* webpackChunkName: 'user-post' */ '@/components/user/Posts.vue')
const Msg = () => import(/* webpackChunkName: 'user-msg' */ '@/components/user/Msg.vue')
const Others = () => import(/* webpackChunkName: 'othres' */ '@/components/user/Others.vue')
const MyInfo = () => import(/* webpackChunkName: 'info' */ '@/components/user/common/MyInfo.vue')
const PicUpload = () => import(/* webpackChunkName: 'uploadpic' */ '@/components/user/common/PicUpload.vue')
const Passwd = () => import(/* webpackChunkName: 'password' */ '@/components/user/common/Passwd.vue')
const Accounts = () => import(/* webpackChunkName: 'accounts' */ '@/components/user/common/Accounts.vue')
const MyPost = () => import(/* webpackChunkName: 'mypost' */ '@/components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'mycollection' */ '@/components/user/common/MyCollection.vue')
const User = () => import(/* webpackChunkName: 'home' */ '@/views/User.vue')

export default [
  {
    path: '/center',
    component: Center,
    meta: { requiresAuth: true },
    linkActiveClass: 'layui-this',
    children: [
      {
        path: '',
        name: 'center',
        component: UserCenter
      },
      {
        path: 'set',
        component: Settings,
        children: [
          {
            path: '',
            name: 'info',
            component: MyInfo
          },
          {
            path: 'pic',
            name: 'pic',
            component: PicUpload
          },
          {
            path: 'passwd',
            name: 'passwd',
            component: Passwd
          },
          {
            path: 'account',
            name: 'account',
            component: Accounts
          }
        ]
      },
      {
        path: 'posts',
        component: Posts,
        children: [
          {
            path: '',
            name: 'mypost',
            component: MyPost
          },
          {
            path: 'mycollection',
            name: 'mycollection',
            component: MyCollection
          }
        ]
      },
      {
        path: 'msg',
        name: 'msg',
        component: Msg
      },
      {
        path: 'others',
        name: 'others',
        component: Others
      }
    ]
  },
  {
    path: '/user/:uid',
    name: 'home',
    props: true,
    component: User
  }
]
