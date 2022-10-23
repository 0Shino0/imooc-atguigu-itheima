import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Add from '@/components/Add.vue'
import Edit from '@/components/Edit.vue'
import Delete from '@/components/Delete.vue'
import Done from '@/components/Done.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '', redirect: { name: 'add' } },
      { path: '/add', name: 'add', component: Add },
      {
        path: '/edit',
        name: 'edit',
        component: Edit,
        beforeEnter: (to, from, next) => {
          if (from.path === '/add') {
            next()
          } else {
            next('/add')
          }
        }
      },
      { path: '/delete', name: 'delete', component: Delete },
      { path: '/done', name: 'done', component: Done }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active'
})

export default router
