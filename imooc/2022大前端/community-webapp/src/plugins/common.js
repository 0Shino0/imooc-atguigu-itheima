import Vue from 'vue'
// import Header from '@/components/Header'
// Vue.component('my-header', Header)

const componentsContext = require.context('@/components', true, /.vue$/)

componentsContext.keys().forEach((component) => {
  const componentConfig = componentsContext(component).default
  Vue.component(componentConfig.name, componentConfig)
})
