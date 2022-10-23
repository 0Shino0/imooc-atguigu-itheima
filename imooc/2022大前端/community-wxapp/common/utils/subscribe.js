export default (arr, cb, mute = false) => {
  // 1. 设置小程序的模板消息 -> wx.getSetting -> 获取用户授权状态
  // 2. 存放到全局的变量上，以便后续发起订阅请求
  uni.requestSubscribeMessage({
    tmplIds: arr.length > 3 ? arr.splice(0, 3) : arr,
    // 在调试工具中，无论订阅成功还是取消，都可以在complete取到状态
    // 调试工具中，无法直接测试关闭订阅的状态
    // 在真机上，可以获取用户拒绝订阅的状态
    // 而且在complete部分可以获取到success/fail的回调内容
    complete: (res) => {
      // 2.1 如果用户未订阅，并未拒绝，正常发起订阅
      // 2.2 如果用户拒绝了订阅，需要给用户一个轻提示 -> 手动打开订阅消息的
      // wx.openSetting
      if (arr.includes(item => res[item] === 'reject') || res.errCode === 20004) {
        uni.showModal({
          title: '您关闭了订阅通知',
          content: '需要打开设置进行手动设置吗？',
          success: function (res) {
            if (res.confirm) {
              uni.openSetting()
            } else if (res.cancel) {
              uni.showToast({
                icon: 'error',
                title: '您取消了订阅',
                duration: 2000
              })
            }
          }
        })
      } else if (!arr.some(item => res[item] === 'reject')) {
        !mute && uni.showToast({
          icon: 'none',
          title: '您已经订阅了该消息',
          duration: 1500
        })
      } else if (res.errCode === 10002 || res.errCode === 10003) {
        uni.showToast({
          title: '网络问题订阅失败，请重新订阅',
          duration: 1500
        })
      } else {
        // 其他的逻辑 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html
      }
      cb && cb()
    }
  })
}
