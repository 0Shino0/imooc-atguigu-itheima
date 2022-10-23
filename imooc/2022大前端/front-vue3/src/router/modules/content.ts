import { RouteRecordRaw } from 'vue-router'
const Detail = () =>
  import(/* webpackChunkName: 'detail' */ '@/views/contents/Detail.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/detail/:tid',
    name: 'detail',
    props: true,
    component: Detail,
    meta: {
      // 通过后台接口动态添加到路由 addRoutes
      types: ['get', 'add', 'delete']
    }
  }
]

export default routes
