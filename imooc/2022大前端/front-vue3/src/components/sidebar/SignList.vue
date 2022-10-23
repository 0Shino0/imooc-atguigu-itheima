<template>
  <div class="modal" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="layui-layer layui-layer-page" :class="{ active: isShow }">
      <div class="layui-layer-title">
        签到活跃榜 - TOP
        <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li
              :class="{ 'layui-this': state.current === 2 }"
              @click="choose(2)"
            >
              最新签到
            </li>
            <li
              :class="{ 'layui-this': state.current === 1 }"
              @click="choose(1)"
            >
              今日最快
            </li>
            <li
              :class="{ 'layui-this': state.current === 0 }"
              @click="choose(0)"
            >
              总签到榜
            </li>
          </ul>
          <div class="layui-tab-content fly-signin-list">
            <ul class="layui-tab-item layui-show">
              <li
                class="sign-item"
                v-for="(item, index) in state.lists"
                :key="'sign' + index"
              >
                <img
                  v-if="state.current === 0"
                  :src="item.pic ? item.pic : '/img/bear-200-200.jpg'"
                  alt
                  class="mr1"
                />
                <img
                  v-else
                  :src="item.uid ? item.uid.pic : '/img/bear-200-200.jpg'"
                  class="mr1"
                />
                <cite class="fly-link">{{
                  item.name ? item.name : item.uid.name
                }}</cite>
                <span class="fly-grey" v-if="state.current !== 0"
                  >签到于 {{ hours(item.created) }}</span
                >
                <span class="fly-grey" v-else>
                  已经连续签到
                  <i class="orange">{{ item.count }}</i
                  >天
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getHotSignRecord } from '@/api/hot'
import { HttpResponse } from '@/common/interface'
import { hours } from '@/utils/formatDate'
import { reactive, onMounted, defineComponent } from 'vue'

export default defineComponent({
  name: 'sign-list',
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  setup (props, { emit }) {
    const state = reactive({
      current: 0,
      lists: [],
      limit: 20,
      page: 0
    })

    const getList = async () => {
      const res = await getHotSignRecord({
        page: state.page,
        limit: state.limit,
        index: state.current
      })
      const { code, data } = res as HttpResponse

      if (code === 200) {
        state.lists = data
      }
    }

    const choose = (val: number) => {
      state.current = val
      getList()
      // 请求后台拉取数据
    }

    const close = () => {
      emit('close-modal')
    }

    onMounted(() => getList())

    return {
      state,
      close,
      hours,
      choose
    }
  }
})
</script>

<style lang="scss" scoped>
.sign-item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.fly-link {
  flex: 1;
  display: inline-block;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
