<template>
  <div>
    <ul class="layout-footer" ref="footer">
      <router-link
        v-for="(tab, index) in tabs"
        :key="'tabs-' + index"
        :to="tab.path"
        class="item"
        active-class="active"
      >
        <svg-icon :icon="tab.icon" :class="['svg-icon-'+ tab.icon]"></svg-icon>
        <p>{{tab.name}}</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'my-footer',
  data () {
    return {
      tabs: [
        { name: '首页', icon: 'home', path: '/index' },
        { name: '消息', icon: 'msg', path: '/msg/reply' },
        { name: '热门', icon: 'type', path: '/hot' },
        { name: '我的', icon: 'person', path: '/user' }
      ]
    }
  },
  mounted () {
    const elem = this.$refs.footer
    window.forbidScroll(elem)
  }
}
</script>

<style lang="scss" scoped>
@import './footer.scss';
</style>
