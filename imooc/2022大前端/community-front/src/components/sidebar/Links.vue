<template>
  <div class="fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main">
      <dd v-for="(item,index) in lists" :key="'links' + index">
        <a :href="item.link" target="_blank">{{item.title}}</a>
      </dd>
      <dd></dd>
      <dd>
        <a
          href="mailto:brian@toimc.com?subject=%E7%94%B3%E8%AF%B7Fly%E7%A4%BE%E5%8C%BA%E5%8F%8B%E9%93%BE"
          class="fly-link"
        >申请友链</a>
      </dd>
      <dd></dd>
    </dl>
  </div>
</template>

<script>
import { getLinks } from '@/api/content'
export default {
  name: 'links',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getLinks().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
