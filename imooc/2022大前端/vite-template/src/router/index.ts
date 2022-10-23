import About from '@/components/About.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/about',
      component: About
    },
  ],
})