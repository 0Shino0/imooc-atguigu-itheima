<template>
  <div class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link v-slot="{ navigate }" to="/" custom class="layui-hide-xs">
          <li @click="navigate"><a href="/">首页</a></li>
        </router-link>
        <!-- todo -->
        <router-link
          v-for="(item, index) in lists"
          :key="'panel' + index"
          v-slot="{ navigate }"
          :to="item.path"
          custom
        >
          <li @click="navigate">
            <a href="javascript:void(0)">
              {{ item.name }}
              <span v-if="item.isNew" class="layui-badge-dot"></span>
            </a>
          </li>
        </router-link>
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
          <span class="fly-mid"></span>
        </li>

        <!-- 用户登入后显示 -->
        <template v-if="isLogin">
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <!-- todo -->
            <a :to="{ name: 'mypost' }">我发表的贴</a>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <!-- todo -->
            <a :to="{ name: 'mycollection' }">我收藏的贴</a>
          </li>
        </template>
      </ul>

      <div class="fly-column-right layui-hide-xs">
        <span class="fly-search">
          <i class="layui-icon"></i>
        </span>
        <!-- todo -->
        <a :to="{ name: 'add' }" class="layui-btn">发表新帖</a>
      </div>
      <div
        class="layui-hide-sm layui-show-xs-block"
        style="margin-top: -10px; padding-bottom: 10px; text-align: center"
      >
        <!-- todo -->
        <a :to="{ name: 'add' }" class="layui-btn">发表新帖</a>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    name: 'PanelComponent',
    data() {
      return {
        lists: [
          {
            name: '提问',
            path: '/index/ask',
            isNew: false
          },
          {
            name: '分享',
            path: '/index/share',
            isNew: true
          },
          {
            name: '讨论',
            path: '/index/discuss',
            isNew: false
          },
          {
            name: '建议',
            path: '/index/advise',
            isNew: false
          },
          {
            name: '公告',
            path: '/index/notice',
            isNew: false
          },
          {
            name: '动态',
            path: '/index/logs',
            isNew: false
          }
        ],
        isLogin: store.state.isLogin
      }
    }
  }
</script>

<style lang="scss" scoped></style>
