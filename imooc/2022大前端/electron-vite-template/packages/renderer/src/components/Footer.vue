<template>
  <div class="fly-footer">
    <p>
      <a href="http://talks.toimc.com/" target="_blank">toimc技术社区</a> 2020 &copy;
      <a href="http://www.toimc.com/" target="_blank">toimc.com 出品</a>
    </p>
    <p>
      <a href="https://mp.weixin.qq.com/s/wDY7UuQld3U6zub5MUCtbQ" target="_blank">加入团队</a>
      <a href="https://mp.weixin.qq.com/s/H9JI0dR1jPUN12qsRZ2r5Q" target="_blank">React兴趣小组</a>
      <a
        href="javascript:void(0)"
        style="position: relative"
        @mouseover="toggle(true)"
        @mouseout="toggle(false)"
      >
        微信公众号
        <img v-if="on" class="qr" src="../assets/img/qrcode-small.jpg" />
      </a>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import toggleUtils from '@/utils/toggle'

  export default defineComponent({
    name: 'FooterComponent',
    setup() {
      const { toggle, on } = toggleUtils(false, 500)
      return {
        toggle,
        on
      }
    }
  })
</script>

<style lang="scss" scoped>
  .qr {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 0;
    top: -130px;
  }
</style>
