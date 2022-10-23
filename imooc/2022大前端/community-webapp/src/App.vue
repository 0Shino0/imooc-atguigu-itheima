
<template>
  <div id="app">
    <transition :name="direction">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { forbidScroll } from '@/utils/forbidScroll'
export default {
  name: 'app',
  data () {
    return {
      direction: ''
    }
  },
  mounted () {
    // const _this = this
    window.forbidScroll = forbidScroll
    // window.addEventListener(
    //   'onorientationchange' in window ? 'orientationchange' : 'resize',
    //   function () {
    //     // if (window.orientation === 180 || window.orientation === 0) {
    //     //   alert('竖屏状态！')
    //     // }
    //     if (window.orientation === 90 || window.orientation === -90) {
    //       // alert('横屏状态！')
    //       _this.$Toast('请使用竖屏进行浏览！')
    //     }
    //   },
    //   false
    // )
  },
  watch: {
    $route (to, from) {
      // 如果前端页面进行刷新，则无需加入transition动画
      if (from.name === null) {
        return
      }
      if (to.meta.index < from.meta.index) {
        this.direction = 'slide-right'
      } else {
        if (!to.meta.index) {
          this.direction = ''
          return
        }
        this.direction = 'slide-left'
      }
    }
  }
}
</script>
<style lang="scss">
@import './assets/styles/_mixin.scss';
// 当手机屏幕宽度超过 $break-super: 480px, 横屏浏览时的样式
@media (min-width: $break-super) and (orientation: landscape) {
  html::before {
    width: 100%;
    height: 100%;
    z-index: 99999;
    position: fixed;
    top: 0;
    left: 0;
    content: '';
    background: #333;
  }
  body:before {
    background-image: url('./assets/images/orientation.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: 50%;
    content: '';
    height: 200px;
    width: 100px;
    z-index: 99999;
    margin: -140px 0 0 -50px;
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
  }
  body:after {
    content: '\4e3a\4e86\66f4\597d\7684\4f53\9a8c\ff0c\8bf7\5c06\624b\673a\7ad6\8fc7\6765';
    position: absolute;
    top: 50%;
    text-align: center;
    height: 30px;
    left: 0;
    font-size: 18px;
    z-index: 99999;
    width: 100%;
    color: #fff;
    margin-top: 35px;
  }
}
html,
body {
  // touch-action: none;
}
.inline-block {
  display: inline-block;
}
.flex-row {
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
}
.mint-header {
  height: 50px;
}
img {
  vertical-align: middle;
}
pre {
  position: relative;
  margin: 0;
  padding: 0 15px;
  line-height: 36px;
  background: #f2f2f2;
  color: #333;
  font-family: 'Courier New', Courier, monospace, serif;
  font-size: 24px;
  border: none;
  border-left: 5px solid #ddd;
}

.input-wrap {
  .code {
    height: 80px;
  }
  svg {
    width: 240px;
    height: 70px;
  }
}
.error {
  color: #c00;
  font-size: 24px;
}
ul,
li {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}

// custom style for mint ui
.cell-title {
  .mint-cell-title {
    align-self: flex-start;
  }
}
.mint-cell {
  padding: 0 20px;
}
.mint-cell-wrapper {
  padding: 0 !important;
}

.slide-right-enter-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.5s;
  will-change: transform;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active,
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-right-enter-to,
.slide-right-leave {
  transform: translateX(0);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active,
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-left-enter-to,
.slide-left-leave {
  transform: translateX(0);
}
</style>
