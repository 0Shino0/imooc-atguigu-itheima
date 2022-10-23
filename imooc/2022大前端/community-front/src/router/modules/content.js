const Add = () =>
  import(/* webpackChunkName: 'add' */ '@/components/contents/Add.vue')
const Edit = () =>
  import(/* webpackChunkName: 'edit' */ '@/components/contents/Edit.vue')
const Detail = () =>
  import(/* webpackChunkName: 'detail' */ '@/components/contents/Detail.vue')

export default [
  {
    path: '/add',
    name: 'add',
    component: Add,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:tid',
    props: true,
    name: 'edit',
    component: Edit,
    meta: { requiresAuth: true },
    beforeEnter (to, from, next) {
      // 正常的情况 detail
      if (
        ['detail', 'mypost'].indexOf(from.name) !== -1 &&
        to.params.page &&
        to.params.page.isEnd === '0'
      ) {
        next()
      } else {
        // 用户在edit页面刷新的情况
        const editData = localStorage.getItem('editData')
        if (editData && editData !== '') {
          const editObj = JSON.parse(editData)
          if (editObj.isEnd === '0') {
            next()
          } else {
            next('/')
          }
        } else {
          next('/')
        }
      }
    }
  },
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
