<template>
  <view>
    <view class="list" v-for="(item,index) in lists" :key="index">
      <!-- 评论 -->
      <view class="list-item" @click="gotoDetail(item)">
        <view class="num first" v-if="index === 0">01</view>
        <view class="num second" v-else-if="index === 1">02</view>
        <view class="num third" v-else-if="index === 2">03</view>
        <view class="num common" v-else-if="index < 9">{{ '0' + (index+1) }}</view>
        <view class="num common" v-else-if="index < 50 && index >=9">{{ index+1 }}</view>
        <view class="num" v-else></view>
        <u-image width="88" height="88" class="user" :src="item.cuid? item.cuid.pic : ''" mode="aspectFit" shape="circle" error-icon="/static/images/header.jpg" />
        <view class="column no-between">
          <view class="title">{{item.cuid && item.cuid.name? item.cuid.name : 'imooc'}}</view>
          <view class="read" v-if="parseInt(type) === 0">
            <text>{{item.count}}</text> 条评论
          </view>
          <view class="read" v-else>{{item.created | moment}} 发表了评论</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    type: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    gotoDetail (item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
