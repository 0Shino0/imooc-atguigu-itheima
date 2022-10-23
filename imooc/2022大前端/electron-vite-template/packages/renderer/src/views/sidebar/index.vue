<template>
  <div>
    <imooc-tips></imooc-tips>
    <imooc-sign></imooc-sign>
    <imooc-hotlist></imooc-hotlist>
    <imooc-ads></imooc-ads>
    <imooc-links></imooc-links>
  </div>
</template>

<script lang="ts">
  import Tips from '@/components/sidebar/Tips.vue'
  import Sign from '@/components/sidebar/Sign.vue'
  import HotList from '@/components/sidebar/HotList.vue'
  import Ads from '@/components/sidebar/Ads.vue'
  import Links from '@/components/sidebar/Links.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MainSideBar',
    components: {
      'imooc-tips': Tips,
      'imooc-sign': Sign,
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
