<template>
  <view class="list-item">
    <view class="list-head">
      <!-- 标题部分 -->
      <text class="type" :class="['type-'+item.catalog]">{{tabs.filter(o => o.key === item.catalog)[0].value}}</text>
      <text class="title">{{item.title}}</text>
    </view>
    <!-- 用户部分 -->
    <view class="author u-flex u-m-b-18">
      <u-image :src="item.uid.pic" class="head" width="40" height="40" shape="circle" error-icon="/static/images/header.jpg"></u-image>
      <text class="name u-m-l-10">{{item.uid.name}}</text>
    </view>
    <!-- 摘要部分 + 右侧的图片 -->
    <view class="list-body u-m-b-30 u-flex u-col-top">
      <view class="info u-m-r-20 u-flex-1">{{item.content}}</view>
      <image class="fmt" :src="item.snapshot" v-if="item.snapshot" mode="aspectFill" />
    </view>
    <!-- 回复 + 文章发表的时间 -->
    <view class="list-footer u-flex">
      <view class="left">
        <text class="reply-num u-m-r-25">{{item.answer}} 回复</text>
        <text class="timer">{{item.created | moment}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { tabs } from '@/config/const'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    tabs
  })
}
</script>

<style lang="scss" scoped>
.list-item {
  background: #fff;
  margin-top: 20rpx;
  padding: 30rpx;
}

.list-head {
  margin-bottom: 18rpx;
  .type {
    display: inline-block;
    height: 36rpx;
    width: 72rpx;
    text-align: center;
    line-height: 36rpx;
    white-space: nowrap;
    margin-right: 10rpx;
    font-size: 24rpx;
    border-radius: 18rpx;
    border-bottom-left-radius: 0;
    color: #fff;
    background-color: red;
    position: relative;
    top: -4rpx;
    transform: scale(0.9);
  }
  .type-share {
    background-color: #feb21e;
  }
  .type-ask {
    background-color: #02d199;
  }
  .type-discuss {
    background-color: #fe1e1e;
  }
  .type-advise {
    background-color: #0166f8;
  }
  .type-notice {
    background-color: #00a3b8;
  }
  .type-logs {
    background-color: #33cb61;
  }
  .title {
    color: #333;
    font-size: 32rpx;
    line-height: 44rpx;
    font-weight: bold;
  }
}

.author {
  color: #666;
  font-size: 24rpx;
}

.list-body {
  .info {
    font-size: 28rpx;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .fmt {
    width: 192rpx;
    height: 122rpx;
    border-radius: 8rpx;
    flex-shrink: 0;
  }
}

.list-footer {
  color: #999;
  font-size: 24rpx;
}
</style>
