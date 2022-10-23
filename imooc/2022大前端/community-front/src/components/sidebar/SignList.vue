<template>
  <div class="modal" v-show="isShow">
    <div class="mask" @click="close()"></div>
    <div class="layui-layer layui-layer-page" :class="{'active': isShow}">
      <div class="layui-layer-title">
        签到活跃榜 - TOP
        <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li :class="{'layui-this': current === 2 }" @click="choose(2)">最新签到</li>
            <li :class="{'layui-this': current === 1 }" @click="choose(1)">今日最快</li>
            <li :class="{'layui-this': current === 0 }" @click="choose(0)">总签到榜</li>
          </ul>
          <div class="layui-tab-content fly-signin-list">
            <ul class="layui-tab-item layui-show">
              <li class="sign-item" v-for="(item,index) in lists" :key="'sign' + index">
                <img
                  v-if="current===0"
                  :src="item.pic ? item.pic : '/img/bear-200-200.jpg'"
                  alt
                  class="mr1"
                />
                <img v-else :src="item.uid ? item.uid.pic : '/img/bear-200-200.jpg'" class="mr1" />
                <cite class="fly-link">{{item.name ? item.name : item.uid.name}}</cite>
                <span class="fly-grey" v-if="current !== 0">签到于 {{item.created | hours}}</span>
                <span class="fly-grey" v-else>
                  已经连续签到
                  <i class="orange">{{item.count}}</i>天
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotSignRecord } from '@/api/hot'
export default {
  name: 'sign-list',
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      current: 0,
      lists: [],
      limit: 20,
      page: 0
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    choose (val) {
      this.current = val
      this.getList()
      // 请求后台拉取数据
    },
    close () {
      this.$emit('closeModal')
    },
    getList () {
      getHotSignRecord({
        page: this.page,
        limit: this.limit,
        index: this.current
      }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
        }
      })
    }
  }
}
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
