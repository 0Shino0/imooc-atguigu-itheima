<template>
  <div>
    <ul class="tab" ref="tabs">
      <router-link
        class="item"
        :to="item.path"
        :key="'home-tabs-' + index"
        v-for="(item,index) in tabs"
        exact-active-class="active"
      >
        <span class="txt">{{item.name}}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  data () {
    return {
      tabs: [
        { name: '首页', path: '/index' },
        { name: '提问', path: '/index/ask' },
        { name: '建议', path: '/index/advise' },
        { name: '分享', path: '/index/share' },
        { name: '讨论', path: '/index/discuss' }
      ]
    }
  },
  mounted () {
    const elem = this.$refs.tabs
    window.forbidScroll(elem)
  }
}
</script>

<style lang="scss" scoped>
@import './tabs.scss';
</style>
