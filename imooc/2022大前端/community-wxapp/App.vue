<script>
export default {
  onLaunch: function () {
    // console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
    // console.log('App Launch')
    uni.getSetting({
      withSubscriptions: true,
      success: async (res) => {
        const app = getApp()
        app.globalData.subscriptionsSetting = res.subscriptionsSetting
        // 模板ID
        // 改装成一个API接口 -> key:value -> value, key -> 业务场景
        const { code, data } = await this.$u.api.getSubIds()
        let arr
        if (code === 200) {
          // {key: value, key1: value1} => [value, value1]
          arr = Object.entries(data).map(o => o[1])
        } else {
          // 默认的前端模板数据
          arr = [
            'S7zrpjN9Kq05-4ZG_nlTAYxnARMLWlSW09h54A2JCZo',
            'ANN2-LhDgrhdFjs7jHOLdTnaxWpQU1LqS3kDIMF9GDs',
            'FSQZganmBgaRRoNNlelQ1Qm2u4gx6pVSt69EJfkLbPA',
            'g9FFU43_deHRuez-2FcrASorTSITsJJPYx-GhzvHEIU'
          ]
        }
        // 1. 获取用户已经订阅的消息
        const { itemSettings: keys, mainSwitch } = res.subscriptionsSetting
        // 相当于用户未打开订阅开关
        if (!mainSwitch) {
          return
        }
        // 用户开启订阅消息 -> 如果未设置任何消息
        if (!keys) {
          app.globalData.tmplIds = arr
        } else {
          // 用户开启了订阅消息 -> 已经有部分订阅 -> reject, accept
          const keysArr = Object.keys(keys)
          app.globalData.tmplIds = arr.filter((item) => keysArr.indexOf(item) === -1)
        }
      }
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
/*每个页面公共css */
.bottom-line {
  position: fixed;
  bottom: -5px;
  left: 0;
  width: 100vw;
  height: 5px;
  box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.05);
  z-index: 999;
}

.box-shadow {
  box-shadow: 0px 4px 6px 0px rgba(36, 37, 37, 0.08);
  position: relative;
  z-index: 999;
}

.flex-column {
  flex-direction: column;
}
</style>
