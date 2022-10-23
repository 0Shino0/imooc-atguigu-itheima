<template>
  <div class="order">
    <u-button @click="order">下单</u-button>
    <u-button @click="pay">确认支付</u-button>
  </div>
</template>

<script>

export default {
  components: {},
  data: () => ({
    params: {},
    orderParams: {}
  }),
  computed: {},
  methods: {
    async order () {
      const res = await this.$u.api.orderGoods({
        description: 'toimc测试商品',
        total: 1 // 单位分
      })
      // console.log('🚀 ~ file: order.vue ~ line 23 ~ order ~ res', res)
      const { code, data } = res
      if (code === 200) {
        this.orderParams = data
        uni.showToast({
          icon: 'none',
          title: '下单成功',
          duration: 2000
        })
      }
    },
    pay () {
      uni.requestPayment({
        provider: 'weixin',
        orderInfo: {
          description: 'toimc测试商品',
          total: 1 // 单位分
        },
        timeStamp: this.orderParams.timestamp + '',
        nonceStr: this.orderParams.nonceStr,
        package: this.orderParams.package,
        signType: this.orderParams.signType,
        paySign: this.orderParams.paySign,
        complete: function (res) {
          console.log('🚀 ~ file: order.vue ~ line 47 ~ pay ~ res', res)
          // errMsg: "requestPayment:ok" -> 支付成功
          // errMsg: "requestPayment:fail cancel" -> 取消
        }
      })
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad () {},
  // 页面周期函数--监听页面初次渲染完成
  onReady () {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow () {},
  // 页面周期函数--监听页面隐藏
  onHide () {},
  // 页面周期函数--监听页面卸载
  onUnload () {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh () {
    uni.stopPullDownRefresh()
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom () {}
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
}
</script>

<style></style>
