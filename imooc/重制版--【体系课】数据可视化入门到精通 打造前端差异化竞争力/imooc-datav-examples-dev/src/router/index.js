import Vue from 'vue'
import VueRouter from 'vue-router'
import BMap from '../views/BMap.vue'
import BMapFly from '../views/BMapFly.vue'
import BMapShape from '../views/BMapShape.vue'
import BMapCoolFly from '../views/BMapCoolFly.vue'
import BMapECharts from '../views/BMapECharts.vue'
import Liquidfill from '../views/Liquidfill.vue'
import WordCloud from '../views/WordCloud.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BMap',
    component: BMap
  }, {
    path: '/bmap-fly',
    name: 'BMapFly',
    component: BMapFly
  }, {
    path: '/bmap-shape',
    name: 'BMapShape',
    component: BMapShape
  }, {
    path: '/bmap-cool-fly',
    name: 'BMapCoolFly',
    component: BMapCoolFly
  }, {
    path: '/bmap-echarts',
    name: 'BMapECharts',
    component: BMapECharts
  }, {
    path: '/liquidfill',
    name: 'Liquidfill',
    component: Liquidfill
  }, {
    path: '/wordcloud',
    name: 'WordCloud',
    component: WordCloud
  }
]

const router = new VueRouter({
  routes
})

export default router
