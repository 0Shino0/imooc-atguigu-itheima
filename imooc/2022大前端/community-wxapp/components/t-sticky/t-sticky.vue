<template>
  <view class="t-sticky" :style="{'top': top + 'px'}">
    <slot></slot>
  </view>
</template>

<script>

export default {
  props: {
    top: {
      default: 0,
      type: Number
    }
  },
  data: () => ({})
}
</script>

<style lang="scss" scoped>
.t-sticky {
  position: sticky;
  // top: 0;
}
</style>
