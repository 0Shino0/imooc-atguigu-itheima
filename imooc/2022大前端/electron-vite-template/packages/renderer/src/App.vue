<template>
  <imooc-header></imooc-header>
  <router-view />
  <imooc-footer></imooc-footer>
</template>

<script>
  import { defineComponent } from 'vue'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import store from '@/store'

  export default defineComponent({
    components: {
      'imooc-header': Header,
      'imooc-footer': Footer
    },
    // 测试Alert组件 window.vue.$alert('msg')
    mounted() {
      // window.vue = this
      const {
        ipcRenderer: { send, on }
      } = window.electron
      // 1.获取用户的右键事件
      window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        // 2.ipcRenderer send -> menu请求
        send('show-context-menu')
      })
      on('click-pop-menu', (event, args) => {
        console.log('🚀 ~ file: App.vue ~ line 30 ~ on ~ args', args)
        console.log('🚀 ~ file: App.vue ~ line 30 ~ on ~ event', event)
      })
      // 获取token
      // send('get-store', 'token')
      on('reply-store', (event, ...args) => {
        console.log('🚀 ~ file: App.vue ~ line 36 ~ mounted ~ args', args)
        console.log('🚀 ~ file: App.vue ~ line 36 ~ mounted ~ event', event)
        if (args && args.length > 0) {
          if (args[0] === 'token') {
            store.commit('setToken', args[1])
          }
          if (args[0] === 'userInfo') {
            store.commit('setUserInfo', args[1])
            store.commit('setIsLogin', true)
          }
        }
      })
      // 接收更新消息
      on('message', (event, ...args) => {
        console.log('🚀 ~ file: App.vue ~ line 45 ~ mounted ~ args', args)
        console.log('🚀 ~ file: App.vue ~ line 45 ~ mounted ~ event', event)
      })
    }
  })
</script>

<style lang="scss">
  @import 'assets/css/global.css';
  @import 'assets/css/layui-layer/layer.css';
  // @import "assets/css/utilities.scss";

  // 公用样式
  .svg {
    position: relative;
    // top: -4px;
    svg {
      position: absolute;
      top: -10px;

      height: 50px;
    }
  }
  .gray {
    color: #999;
  }

  .orange {
    color: #ff5722;
  }

  .pull-right {
    float: right !important;
  }

  // .pd20 {
  //   padding: 20px;
  // }

  @for $i from 0 to 5 {
    .pd#{$i} {
      padding: $i * 10 + px !important;
    }
    .pt#{$i} {
      padding-top: $i * 10 + px !important;
    }
    .pl#{$i} {
      padding-left: $i * 10 + px !important;
    }
    .pr#{$i} {
      padding-right: $i * 10 + px !important;
    }
    .pb#{$i} {
      padding-bottom: $i * 10 + px !important;
    }
    .mr#{$i} {
      margin-right: $i * 10 + px !important;
    }
    .mt#{$i} {
      margin-top: $i * 10 + px !important;
    }
    .ml#{$i} {
      margin-left: $i * 10 + px !important;
    }
  }

  .mt20 {
    margin-top: -20px;
  }

  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }

  .d-hide {
    position: absolute;
    overflow: hidden;
    height: 0;
  }

  .d-flex {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    &.flex-start {
      justify-content: flex-start;
    }
    &.flex-end {
      justify-content: flex-end;
    }
    &.flex-center {
      justify-content: center;
    }
  }

  .link {
    color: #01aaed;
  }
  .success {
    color: #5fb878;
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes bounceOut {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.05);
    }
    100% {
      opacity: 0;
      transform: scale(0.7);
    }
  }

  .fade-leave-active {
    animation: bounceOut 0.3s;
  }

  .fade-enter-active,
  .fade-enter-to {
    animation: bounceIn 0.3s;
  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 2000;
  }
</style>
