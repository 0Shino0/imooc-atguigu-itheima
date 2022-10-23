<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) in lists" :key="'hotlist' + index">
        <router-link :to="{name: 'detail', params: {tid: item._id}}">{{item.title}}</router-link>
        <span>
          <i class="iconfont icon-pinglun1"></i>
          {{item.answer}}
        </span>
      </dd>
      <!-- 无数据时 -->
      <!--
        <div class="fly-none">没有相关数据</div>
      -->
    </dl>
  </div>
</template>

<script>
import { getTop } from '@/api/content'
export default {
  name: 'hotlist',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTop().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
