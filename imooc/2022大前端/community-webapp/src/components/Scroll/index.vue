
<template>
  <div class="list">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore
        :bottomMethod="loadBottom"
        :bottomAllLoaded="isEnd"
        :topDistance="topDistance"
        :bottomDistance="bottomDistance"
        :bottomLoadingText="bottomLoadingText"
        :topMethod="loadTop"
        :topPullText="topPullText"
        :auto-fill="false"
        @bottom-status-change="handleBottomChange"
        @top-status-change="handleTopChange"
        ref="loadmore"
      >
        <slot></slot>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading' && showSpin">
            <mt-spinner :type="spinType"></mt-spinner>
          </span>
          <span class="text">{{bottomLoadingText}}</span>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span
            v-show="bottomStatus !== 'loading'"
            :class="{ 'is-rotate': bottomStatus === 'drop' }"
          >↑</span>
          <span v-show="bottomStatus === 'loading' && showSpin">
            <mt-spinner :type="spinType"></mt-spinner>
          </span>
          <span class="text">{{bottomLoadingText}}</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
// import { getList } from '@/api/content'
export default {
  name: 'scroll',
  props: {
    catalog: {
      type: String,
      default: ''
    },
    bottomLoadingText: {
      type: String,
      default: '加载中...'
    },
    topPullText: {
      type: String,
      default: '加载中...'
    },
    distance: {
      type: Number,
      default: 0
    },
    topDistance: {
      type: Number,
      default: 50
    },
    bottomDistance: {
      type: Number,
      default: 20
    },
    showSpin: {
      type: Boolean,
      default: true
    },
    spinType: {
      type: String,
      default: 'double-bounce'
    },
    isEnd: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      topStatus: '',
      bottomStatus: '',
      wrapperHeight: 0
      // allLoaded: false
    }
  },
  watch: {
    distance () {
      this.$nextTick(() => {
        this.wrapperHeight =
          document.documentElement.clientHeight -
          this.$refs.wrapper.getBoundingClientRect().top -
          this.distance
      })
    }
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadTop () {
      this.$emit('on-loadTop', this.endTopLoaded)
      // setTimeout(() => {
      //   this.$refs.loadmore.onTopLoaded()
      // }, 2000)
    },
    endTopLoaded () {
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      this.$emit('on-loadBottom', this.endBottomLoaded)
      // setTimeout(() => {
      //   this.$refs.loadmore.onBottomLoaded() // 固定方法，查询完要调用一次，用于重新定位
      // }, 1500)
    },
    endBottomLoaded () {
      this.$refs.loadmore.onBottomLoaded()
    }
  },
  mounted () {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top -
      this.distance
  }
}
</script>

<style lang="scss" scoped>
// body {
//   margin: 0;
//   background-color: #fafafa;
// }
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.page-loadmore-wrapper {
  overflow: scroll;
  // 硬件加速
  -webkit-overflow-scrolling: touch;
  &:after {
    min-height: calc(100% + 1px);
  }
}
.mint-loadmore-top,
.mint-loadmore-bottom {
  color: $font-main-color;
  span {
    display: inline-block;
    transition: 0.2s linear;
    vertical-align: middle;
  }
  &.is-rotate {
    transform: rotate(180deg);
  }
  .text {
    padding-left: 10px;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
