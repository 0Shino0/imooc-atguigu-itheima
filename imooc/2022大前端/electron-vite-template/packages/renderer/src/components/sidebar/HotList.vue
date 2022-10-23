<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) in state.lists" :key="'hotlist' + index">
        <!-- todo -->
        <a :to="{ name: 'detail', params: { tid: item._id } }">{{ item.title }}</a>
        <span>
          <i class="iconfont icon-pinglun1"></i>
          {{ item.answer }}
        </span>
      </dd>
      <!-- 无数据时 -->
      <!--
        <div class="fly-none">没有相关数据</div>
      -->
    </dl>
  </div>
</template>

<script lang="ts">
  import { getTop } from '@/api/content'
  import type { HttpResponse } from '@/common/interface'
  import { defineComponent, onMounted, reactive } from 'vue'
  export default defineComponent({
    name: 'HotlistComponent',
    setup() {
      const state = reactive({
        lists: [] as Array<{ answer: number; _id: string; title: string }>
      })

      onMounted(async () => {
        const res = await getTop()
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

<style lang="scss" scoped></style>
