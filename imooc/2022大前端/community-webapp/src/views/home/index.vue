<template>
  <div>
    <layout>
      <search></search>
      <tabs></tabs>
      <router-view></router-view>
    </layout>
  </div>
</template>

<script>
import Tabs from './tabs'
export default {
  name: 'Home',
  components: {
    Tabs
  }
}
</script>

<style lang="scss" scoped>
</style>
