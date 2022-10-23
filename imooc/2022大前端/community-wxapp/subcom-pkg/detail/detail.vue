<template>
  <view class="detail" :class="{'ipx': ipxFlag}" v-show="page._id" @click.stop="showReply = false">
    <view class="header title">
      {{page.title}}
    </view>
    <view class="content">
      <view class="user u-flex">
        <u-image class="photo" :src="page.uid.pic" error-icon="/static/images/header.jpg" width="72" height="72" />
        <view class="user-column u-flex-1">
          <span class="name">{{page.uid.name}}</span>
          <span class="label">{{ page.created | moment }}</span>
        </view>
      </view>
      <parser :html="page.content">
      </parser>
      <!-- <highlight></highlight> -->
    </view>
    <view class="comments">
      <view class="title">评论</view>
      <view class="item" v-for="(item) in comments" :key="item._id">
        <view class="u-flex u-col-center">
          <view class="user u-flex-1">
            <u-image class="photo" :src="item.cuid.pic" error-icon="/static/images/header.jpg" width="72" height="72" />
            <view class="user-column u-flex-1">
              <span class="name">{{ item.cuid.name }}</span>
              <span class="label">{{ item.created | moment }} 回复了你</span>
            </view>
          </view>
          <view class="u-flex u-col-center add-hand">
            <view class="reply" :class="{'active': item.handed === '1'}" @click="hand(item)">
              <u-icon name="thumb-up-fill" size="30" v-if="item.handed === '1'"></u-icon>
              <u-icon name="thumb-up" size="30" v-else></u-icon>
              <text>{{item.hands}}</text>
            </view>
            <view v-if="isOwner">
              <view class="caina" v-if="item.isBest === '1'">
                <u-icon name="yicaina" custom-prefix="iconfont" size="70" color="#58a571"></u-icon>
              </view>
              <view class="setBest" v-else-if="parseInt(page.isEnd) === 0 && parseInt(item.isBest) === 0" @click="setBest(item)">
                <u-icon name="caina" custom-prefix="iconfont" size="32"></u-icon>
              </view>
            </view>
          </view>
        </view>
        <view class="comments-content">
          <parser :html="item.content"></parser>
        </view>
      </view>
      <view v-if="comments.length === 0">
        <view v-if="!loading" class="info">
          暂无评论，赶紧来抢沙发吧~~~
        </view>
        <view class="flex-center-center loading" v-else>
          <u-loading class="loading-icon" mode="circle"></u-loading>
          <text class="loading-text">加载中...</text>
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="box u-flex u-col-center" v-if="!showReply">
        <view class="add-comment" @click.stop="reply()">
          <u-icon name="edit-pen" size="32" color="#cccccc"></u-icon>
          <text class="text">写评论</text>
        </view>
        <view class="ctrls u-flex u-col-center u-row-between">
          <view class="comment u-flex flex-column">
            <u-icon name="chat" size="45"></u-icon>
            <text>评论{{ page.answer > 0 ? page.answer : ''}}</text>
          </view>
          <view class="fav u-flex flex-column" :class="{'active': page.isFav === 1}" @click="setCollect">
            <u-icon name="star-fill" size="45" v-if="page.isFav === 1"></u-icon>
            <u-icon name="star" size="45" v-else></u-icon>
            <text>{{page.isFav === 1 ? '已收藏': '收藏'}}</text>
          </view>
          <view class="like u-flex flex-column" :class="{'active': page.isHand === 1}" @click="handsPost">
            <u-icon name="thumb-up-fill" size="45" v-if="page.isHand === 1"></u-icon>
            <u-icon name="thumb-up" size="45" v-else></u-icon>
            <text>{{page.isHand === 1 ? '已点赞' : '点赞'}}</text>
          </view>
        </view>
      </view>
      <!-- fixed: 1.static/absolute 2.点击跳转新页面 3.cursor-spacing -->
      <view class="box u-flex u-col-center" v-else>
        <u-input v-model="content" class="reply" placeholder="请输入评论内容" focus @clear="clear" :cursor-spacing="10"></u-input>
        <button type="primary" plain size="mini" @click.stop="send">发送</button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { checkToken } from '@/common/checkAuth'
import formatHTML from '@/common/utils/formatHTML'

export default {
  components: {},
  data: () => ({
    page: {},
    comments: [],
    params: {
      page: 0,
      limit: 10,
      tid: ''
    },
    content: '',
    showReply: false,
    height: 0, // 记录屏幕高度与safeArea底部高度的差值
    paddingHeight: 60,
    loading: false,
    ipxFlag: false,
    keyboardHeight: 0
  }),
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['isLogin']),
    isCollect () {
      return typeof this.page.isFav !== 'undefined' && this.page.isFav === 1
    },
    isOwner () {
      let flag = false
      if (this.page.uid && typeof this.page.uid !== 'undefined' && typeof this.userInfo._id !== 'undefined') {
        flag = this.page.uid._id === this.userInfo._id
      }
      return flag
    }
    // showBest () {
    //   return this.page.uid && this.userInfo._id && this.page.uid === this.userInfo._id
    // }
  },
  methods: {
    check: checkToken,
    async getReply () {
      const { data } = await this.$u.api.getComents(this.params)
      let arr = data.reverse()
      // 转义
      arr = arr.map(o => ({ ...o, content: formatHTML(o.content) }))
      if (this.params.page === 0) {
        this.comments = arr
      } else {
        this.comments = [...this.comments, ...arr]
      }
      this.page.answer = this.comments.length || 0
    },
    async handsPost () {
      // 文章点赞
    },
    async hand (item) {
      // 评论点赞
      if (!this.check()) return
      const { msg, data, code } = await this.$u.api.setHands({ cid: item._id })
      if (code === 200 && data) {
        item.handed = '1'
        item.hands++
      } else {
        uni.showToast({
          icon: 'none',
          title: msg,
          duration: 2000
        })
      }
    },
    async setCollect () {
      // 设置收藏
      if (!this.check()) return
      const { msg, isCollect } = await this.$u.api.addCollect({ tid: this.params.tid, isFav: this.isCollect ? 1 : 0 })
      if (isCollect) {
        this.page.isFav = 1
      } else {
        this.page.isFav = 0
      }
      uni.showToast({
        icon: 'none',
        title: msg,
        duration: 2000
      })
    },
    reply () {
      // if (!this.check()) return
      this.showReply = true
    },
    async send () {
      // 微信评论
    },
    setBest (item) {
      // 设置最佳
    },
    onShareAppMessage () {
      // 微信分享 -> 这个分享单一的好友
      return {
        title: this.page.title,
        path: '/subcom-pkg/detail/detail?tid=' + this.params.tid
      }
    }
  },
  watch: {},
  // 页面周期函数--监听页面加载
  async onLoad (options) {
    // uni.onKeyboardHeightChange(res => {
    //   if (res.height > 0) {
    //     this.keyboardHeight = this.height + 20
    //   } else {
    //     this.keyboardHeight = 0
    //   }
    // })
    this.loading = true
    // 获取系统信息 判断机型
    const info = uni.getSystemInfoSync()
    this.height = info.screenHeight - info.safeArea.bottom
    if (this.height > 0) this.ipxFlag = true
    const { tid } = options
    this.params.tid = tid
    const { data } = await this.$u.api.getDetail({ tid })
    this.page = data
    this.page.content = formatHTML(this.page.content)
    await this.getReply()
    this.loading = false
  },
  // 页面周期函数--监听页面初次渲染完成
  onPullDownRefresh () {
    uni.stopPullDownRefresh()
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom () {}
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
}
</script>

<style lang="scss">
.detail {
  background: #f4f6f8;
  height: 100vh;
  &.ipx {
    .comments,
    .footer {
      padding-bottom: constant(safe-area-inset-bottom); // 兼容iOS < 11.2
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
}

.header,
.content,
.comments {
  background: #fff;
  padding: 32rpx;
}

.header,
.content {
  margin-bottom: 24rpx;
  box-shadow: 0 5rpx 5px rgba($color: black, $alpha: 0.1);
}

.add-hand {
  position: relative;
  .caina {
    position: absolute;
    right: 100rpx;
    top: -20rpx;
  }
  .setBest {
    padding-left: 25rpx;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 10px 32rpx;
  background-color: #fff;
  // height: 100rpx;
  box-shadow: 0 -5rpx 5px rgba($color: black, $alpha: 0.1);
  .box {
    width: 100%;
  }
  .reply {
    flex: 1;
    border: 1px solid #eee;
    padding: 0 15rpx;
    margin-right: 15rpx;
  }
}

.title {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

.user {
  display: flex;
  align-items: center; /* 垂直居中 */
  margin-right: 20rpx;
  .name {
    margin-bottom: 10rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    white-space: nowrap;
    max-width: 420rpx;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .photo {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
  }
  .user-column {
    display: flex;
    flex-direction: column;
    margin-left: 20rpx;
  }
  .label {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
}

.comments {
  .item {
    padding: 24rpx 0;
    .comments-content {
      padding-top: 32rpx;
    }
    .reply {
      text {
        padding-left: 10rpx;
      }
      &.active {
        color: $u-type-primary;
      }
    }
  }
  .info {
    font-size: 28rpx;
    color: #666;
    line-height: 90rpx;
    text-align: center;
  }
}

.ctrls {
  color: #999;
  font-size: 22rpx;
  width: 35%;
  .fav,
  .like {
    &.active {
      color: $u-type-primary;
    }
  }
}

.add-comment {
  background: #f3f3f3;
  height: 64rpx;
  border-radius: 32rpx;
  line-height: 64rpx;
  padding: 0 32rpx;
  width: 65%;
  margin-right: 40rpx;
  color: #ccc;
  .text {
    padding-left: 10rpx;
  }
}

.loading {
  height: 50px;
  .loading-text {
    padding-left: 15rpx;
  }
}

.layui-elem-quote {
  margin-bottom: 10rpx;
  padding: 15rpx;
  line-height: 14px;
  border-left: 2px solid #009688;
  border-radius: 0 2px 2px 0;
  background-color: #f2f2f2;
}
</style>
