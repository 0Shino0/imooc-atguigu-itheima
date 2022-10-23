<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main layui-row">
      <ul class="layui-clear imooc-quick">
        <li class="layui-col-xs6" v-for="(item,index) in state.lists" :key="'tips' + index">
          <a :href="item.link" target="_blank">{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { getTips } from '@/api/content'
import { HttpResponse } from '@/common/interface'
import { defineComponent, onMounted, reactive } from 'vue'
export default defineComponent({
  name: 'tips',
  setup () {
    const state = reactive({
      lists: []
    })

    onMounted(async () => {
      const res = await getTips()
      const { code } = res as HttpResponse
      if (code === 200) {
        state.lists = res.data
      }
    })

    return {
      state
    }
  }
})
</script>

<style lang="scss" scoped>
$border-color: #f2f2f2;
.fly-panel-main {
  padding: 15px;
}
.imooc-quick {
  border: 1px solid $border-color;
  border-bottom: none;
  border-right: none;
  .layui-col-xs6 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid $border-color;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-left: none;
    border-top: none;
    a {
      display: block;
    }
  }
}
</style>
