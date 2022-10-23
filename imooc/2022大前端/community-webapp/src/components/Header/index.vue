<template>
  <div class="header" :style="{zIndex: zIndex,  'background-color': bkColor}">
    <div class="head-left" @click="goback()" v-if="hasBack">
      <slot name="h-left">
        <svg-icon icon="arrow-left"></svg-icon>
        <span class="left-text" v-if="backText">{{backText}}</span>
      </slot>
    </div>
    <div class="head-content">
      <slot name="h-center">
        <span>{{title}}</span>
      </slot>
    </div>
    <div class="head-right">
      <slot name="h-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    backText: {
      type: String,
      default: '返回'
    },
    zIndex: {
      type: Number,
      default: 0
    },
    back: {
      type: Function
    },
    bkColor: {
      type: String
    },
    hasBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goback () {
      if (this.back) {
        this.back()
        return
      }
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '../../assets/styles/_variables.scss';
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  z-index: 100;
  font-size: 32px;
  line-height: $header-height;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .head-content {
    max-width: 60%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    text-align: center;
  }
  .head-left,
  .head-right {
    position: absolute;
    top: 0;
    padding: 0 20px;
  }
  .head-left {
    left: 0;
  }
  .head-right {
    right: 0;
  }
}
</style>
