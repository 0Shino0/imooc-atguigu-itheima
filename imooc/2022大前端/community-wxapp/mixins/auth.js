// 1.code -> data
// 2.code -> vuex -> 后续的跨页面使用的场景

export default {
  data: () => ({
    code: '',
    ctrl: null
  }),
  computed: {},
  created () {
    this.getNewCode()
    this.setCron()
  },
  onShow () {
    this.getNewCode()
    this.setCron()
  },
  onHide () {
    clearTimeout(this.ctrl)
  },
  // 用户离开当前页面
  onUnload () {
    clearTimeout(this.ctrl)
  },
  methods: {
    getNewCode () {
      uni.login({
        success: (e) => {
          this.code = e.code
        }
      })
    },
    setCron () {
      clearTimeout(this.ctrl)
      // 定时刷新code的方法
      this.ctrl = setTimeout(() => {
        this.getNewCode()
        // 重新进行cron，保证code的有效性
        this.setCron()
      }, 4 * 60 * 1000)
    }
  }
}
