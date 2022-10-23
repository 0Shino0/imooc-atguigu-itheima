<template>
  <div v-show="state.lists.length > 0" class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        id="LAY_goSignin"
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        style="color: #ff5722"
        >去签到</a
      >
    </div>
    <list-item :lists="state.lists" :is-show="false"></list-item>
  </div>
</template>

<script lang="ts">
  import { ListService } from '@/services/list'
  import ListItem from '@/components/contents/ListItem.vue'
  import { defineComponent, onMounted } from 'vue'
  export default defineComponent({
    name: 'TopComponent',
    components: {
      ListItem
    },
    setup() {
      const { state, handleGetList } = ListService()

      state.isTop = 1

      onMounted(() => {
        handleGetList()
      })

      return {
        state
      }
    }
  })
</script>

<style lang="scss" scoped></style>
