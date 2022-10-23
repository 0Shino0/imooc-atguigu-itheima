<template>
  <div class="fly-panel" v-show="state.lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #ff5722">去签到</a>
    </div>
    <list-item :lists="state.lists" :isShow="false"></list-item>
  </div>
</template>

<script lang="ts">
import { ListService } from '@/services/list'
import ListItem from '@/components/contents/ListItem.vue'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'top',
  setup () {
    const { state, handleGetList } = ListService()

    state.isTop = 1

    onMounted(() => {
      handleGetList()
    })

    return {
      state
    }
  },
  components: {
    ListItem
  }
})
</script>

<style lang="scss" scoped>
</style>
