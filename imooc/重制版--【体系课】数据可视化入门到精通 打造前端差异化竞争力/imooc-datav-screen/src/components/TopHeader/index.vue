<template>
  <div class="top-header">
    <dv-decoration-8 class="header-left-decoration" />
    <dv-decoration-5 class="header-center-decoration" />
    <dv-decoration-8 class="header-right-decoration" reverse />
    <div class="title">互联网产业全球布局看板</div>
  </div>
</template>

<script>
  export default {
    name: 'topHeader'
  }
</script>

<style lang="scss" scoped>
  .top-header {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;

    .header-center-decoration {
      width: 40%;
      height: 120px;
      margin-top: 50px;
    }

    .header-left-decoration, .header-right-decoration {
      width: 25%;
      height: 130px;
    }

    .title {
      position: absolute;
      font-size: 64px;
      font-weight: bold;
      left: 50%;
      top: 20px;
      transform: translateX(-50%);
    }
  }
</style>
