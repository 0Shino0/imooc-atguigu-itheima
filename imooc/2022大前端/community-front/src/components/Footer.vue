<template>
  <div class="fly-footer">
    <p>
      <a href="http://talks.toimc.com/" target="_blank">toimc技术社区</a> 2019 &copy;
      <a href="http://www.toimc.com/" target="_blank">toimc.com 出品</a>
    </p>
    <p>
      <a href="https://mp.weixin.qq.com/s/wDY7UuQld3U6zub5MUCtbQ" target="_blank">加入团队</a>
      <a href="https://mp.weixin.qq.com/s/H9JI0dR1jPUN12qsRZ2r5Q" target="_blank">React兴趣小组</a>
      <a
        href="javascript:void(0)"
        @mouseover="show()"
        @mouseout="hide()"
        style="position:relative;"
      >
        微信公众号
        <img class="qr" v-if="isShow" src="../assets/img/qrcode-small.jpg" alt />
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      setTimeout(() => {
        this.isShow = false
      }, 500)
    }
  }
}
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
