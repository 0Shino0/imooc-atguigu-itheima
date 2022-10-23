<template>
  <view class="wrapper">
    <view class="title">输入验证码</view>
    <view class="info">验证码已发送至 {{mobile.substr(0,3)}}****{{mobile.substr(7,10)}} </view>
    <view class="inputs">
      <u-message-input :maxlength="6" mode="bottomLine" active-color="#02d199" inactive-color="#DDD" width="90" :bold="false" :breathe="false" :focus="true" @change="change"></u-message-input>
    </view>
    <view class="resend" :class="{'disabled': sending}" @click="resend()">{{msg}}</view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    mobile: '',
    count: 60,
    ctrl: null,
    sending: false
  }),
  onLoad (options) {
    this.mobile = options.mobile
    this.setCron()
  },
  methods: {
    ...mapMutations(['setToken', 'setRefreshToken', 'setUserInfo']),
    setCron () {
      clearInterval(this.ctrl)
      this.sending = true
      this.ctrl = setInterval(() => {
        this.count--
        if (this.count === 0) {
          this.count = 60
          this.sending = false
          clearInterval(this.ctrl)
        }
      }, 1000)
    },
    async change (val) {
      if (/\d{6}/.test(val)) {
        const res = await this.$u.api.loginByPhone({
          mobile: this.mobile,
          code: val
        })
        if (res.code === 200) {
          uni.showToast({
            icon: 'none',
            title: '登录成功，2s后跳转',
            duration: 2000
          })
          const { token, data, refreshToken } = res
          this.setToken(token)
          this.setRefreshToken(refreshToken)
          this.setUserInfo(data)
          setTimeout(() => {
            uni.navigateBack({
              delta: 3
            })
          }, 2000)
        } else {
          uni.showToast({
            icon: 'none',
            title: res.msg,
            duration: 2000
          })
        }
      }
    },
    async resend () {
      if (this.sending) return
      const res = await this.$u.api.sendCode({
        mobile: this.mobile
      })
      if (res.code === 200) {
        this.setCron()
      } else {
        uni.showToast({
          icon: 'none',
          title: res.msg || '短信发送失败，请稍后重试',
          duration: 2000
        })
      }
    }
  },
  computed: {
    msg () {
      let str = '重新获取'
      if (this.sending) {
        str += ('(' + (this.count + '').padStart(2, '0') + 's)')
      }
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 32rpx;
  .title {
    color: #333;
    font-size: 48rpx;
    font-weight: bold;
    padding-top: 50rpx;
  }
  .info {
    color: #666;
    line-height: 28rpx;
    padding-top: 24rpx;
  }
  .inputs {
    padding: 60rpx 0 40rpx;
  }
  .resend {
    font-size: 26rpx;
    font-weight: 300;
    color: #02d199;
    &.disabled {
      color: #ddd;
    }
  }
}
</style>
