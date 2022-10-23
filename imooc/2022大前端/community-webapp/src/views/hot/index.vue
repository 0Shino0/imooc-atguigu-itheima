<template>
  <div>
    <ul class="links">
      <li>
        <router-link to="/hot/post">热门帖子</router-link>
      </li>
      <li>
        <router-link to="/hot/comments">热门评论</router-link>
      </li>
      <li>
        <router-link to="/hot/sign">签到排行</router-link>
      </li>
    </ul>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: 'hot'
}
</script>

<style lang="scss" scoped>
.links {
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  box-shadow: 0 0 10px rgba(112, 94, 94, 0.1);
  a {
    color: #666;
  }
  .active {
    color: $primary-color;
    position: relative;
    &:after {
      content: '';
      display: inline-block;
      width: 48px;
      height: 4px;
      position: absolute;
      bottom: -30px;
      right: 36px;
      background: $primary-color;
    }
  }
}
</style>
