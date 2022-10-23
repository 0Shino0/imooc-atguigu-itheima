<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a :class="{ 'layui-this': state.status === '' && state.tag === '' }" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': state.status === '0' }" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': state.status === '1' }" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': state.status === '' && state.tag === '精华' }" @click.prevent="search(2)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{ 'layui-this': state.sort === 'created' }" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{ 'layui-this': state.sort === 'answer' }" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <list-item :lists="state.lists" :isEnd="state.isEnd" @nextpage="nextPage()"></list-item>
  </div>
</template>

<script lang="ts">
import ListItem from './ListItem.vue'
// import listMix from '@/mixin/list'
import { defineComponent, onMounted, toRef, watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { ListService } from '@/services/list'
export default defineComponent({
  name: 'list',
  components: {
    'list-item': ListItem
  },
  setup () {
    const { state, handleGetList, init, nextPage, search } = ListService()

    onBeforeRouteUpdate(async () => {
      init()
    })

    onMounted(() => {
      handleGetList()
    })

    const current = toRef(state, 'current')
    watch(current, init)

    return {
      state,
      search,
      nextPage
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
