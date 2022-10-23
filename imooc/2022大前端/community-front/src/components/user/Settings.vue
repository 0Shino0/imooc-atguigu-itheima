<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <li>
          <router-link :to="{name: 'info'}">我的资料</router-link>
        </li>
        <li>
          <router-link :to="{name: 'pic'}">头像</router-link>
        </li>
        <li>
          <router-link :to="{name: 'passwd'}">密码</router-link>
        </li>
        <li>
          <router-link :to="{name: 'account'}">帐号绑定</router-link>
        </li>
      </ul>
      <div class="layui-tab-content" style="padding: 20px 0;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>
