<template>
  <div class="top-header">
    <div class="title">慕课外卖数据大屏</div>
    <div class="sub-title">移动报表</div>
    <div class="date">{{date}}</div>
  </div>
</template>

<script>
  export default {
    computed: {
      date() {
        const date = new Date()
        const y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        m = m < 10 ? `0${m}` : m
        d = d < 10 ? `0${d}` : d
        return `${y}-${m}-${d}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top-header {
    position: absolute;
    color: #fff;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 300px;
    padding: 50px 24px 24px;
    box-sizing: border-box;
    .title {
      font-size: 48px;
      font-weight: 500;
    }
    .sub-title {
      font-size: 36px;
      margin-top: 20px;
    }
    .date {
      font-size: 24px;
      font-weight: 300;
      color: rgba(255,255,255,.5);
      margin-top: 40px;
    }
  }
</style>
