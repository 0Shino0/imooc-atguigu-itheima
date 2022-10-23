<template>
  <div>
    <imooc-hotlist></imooc-hotlist>
    <imooc-ads></imooc-ads>
    <imooc-links></imooc-links>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import HotList from '@/components/sidebar/HotList.vue'
  import Ads from '@/components/sidebar/Ads.vue'
  import Links from '@/components/sidebar/Links.vue'

  export default defineComponent({
    components: {
      'imooc-hotlist': HotList,
      'imooc-ads': Ads,
      'imooc-links': Links
    },
    setup() {
      return {}
    }
  })
</script>

<style scoped></style>
