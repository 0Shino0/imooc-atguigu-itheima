<template>
  <view>
    <view class="list" v-for="(item,index) in lists" :key="index">
      <view class="list-item" @click="gotoDetail(item)">
        <view class="num first" v-if="index === 0">01</view>
        <view class="num second" v-else-if="index === 1">02</view>
        <view class="num third" v-else-if="index === 2">03</view>
        <view class="num common" v-else-if="index < 9">{{ '0' + (index+1) }}</view>
        <view class="num common" v-else-if="index < 50 && index >=9">{{ index+1 }}</view>
        <view class="num" v-else></view>
        <view class="column">
          <view class="title">{{item.title}}</view>
          <view class="read">{{parseInt(item.answer) > 1000?parseInt(item.answer/1000).toFixed(1) + 'k': item.answer}} 评论</view>
        </view>
        <view class="img" v-if="item.shotpic">
          <image :src="item.shotpic" mode="aspectFill" />
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
