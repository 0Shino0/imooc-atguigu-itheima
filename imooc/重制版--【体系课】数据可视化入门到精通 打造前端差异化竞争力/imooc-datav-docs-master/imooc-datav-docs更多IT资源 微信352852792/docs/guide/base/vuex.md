# Vuex 和 Vue-router 进阶

## Vuex 原理解析

:::tip
[查看](https://github.com/vuejs/vuex) vuex 源码
:::

Vuex 的原理关键：使用 Vue 实例管理状态

```html
<!------------------------------------------------------------
  文件名:   ch5-1.html
  章节名:   vuex 原理解析
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>vuex 原理解析</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">{{data}}</div>
    <div id="root2">{{data2}}</div>
    <div id="root3">
      <button @click="change">change</button>
    </div>
    <script>
      function registerPlugin(Vue) {
        const vuex = {}
        vuex._vm = new Vue({
          data: {
            message: 'hello vue.js'
          }
        })
        vuex.state = vuex._vm
        vuex.mutations = {
          setMessage(value) {
            vuex.state.message = value
          }
        }
        function init() {
          this.$store = vuex
        }
        Vue.mixin({
          beforeCreate: init
        })
      }
      Vue.use(registerPlugin)
      new Vue({
        el: '#root',
        computed: {
          data() {
            return this.$store.state.message
          }
        }
      })
      new Vue({
        el: '#root2',
        computed: {
          data2() {
            return this.$store.state.message
          }
        }
      })
      new Vue({
        el: '#root3',
        methods: {
          change() {
            const newValue = this.$store.state.message + '.'
            this.$store.mutations.setMessage(newValue)
          }
        }
      })
    </script>
  </body>
</html>
``` 

## vue-router 实现原理
:::tip
[查看](https://github.com/vuejs/vue-router) vue-router 源码
:::

vue-router 实例化时会初始化 this.history，不同 mode 对应不同的 history

```js
constructor (options: RouterOptions = {}) {
    this.mode = mode
    
    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
}
```

这里以 HashHistory 为例，vue-router 的 push 方法实现如下：

```js
push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        this.history.push(location, resolve, reject)
      })
    } else {
      this.history.push(location, onComplete, onAbort)
    }
}
```

HashHistory 具体实现了 push 方法：

```js
function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path))
  } else {
    window.location.hash = path
  }
}
```

对路由的监听通过 hash 相应的事件监听实现：

```js
window.addEventListener(
  supportsPushState ? 'popstate' : 'hashchange',
  () => {
    const current = this.current
    if (!ensureSlash()) {
      return
    }
    this.transitionTo(getHash(), route => {
      if (supportsScroll) {
        handleScroll(this.router, route, current, true)
      }
      if (!supportsPushState) {
        replaceHash(route.fullPath)
      }
    })
  }
)
```

除此之外，vue-router 还提供了两个组件：

```js
Vue.component('RouterView', View)
Vue.component('RouterLink', Link)
```

## vue-router 路由守卫

创建 router.js：
```js
import Vue from 'vue'
import Route from 'vue-router'
import HelloWorld from './components/HelloWorld'

Vue.use(Route)
const routes = [
  { path: '/hello-world', component: HelloWorld }
]
const router = new Route({
  routes
})

export default router
```

在 main.js 中引用 router，并加入 vue 实例：

```js
import router from './router'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
```

### 全局守卫

```js
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve', to, from)
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach', to, from)
})
```

### 局部守卫

```js
beforeRouteEnter (to, from, next) {
  // 不能获取组件实例 `this`
  console.log('beforeRouteEnter', to, from)
  next()
},
beforeRouteUpdate (to, from, next) {
  console.log('beforeRouteUpdate', to, from)
  next()
},
beforeRouteLeave (to, from, next) {
  console.log('beforeRouteLeave', to, from)
  next()
}
```

### 路由元信息

通过 meta 定义路由元信息
```js
const routes = [
  { path: '/a', component: A, meta: { title: 'Custom Title A' } }
]
```

使用 meta 信息动态修改标题

```js
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'default title'
  }
  next()
})
```

### 路由 API

使用 router.addRoutes 动态添加路由
```js
addRoute() {
    this.$router.addRoutes([{
      path: '/b', component: B, meta: { title: 'Custom Title B' },
    }])
}
```

此时可以访问到 B 组件

```html
<router-link to='/b'>to B</router-link>
```
