
<template>
  <div>
    <imooc-panel></imooc-panel>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  name: 'home',
  components: {
    'imooc-panel': Panel
  }
}
</script>

<style lang="scss" scoped>
</style>
