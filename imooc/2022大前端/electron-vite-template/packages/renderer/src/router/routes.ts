import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

import login from './modules/login'
import contents from './modules/content'

const Index = () => import(/* webpackChunkName: 'index' */ '@/views/channels/index.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */ '@/views/channels/Template1.vue')
const NoFound = () => import(/* webpackChunkName: 'notfound' */ '@/views/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'home',
        redirect: { name: 'index' }
      },
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: Template1
      }
    ]
  },
  ...login,
  ...contents,
  {
    path: '/404',
    name: '404',
    component: NoFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

export default {
  linkExactActiveClass: 'layui-this',
  routes
}
