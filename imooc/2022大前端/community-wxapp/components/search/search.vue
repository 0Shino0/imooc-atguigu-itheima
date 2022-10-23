<template>
  <view class="search" :style="{'padding-top': barHeight + 'px'}" @click="$emit('click')">
    <view class="search-box">
      <u-icon name="search" color="#CCC" size="28" class="icon"></u-icon>
      <text>搜索社区内容</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      barHeight: 0
    }
  },
  beforeMount () {
    this.getNavBarHeight()
  },
  methods: {
    getNavBarHeight () {
      uni.getSystemInfo({
        success: (result) => {
          console.log('🚀 ~ file: home.vue ~ line 24 ~ getNavBarHeight ~ result', result)
          const statusBarHeight = result.statusBarHeight
          const isiOS = result.system.indexOf('iOS') > -1
          if (isiOS) {
            this.barHeight = statusBarHeight + 5
          } else {
            this.barHeight = statusBarHeight + 8
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 100vw;
  background: #fff;
  padding: 0 32rpx 12rpx;
  z-index: 999;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ccc;
  .search-box {
    position: relative;
    width: 60%;
    @media screen and (max-width: 320px) {
      width: 50%;
    }
    background: #f3f3f3;
    height: 64rpx;
    border-radius: 32rpx;
    line-height: 64rpx;
    columns: #ccc;
    font-size: 26rpx;
    padding-left: 74rpx;
  }
  .icon {
    position: absolute;
    left: 32rpx;
    top: 19rpx;
  }
}
</style>
