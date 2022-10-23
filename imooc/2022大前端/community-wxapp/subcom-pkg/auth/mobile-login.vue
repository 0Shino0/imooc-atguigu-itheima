<template>
  <view class="wrapper">
    <view class="title">登录注册更精彩</view>
    <view class="info">未注册的手机号验证后自动创建账号</view>
    <view class="form">
      <u-form label-width="120">
        <u-form-item label="手机号">
          <u-input v-model="mobile" placeholder="请输入手机号"></u-input>
          <template v-slot:right>
            <u-button type="primary" shape="circle" size="mini" hover-class="none" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</u-button>
          </template>
        </u-form-item>
      </u-form>
      <view class="btn" :class="{'deactive': !/^1[3-9]\d{9}$/.test(mobile)}">
        <u-button type="primary" hover-class="none" @click="getCode">获取验证码</u-button>
      </view>
    </view>
    <navigator open-type="navigateBack" hover-class="none">
      <view class="footer u-flex u-col-center u-row-center">
        <u-icon name="weixin-circle-fill" size="120" color="#1BB723"></u-icon>
        <text>微信登录</text>
      </view>
    </navigator>
  </view>
</template>

<script>
import auth from '@/mixins/auth'
export default {
  mixins: [auth],
  data: () => ({
    mobile: '',
    phoneNumber: '',
    loading: false
  }),
  methods: {
    async getCode () {
      // 发送短信验证码
      // 1.倒计时
      // 2.防止用户频繁发送
      if (this.loading) return
      this.loading = true
      try {
        const res = await this.$u.api.sendCode({
          mobile: this.mobile
        })
        this.loading = false
        if (res.code === 200) {
        // 提示用户
          uni.showToast({
            icon: 'none',
            title: '发送成功',
            duration: 2000
          })
          // 延迟跳转到输入验证码的页面
          setTimeout(() => {
            uni.navigateTo({
              url: '/subcom-pkg/auth/mobile-code?mobile=' + this.mobile
            })
          }, 2000)
        } else {
          uni.showToast({
            icon: 'error',
            title: '短信发送失败',
            duration: 2000
          })
        }
      } catch (error) {
        this.loading = false
      }
    },
    async getPhoneNumber (value) {
      const { encryptedData, iv } = value.detail
      // value.detail + code
      const { code, data } = await this.$u.api.getMobile({
        code: this.code,
        encryptedData,
        iv
      })
      if (code === 200) {
        const { phoneNumber, purePhoneNumber, countryCode } = data
        if (countryCode !== '86') {
          uni.showToast({
            title: 'Please use a cell phone number from mainland China',
            duration: 2000
          })
          return
        }
        this.phoneNumber = phoneNumber
        this.mobile = purePhoneNumber
      } else {
        uni.showToast({
          icon: 'error',
          title: '获取手机号失败，请重试',
          duration: 2000
        })
      }
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
  .form {
    padding-top: 40rpx;
  }
  ::v-deep .btn {
    padding-top: 80rpx;
    &.deactive {
      .u-btn--primary {
        background-color: #ccc;
      }
    }
  }
}
.footer {
  position: absolute;
  bottom: 120rpx;
  width: 100vw;
  left: 0;
  text-align: center;
  flex-direction: column;
  text {
    color: #666;
    font-size: 28rpx;
    padding-top: 14rpx;
  }
}
</style>
