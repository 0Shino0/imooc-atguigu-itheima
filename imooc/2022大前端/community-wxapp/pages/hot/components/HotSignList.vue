<template>
  <view>
    <view class="list" v-for="(item, index) in lists" :key="index">
      <!-- 签到 -->
      <view
        class="list-item"
        v-if="item.count && item.count > 0"
        @click="gotoDetail(item)"
      >
        <view class="num first" v-if="index === 0">01</view>
        <view class="num second" v-else-if="index === 1">02</view>
        <view class="num third" v-else-if="index === 2">03</view>
        <view class="num common" v-else-if="index < 9">{{
          '0' + (index + 1)
        }}</view>
        <view class="num common" v-else-if="index < 50 && index >= 9">{{
          index + 1
        }}</view>
        <view class="num" v-else></view>
        <u-image
          width="88"
          height="88"
          class="user"
          :src="parseInt(type) === 0 ? item.pic : item.uid.pic"
          mode="aspectFit"
          shape="circle"
          error-icon="/static/images/header.jpg"
        />
        <view class="column no-between">
          <view class="title">{{
            (item.uid ? item.uid.name : item.name) || 'imooc'
          }}</view>
          <view class="read" v-if="parseInt(type) === 0">
            已经连续签到
            <span>{{ item.count }}</span> 天
          </view>
          <view class="read" v-else>{{ item.created | hours }}</view>
        </view>
      </view>
      <view class="list-item" v-else>
        <view class="num first" v-if="index === 0">01</view>
        <view class="num second" v-else-if="index === 1">02</view>
        <view class="num third" v-else-if="index === 2">03</view>
        <view class="num common" v-else-if="index < 9">{{
          '0' + (index + 1)
        }}</view>
        <view class="num common" v-else-if="index < 50 && index >= 9">{{
          index + 1
        }}</view>
        <view class="num" v-else></view>
        <u-image
          width="88"
          height="88"
          class="user"
          :src="parseInt(type) === 0 ? item.pic : item.uid.pic"
          mode="aspectFit"
          shape="circle"
          error-icon="/static/images/header.jpg"
        />
        <view class="column no-between">
          <view class="title">{{ item.uid ? item.uid.name : 'imooc' }}</view>
          <view class="read">
            今日签到时间<span class="text">{{ item.created | hours }}</span>
          </view>
          <!-- <view class="read" v-else>{{item.created | hours}}</view> -->
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
.text {
  padding-left: 15rpx;
}
</style>
