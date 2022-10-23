<template>
  <div>
    <imooc-panel></imooc-panel>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Panel from '@/components/Panel.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    components: {
      'imooc-panel': Panel
    }
  })
</script>

<style lang="scss" scoped></style>
