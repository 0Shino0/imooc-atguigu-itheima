<template>
  <div>
    <my-header title="您访问的页面不存在" :zIndex="100"></my-header>
    <div class="flex">
      <img src="@/assets/images/icon-404.png" width="100px" alt />
      <p>找不到页面了</p>
      <router-link to="/">
        <mt-button size="large" class="btn">回到首页</mt-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notfound'
}
</script>

<style lang="scss" scoped>
.flex {
  width: 100%;
  height: 100%;
  position: fixed;
  min-height: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 0;
}
.btn {
  width: 300px;
  margin-top: 40px;
}
a {
  text-decoration: none;
  color: $font-main-color;
}
p {
  padding-bottom: 15px;
  padding-top: 10px;
  color: #ddd;
}
</style>
