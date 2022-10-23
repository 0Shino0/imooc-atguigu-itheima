<template>
  <view class="highlight">
    <scroll-view scroll-x>
      <view v-for="(line,i) in tokenLines" :key="i" class="lines">
        <!-- 行数 -->
        <text class="line-number">{{i+1}}</text>
        <!-- 代码块 -->
        <text v-for="(token,index) in line" :key="index" :class="'token--' + token.type">{{token.content}}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import Prism from 'prismjs'
import normalize from '@/common/utils/normalize'

// const code = `
// <template>
//   <view class="list-item">
//     <view class="list-head">
//       <!-- 标题部分 -->
//       <text class="type" :class="['type-'+item.catalog]">{{tabs.filter(o => o.key === item.catalog)[0].value}}</text>
//       <text class="title">{{item.title}}</text>
//     </view>
//     <!-- 用户部分 -->
//     <view class="author u-flex u-m-b-18">
//       <u-image :src="item.uid.pic" class="head" width="40" height="40" shape="circle" error-icon="/static/images/header.jpg"></u-image>
//       <text class="name u-m-l-10">{{item.uid.name}}</text>
//     </view>
//     <!-- 摘要部分 + 右侧的图片 -->
//     <view class="list-body u-m-b-30 u-flex u-col-top">
//       <view class="info u-m-r-20 u-flex-1">{{item.content}}</view>
//       <image class="fmt" :src="item.snapshot" v-if="item.snapshot" mode="aspectFill" />
//     </view>
//     <!-- 回复 + 文章发表的时间 -->
//     <view class="list-footer u-flex">
//       <view class="left">
//         <text class="reply-num u-m-r-25">{{item.answer}} 回复</text>
//         <text class="timer">{{item.created | moment}}</text>
//       </view>
//     </view>
//   </view>
// </template>
// `
export default {
  props: {
    code: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'js'
    }
  },
  data: () => ({
  }),
  computed: {
    tokenLines () {
      const result = normalize(Prism.tokenize(this.code, Prism.languages[this.language]))
      // console.log('🚀 ~ file: highlight.vue ~ line 54 ~ tokenLines ~ result', result)
      return result
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.intro {
  margin: 30px;
  text-align: center;
}

:host {
  text-align: left;
  font-family: consolas, monospace;
  line-height: 1.44;
  white-space: nowrap;
}

.lines {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
}

.line-number {
  display: inline-block;
  flex-shrink: 0;
  border-right: 4px solid #d8d8d8;
  min-width: 55px;
  text-align: right;
  margin-right: 10px;
  padding-right: 10px;
  color: #888;
  &.max {
    width: 110px;
  }
}

.token {
  color: #333;
  white-space: pre;
}

.token--plain,
.token--string {
  white-space: pre;
}

.token--keyword {
  color: #00f;
}

.token--number {
  color: #09885a;
}

.token--string {
  color: #a31515;
}

.token--regex {
  color: #811f3f;
}

.token--comment {
  color: #008000;
}
</style>
