<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li class="layui-nav-item" v-for="(item,index) in lists" :key="'center' + index">
        <router-link :to="{name: item.link, params: {uid: uid}}" :active-class="item.activeClass">
          <i class="layui-icon" :class="item.icon"></i>
          {{item.name}}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'center',
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'layui-icon-home',
          link: 'home'
        },
        {
          name: '用户中心',
          icon: 'layui-icon-friends',
          link: 'center'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set',
          link: 'info',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-form',
          link: 'mypost',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-reply-fill',
          link: 'msg'
        },
        {
          name: '其他设置',
          icon: 'layui-icon-component',
          link: 'others'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['uid'])
  }
}
</script>

<style lang="scss" scoped>
.icontoimc {
  margin-right: 10px;
}
</style>
