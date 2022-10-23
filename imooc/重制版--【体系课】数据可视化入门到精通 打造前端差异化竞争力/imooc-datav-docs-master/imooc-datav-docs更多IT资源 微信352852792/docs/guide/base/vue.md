# Vue 进阶

## $emit 和 $on

```html
<!------------------------------------------------------------
  文件名:   ch3-1.html
  第三章:   $emit 和 $on 用法
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>$emit 和 $on</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <button @click="boost">触发事件</button>
    </div>
    <script>
      new Vue({
        el: '#root',
        data() {
          return {
            message: 'hello vue'
          }
        },
        created() {
          this.$on('my_events', this.handleEvents)
        },
        methods: {
          handleEvents(e) {
            console.log(this.message, e)
          },
          boost() {
            this.$emit('my_events', 'my params')            
          }
        }
      })
    </script>
  </body>
</html>
``` 

## directive 用法

::: tip
官方文档：[https://cn.vuejs.org/v2/api/#Vue-directive](https://cn.vuejs.org/v2/api/#Vue-directive)
:::

```html
<!------------------------------------------------------------
  文件名:   ch3-2.html
  第三章:   directive 用法
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>directive 用法</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <div v-loading="isLoading">{{data}}</div>
      <button @click="update">更新</button>
    </div>
    <script>
      Vue.directive('loading', {
        update(el, binding, vnode) {
          if (binding.value) {
            const div = document.createElement('div')
            div.innerText = '加载中...'
            div.setAttribute('id', 'loading')
            div.style.position = 'absolute'
            div.style.left = 0
            div.style.top = 0
            div.style.width = '100%'
            div.style.height = '100%'
            div.style.display = 'flex'
            div.style.justifyContent = 'center'
            div.style.alignItems = 'center'
            div.style.color = 'white'
            div.style.background = 'rgba(0, 0, 0, .7)'
            document.body.append(div)
          } else {
            document.body.removeChild(document.getElementById('loading'))
          }
        }
      })
      new Vue({
        el: '#root',
        data() {
          return {
            isLoading: false,
            data: ''
          }
        },
        methods: {
          update() {
            this.isLoading = true
            setTimeout(() => {
              this.data = '用户数据'
              this.isLoading = false
            }, 3000)
          }
        }
      })
    </script>
  </body>
</html>
```

## Vue.component 用法
```html
<!------------------------------------------------------------
  文件名:   ch3-3.html
  第三章:   Vue.component 用法
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>Vue.component 用法</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <Test :msg="message"></Test>
    </div>
    <script>
      Vue.component('Test', {
        template: '<div>{{msg}}</div>',
        props: {
          msg: {
            type: String,
            default: 'default message'
          }
        }
      })
      new Vue({
        el: '#root',
        data() {
          return {
            message: "Test Component"
          }
        }
      })
    </script>
  </body>
</html>
```

## Vue.extend 用法
```html
<!------------------------------------------------------------
  文件名:   ch3-4.html
  第三章:   Vue.extend 用法
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>Vue.extend 用法</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <Test :msg="message"></Test>
    </div>
    <script>
      const component = Vue.extend({
        template: '<div>{{msg}}</div>',
        props: {
          msg: {
            type: String,
            default: 'default message'
          }
        },
        name: 'Test'
      })
      Vue.component('Test')
      new Vue({
        el: '#root',
        data() {
          return {
            message: "Test Extend Component"
          }
        }
      })
    </script>
  </body>
</html>
```

## Vue.extend 进阶用法
```html
<!------------------------------------------------------------
  文件名:   ch3-4.html
  第三章:   Vue.extend 用法2
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>Vue.extend 用法2</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
      #loading-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);
        color: #fff;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <button @click="showLoading">显示Loading</button>
    </div>
    <script>
      function Loading(msg) {
        const LoadingComponent = Vue.extend({
          template: '<div id="loading-wrapper">{{msg}}</div>',
          props: {
            msg: {
              type: String,
              default: msg
            }
          },
          name: 'LoadingComponent'
        })
        const div = document.createElement('div')
        div.setAttribute('id', 'loading-wrapper')
        document.body.append(div)
        new LoadingComponent().$mount('#loading-wrapper')
        return () => {
          document.body.removeChild(document.getElementById('loading-wrapper'))
        }
      }
      Vue.prototype.$loading = Loading
      new Vue({
        el: '#root',
        methods: {
          showLoading() {
            const hide = this.$loading('正在加载，请稍等...')
            setTimeout(() => {
              hide()
            }, 2000)
          }
        }
      })
    </script>
  </body>
</html>
```

## Vue.use 用法
```html
<!------------------------------------------------------------
  文件名:   ch3-6.html
  第三章:   Vue.use 用法
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>Vue.use 用法</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <style>
      #loading-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);
        color: #fff;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <button @click="showLoading">显示Loading</button>
    </div>
    <script>
      const loadingPlugin = {
        install: function(vm) {
          const LoadingComponent = vm.extend({
            template: '<div id="loading-wrapper">{{msg}}</div>',
            props: {
              msg: {
                type: String,
                default: 'loading...'
              }
            }
          }, 'LoadingComponent')
          function Loading(msg) {
            const div = document.createElement('div')
            div.setAttribute('id', 'loading-wrapper')
            document.body.append(div)
            new LoadingComponent({
              props: {
                msg: {
                  type: String,
                  default: msg
                }
              } 
            }).$mount('#loading-wrapper')
            return () => {
              document.body.removeChild(document.getElementById('loading-wrapper'))
            }
          }
          vm.prototype.$loading = Loading
        }
      }
      Vue.use(loadingPlugin)
      new Vue({
        el: '#root',
        methods: {
          showLoading() {
            const hide = this.$loading('正在加载，请稍等...')
            setTimeout(() => {
              hide()
            }, 2000)
          }
        }
      })
    </script>
  </body>
</html>
```

## 组件通信 provide 和 inject
```html
<!------------------------------------------------------------
  文件名:   ch4-1.html
  第三章:   组件通信 provide 和 inject
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>组件通信 provide 和 inject</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <Test></Test>
    </div>
    <script>
      function registerPlugin() {
        Vue.component('Test', {
          template: '<div>{{message}}<Test2 /></div>',
          provide() {
            return {
              elTest: this
            }
          }, // function 的用途是为了获取运行时环境，否则 this 将指向 window
          data() {
            return {
              message: 'message from Test'
            }
          },
          methods: {
            change(component) {
              this.message = 'message from ' + component
            }
          }
        })
        Vue.component('Test2', {
          template: '<Test3 />'
        })
        Vue.component('Test3', {
          template: '<button @click="changeMessage">change</button>',
          inject: ['elTest'],
          methods: {
            changeMessage() {
              this.elTest.change(this.$options._componentTag)
            }
          }
        })
      }
      Vue.use(registerPlugin)
      new Vue({
        el: '#root'
      })
    </script>
  </body>
</html>
```

## 过滤器 filter
```html
<!------------------------------------------------------------
  文件名:   ch4-2.html
  第三章:   过滤器 filter
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>过滤器 filter</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      {{message | lower}}
    </div>
    <script>
      new Vue({
        el: '#root',
        filters: {
          lower(value) {
            return value.toLowerCase()
          }
        },
        data() {
          return {
            message: 'Hello Vue'
          }
        }
      })
    </script>
  </body>
</html>
```

## 监听器 watch

```html
<!------------------------------------------------------------
  文件名:   ch4-3.html
  第三章:   监听器 watch
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>监听器 watch</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <h3>Watch 用法1：常见用法</h3>
      <input v-model="message">
      <span>{{copyMessage}}</span>
    </div>
    <div id="root2">
      <h3>Watch 用法2：绑定方法</h3>
      <input v-model="message">
      <span>{{copyMessage}}</span>
    </div>
    <div id="root3">
      <h3>Watch 用法3：deep + handler</h3>
      <input v-model="deepMessage.a.b">
      <span>{{copyMessage}}</span>
    </div>
    <div id="root4">
      <h3>Watch 用法4：immediate</h3>
      <input v-model="message">
      <span>{{copyMessage}}</span>
    </div>
    <div id="root5">
      <h3>Watch 用法5：绑定多个 handler</h3>
      <input v-model="message">
      <span>{{copyMessage}}</span>
    </div>
    <div id="root6">
      <h3>Watch 用法6：监听对象属性</h3>
      <input v-model="deepMessage.a.b">
      <span>{{copyMessage}}</span>
    </div>
      
    <script>
      new Vue({
        el: '#root',
        watch: {
          message(value) {
            this.copyMessage = value
          }
        },
        data() {
          return {
            message: 'Hello Vue',
            copyMessage: ''
          }
        }
      })
      new Vue({
        el: '#root2',
        watch: {
          message: 'handleMessage'
        },
        data() {
          return {
            message: 'Hello Vue',
            copyMessage: ''
          }
        },
        methods: {
          handleMessage(value) {
            this.copyMessage = value
          }
        }
      })
      new Vue({
        el: '#root3',
        watch: {
          deepMessage: {
            handler: 'handleDeepMessage',
            deep: true
          }
        },
        data() {
          return {
            deepMessage: {
              a: {
                b: 'Deep Message'
              }
            },
            copyMessage: ''
          }
        },
        methods: {
          handleDeepMessage(value) {
            this.copyMessage = value.a.b
          }
        }
      })
      new Vue({
        el: '#root4',
        watch: {
          message: {
            handler: 'handleMessage',
            immediate: true,
          }
        },
        data() {
          return {
            message: 'Hello Vue',
            copyMessage: ''
          }
        },
        methods: {
          handleMessage(value) {
            this.copyMessage = value
          }
        }
      }),
      new Vue({
        el: '#root5',
        watch: {
          message: [{
            handler: 'handleMessage',
          },
          'handleMessage2',
          function(value) {
            this.copyMessage = this.copyMessage + '...'
          }]
        },
        data() {
          return {
            message: 'Hello Vue',
            copyMessage: ''
          }
        },
        methods: {
          handleMessage(value) {
            this.copyMessage = value
          },
          handleMessage2(value) {
            this.copyMessage = this.copyMessage + '*'
          }
        }
      })
      new Vue({
        el: '#root6',
        watch: {
          'deepMessage.a.b': 'handleMessage'
        },
        data() {
          return {
            deepMessage: { a: { b: 'Hello Vue' } },
            copyMessage: ''
          }
        },
        methods: {
          handleMessage(value) {
            this.copyMessage = value
          }
        }
      })
    </script>
  </body>
</html>
```

## class 和 style 绑定的高级用法

```html
<!------------------------------------------------------------
  文件名:   ch4-4.html
  第三章:   class 和 style 绑定的高级用法
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>class 和 style 绑定的高级用法</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <div :class="['active', 'normal']">数组绑定多个class</div>
      <div :class="[{active: isActive}, 'normal']">数组包含对象绑定class</div>
      <div :class="[showWarning(), 'normal']">数组包含方法绑定class</div>
      <div :style="[warning, bold]">数组绑定多个style</div>
      <div :style="[warning, mix()]">数组包含方法绑定style</div>
      <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">style多重值</div>
    </div>
    <script>
      new Vue({
        el: '#root',
        data() {
          return {
            isActive: true,
            warning: {
              color: 'orange'
            },
            bold: {
              fontWeight: 'bold'
            }
          }
        },
        methods: {
          showWarning() {
            return 'warning'
          },
          mix() {
            return {
              ...this.bold,
              fontSize: 20
            }
          }
        }
      })
    </script>
  </body>
</html>
```

## Vue2.6 新特性

### Vue.observable

```html
<!------------------------------------------------------------
  文件名:   ch4-5.html
  第三章:   Vue.observable
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>Vue.observable</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      {{message}}
      <button @click="change">Change</button>
    </div>
    <script>
      const state = Vue.observable({ message: 'Vue 2.6' })
      const mutation = {
        setMessage(value) {
          state.message = value
        }
      }
      new Vue({
        el: '#root',
        computed: {
          message() {
            return state.message
          }
        },
        methods: {
          change() {
            mutation.setMessage('Vue 3.0')
          }
        }
      })
    </script>
  </body>
</html>
```

### 插槽 slot

```html
<!------------------------------------------------------------
  文件名:   ch4-6.html
  第三章:   插槽 slot
  开发平台: VSCode 1.39.1
  Vue 实战小慕读书中后台 By Sam
------------------------------------------------------------->
<html>
  <head>
    <title>插槽 slot</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <div>案例1：slot的基本用法</div>
      <Test>
        <template v-slot:header="{user}">
          <div>自定义header({{user.a}})</div>
        </template>
        <template v-slot="{user}">
          <div>自定义body({{user.b}})</div>
        </template>
      </Test>
    </div>
    <div id="root2">
      <div>案例2：Vue2.6新特性 - 动态slot</div>
      <Test>
        <template v-slot:[section]="{section}">
          <div>this is {{section}}</div>
        </template>
      </Test>
      <button @click="change">switch header and body</button>
    </div>
    <script>
      Vue.component('Test', {
        template: 
          '<div>' +
            '<slot name="header" :user="obj" :section="\'header\'">' +
              '<div>默认header</div>' +
            '</slot>' +
            '<slot :user="obj" :section="\'body\'">默认body</slot>' +
          '</div>',
        data() {
          return {
            obj: { a: 1, b: 2 }
          }
        }
      })
      new Vue({ el: '#root' })
      new Vue({ 
        el: '#root2',
        data() {
          return {
            section: 'header'
          }
        },
        methods: {
          change() {
            this.section === 'header' ?
              this.section = 'default' :
              this.section = 'header'
          }
        }
      })
    </script>
  </body>
</html>
```
