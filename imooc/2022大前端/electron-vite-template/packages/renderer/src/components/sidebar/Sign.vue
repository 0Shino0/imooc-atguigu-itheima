<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a id="LAY_signinHelp" href="javascript:;" class="fly-link" @click="showInfo()">说明</a>
      <i class="fly-mid"></i>
      <a id="LAY_signinTop" href="javascript:;" class="fly-link" @click="showTop()">
        活跃榜
        <span class="layui-badge-dot"></span>
      </a>
      <span v-show="state.isSign || state.isLogin" class="fly-signin-days">
        已连续签到
        <cite>{{ count }}</cite
        >天
      </span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!state.isSign">
        <button id="LAY_signin" class="layui-btn layui-btn-danger" @click="sign()">
          今日签到
        </button>
        <span>
          可获得
          <cite>{{ favs }}</cite
          >飞吻
        </span>
      </template>
      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">{{ state.msg }}</button>
        <span>
          获得了
          <cite>{{ favs }}</cite
          >飞吻
        </span>
      </template>
    </div>
    <sign-info :is-show="state.isShow" @close-modal="close()"></sign-info>
    <sign-list :is-show="state.showList" @close-modal="close()"></sign-list>
  </div>
</template>

<script lang="ts">
  import SignInfo from './SignInfo.vue'
  import SignList from './SignList.vue'
  import { userSign } from '@/api/user'
  import moment from 'dayjs'
  import { computed, defineComponent, onMounted, reactive } from 'vue'
  import store from '@/store'
  import type { HttpResponse } from '@/common/interface'
  import { popup } from '@/components/modules/pop'

  export default defineComponent({
    name: 'SignPage',
    components: {
      SignInfo,
      SignList
    },
    setup() {
      const state = reactive({
        isShow: false,
        showList: false,
        current: 0,
        isSign: false,
        msg: '',
        userInfo: computed(() => store.state.userInfo),
        isLogin: computed(() => store.state.isLogin)
      })

      const count = computed(() => {
        if (Object.keys(store.state.userInfo).length !== 0) {
          if (typeof store.state.userInfo.count !== 'undefined') {
            return store.state.userInfo.count
          } else {
            return 0
          }
        } else {
          return 0
        }
      })

      const favs = computed(() => {
        let result = 0
        if (count.value < 5) {
          result = 5
        } else if (count.value >= 5 && count.value < 15) {
          result = 10
        } else if (count.value >= 15 && count.value < 30) {
          result = 15
        } else if (count.value >= 30 && count.value < 100) {
          result = 20
        } else if (count.value >= 100 && count.value < 365) {
          result = 30
        } else if (count.value >= 365) {
          result = 50
        }
        return result
      })

      let ctrl: ReturnType<typeof setTimeout>

      const nextSign = () => {
        clearInterval(ctrl)
        const newDate = moment().add(1, 'day').format('YYYY-MM-DD')
        let seconds = moment(newDate + ' 00:00:00').diff(moment(), 'second')
        // 测试用
        // const newDate = moment().add(10, 'second')
        // let seconds = moment(newDate).diff(moment(), 'second')
        let hour = Math.floor(seconds / 3600)
        let min = Math.floor((seconds % 3600) / 60)
        let second = seconds % 60
        state.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${
          second < 10 ? '0' + second : second
        }`
        // if (seconds < 600) {
        ctrl = setInterval(() => {
          seconds = moment(newDate + ' 00:00:00').diff(moment(), 'second')
          // 测试用
          // seconds = moment(newDate).diff(moment(), 'second')
          hour = Math.floor(seconds / 3600)
          min = Math.floor((seconds % 3600) / 60)
          second = seconds % 60
          state.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${
            second < 10 ? '0' + second : second
          }`
          if (seconds <= 0) {
            clearInterval(ctrl)
            state.isSign = false
            const user = store.state.userInfo
            user.isSign = false
            store.commit('setUserInfo', user)
          }
        }, 1000)
        // } else {
        //   this.msg = '今日已签到'
        // }
      }
      const showInfo = () => {
        state.isShow = true
      }

      const showTop = () => {
        state.showList = true
      }

      const close = () => {
        state.isShow = false
        state.showList = false
      }

      const sign = async () => {
        if (!state.isLogin) {
          popup('请先登录', 'shake')
          return
        }
        const res = await userSign()
        const { code, favs, count, lastSign } = res as HttpResponse

        const user = store.state.userInfo
        if (code === 200) {
          user.favs = favs
          user.count = count
          popup('签到成功！')
        } else {
          // 用户已经签到
          popup('您已经签到！')
        }
        user.isSign = true
        user.lastSign = lastSign
        state.isSign = true
        store.commit('setUserInfo', user)
        nextSign()
      }

      onMounted(() => {
        // 判断用户的上一次签到时间与签到状态
        // 如果用户上一次签到时间与当天的签到日期相差1天，允许用户进行签到
        const isSign = store.state.userInfo.isSign
        const lastSign = store.state.userInfo.lastSign
        const nowDate = moment().format('YYYY-MM-DD')
        const lastDate = moment(lastSign).format('YYYY-MM-DD')
        const diff = moment(nowDate).diff(moment(lastDate), 'day')
        if (diff > 0 && isSign) {
          state.isSign = false
        } else {
          state.isSign = isSign as boolean
          if (diff === 0 && isSign) {
            nextSign()
          } else {
            state.msg = '今日已签到'
          }
        }
      })

      return {
        state,
        count,
        favs,
        sign,
        close,
        showInfo,
        showTop
      }
    }
  })
</script>
<style lang="scss">
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
  .mask {
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 20000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .layui-layer {
    position: fixed;
    width: 300px;
    height: 480px;
    top: 50%;
    left: 50%;
    margin-top: -240px;
    margin-left: -150px;
    background: #fff;
    z-index: 21000;
    &.active {
      animation-fill-mode: both;
      animation-duration: 0.2s;
      animation-name: bounceIn;
    }
    .layui-layer-title {
      height: 42px;
      line-height: 42px;
      padding: 0 20px;
      color: #333;
      background-color: #f8f8f8;
    }
    .layui-layer-content {
      padding: 20px;
    }
    .layui-tab-content {
      padding: 0 10px;
    }
    .layui-tab-item {
      line-height: 45px;
      li {
        border-bottom: 1px dotted #dcdcdc;
        &:last-child {
          border-bottom: none;
        }
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 2px;
      }
    }
  }
</style>
