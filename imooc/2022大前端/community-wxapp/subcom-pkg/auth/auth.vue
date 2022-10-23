<template>
  <view class="auth">
    <view class="title u-flex u-col-center u-row-center">
      <!-- logo区域 -->
      <image src="/static/images/logo.jpg" mode="aspectFill" />
      <text>toimc技术社区</text>
    </view>
    <!-- 登录按钮 -->
    <view class="container">
      <u-button type="primary" hover-class="none" @click="login">
        <u-icon class="icon" name="weixin-fill" size="32" color="#fff"></u-icon>
        <text>微信登录</text>
      </u-button>
      <u-button :custom-style="customStyle" plain hover-class="none" @click="goto">手机号登录</u-button>
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'
import auth from '@/mixins/auth'
export default {
  mixins: [auth],
  components: {},
  data: () => ({
    customStyle: {
      'margin-top': '40rpx',
      'background-color': '#fff',
      color: '#02d199'
    }
  }),
  computed: {},
  methods: {
    ...mapMutations(['setToken', 'setRefreshToken', 'setUserInfo']),
    async login () {
      uni.getUserProfile({
        lang: 'zh_CN',
        desc: '用于完善会员资料',
        success: async (e) => {
          try {
            const res = await this.$u.api.wxLogin({
              code: this.code,
              user: e
            })
            if (res.code === 200) {
            // 请求成功 token, userInfo
              const { token, data, refreshToken } = res
              // 添加到store中
              this.setToken(token)
              this.setRefreshToken(refreshToken)
              this.setUserInfo(data)
              uni.navigateBack({
                delta: 1
              })
            }
          } catch (error) {
            const { data } = error
            if (data && data.code === 501) {
              this.getNewCode()
            }
          }
        },
        fail: (e) => {
          uni.showToast({
            icon: 'error',
            title: '用户授权失败，请重试',
            duration: 2000
          })
        }
      })
    },
    goto () {
      uni.navigateTo({
        url: '/subcom-pkg/auth/mobile-login'
      })
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.title {
  flex-direction: column;
  height: 500rpx;
  width: 100vw;
  image {
    width: 168rpx;
    height: 168rpx;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.1);
  }
  text {
    margin-top: 32rpx;
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
  }
}

.icon {
  margin-right: 10rpx;
}

.container {
  padding: 32rpx;
}
</style>
