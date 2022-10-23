import { debounce, observerDomResize } from './util'

export default {
  data() {
    return {
      dom: '',
      width: 0,
      height: 0,
      originalWidth: 0,
      originalHeight: 0,
      debounceInitWHFun: '',
      domObserver: ''
    }
  },
  methods: {
    async autoResizeMixinInit() {
      await this.initWH(false)
      this.getDebounceInitWHFun()
      this.bindDomResizeCallback()
      if (typeof this.afterAutoResizeMixinInit === 'function') this.afterAutoResizeMixinInit()
    },
    initWH(resize = true) {
      const { $nextTick, $refs, ref, onResize } = this

      return new Promise(resolve => {
        $nextTick(e => {
          const dom = this.dom = $refs[ref]
          if (this.options) {
            const { width, height } = this.options
            if (width && height) {
              this.width = width
              this.height = height
            }
          } else {
            this.width = dom.clientWidth
            this.height = dom.clientHeight
          }
          if (!this.originalWidth || !this.originalHeight) {
            const { width, height } = screen
            this.originalWidth = width
            this.originalHeight = height
          }
          if (typeof onResize === 'function' && resize) onResize()
          resolve()
        })
      })
    },
    getDebounceInitWHFun() {
      this.debounceInitWHFun = debounce(100, this.initWH)
    },
    bindDomResizeCallback() {
      this.domObserver = observerDomResize(this.dom, this.debounceInitWHFun)
      window.addEventListener('resize', this.debounceInitWHFun)
    },
    unbindDomResizeCallback() {
      this.domObserver.disconnect()
      this.domObserver.takeRecords()
      this.domObserver = null
      window.removeEventListener('resize', this.debounceInitWHFun)
    }
  },
  mounted() {
    this.autoResizeMixinInit()
  },
  beforeDestroy() {
    const { unbindDomResizeCallback } = this
    unbindDomResizeCallback()
  }
}
