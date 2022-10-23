<template>
  <view>
    <u-sticky>
      <view class="tabs box-shadow">
        <u-tabs :list="tabs" :name="'value'" :current="current" @change="tabsChange" :is-scroll="false" active-color="#02D199" inactive-color="#666" height="88"></u-tabs>
      </view>
    </u-sticky>
    <view class="content">
      <view class="tags">
        <uni-tag :text="item.value" v-for="(item, i) in types[tabs[current].key]" :class="{ active: tagCur === i }" :key="i" @click="tagsChange(i)"></uni-tag>
      </view>
      <HotPostList :lists="lists" v-if="tabs[current].key === 'posts'" @click="postDetail"></HotPostList>
      <HotCommentsList :lists="lists" :type="types.comments[tagCur].key" v-else-if="tabs[current].key === 'comments'" @click="commentDetail"></HotCommentsList>
      <HotSignList :lists="lists" :type="types.sign[tagCur].key" v-else></HotSignList>
    </view>
    <view class="bottom-line"></view>
  </view>
</template>

<script>
import HotPostList from './components/HotPostList'
import HotCommentsList from './components/HotCommentsList'
import HotSignList from './components/HotSignList'

export default {
  components: {
    HotPostList,
    HotCommentsList,
    HotSignList
  },
  data: () => ({
    tabs: [
      {
        key: 'posts',
        value: '热门帖子'
      },
      {
        key: 'comments',
        value: '热门评论'
      },
      {
        key: 'sign',
        value: '签到排行'
      }
    ],
    types: {
      posts: [
        {
          key: '3',
          value: '全部'
        },
        {
          key: '0',
          value: '3日内'
        },
        {
          key: '1',
          value: '7日内'
        },
        {
          key: '2',
          value: '30日内'
        }
      ],
      comments: [
        {
          key: '1',
          value: '最新评论'
        },
        {
          key: '0',
          value: '热门评论'
        }
      ],
      sign: [
        {
          key: '0',
          value: '总签到榜'
        },
        {
          key: '1',
          value: '今日签到榜'
        }
      ]
    },
    current: 0,
    tagCur: 0,
    lists: [
    ],
    page: {
      page: 0,
      limit: 50
    }
  }),
  onLoad (options) {
    const { scene } = options
    if (scene) {
      this.tabsChange(scene)
    } else {
      this.getHotPost()
    }
  },
  onShow () {
    this.hanldeChange()
  },
  methods: {
    async getHotPost () {
      const { data } = await this.$u.api.getHotPost({
        ...this.page,
        index: this.types.posts[this.tagCur].key
      })
      this.lists = data
    },
    async getHotComments () {
      const { data } = await this.$u.api.getHotComments({
        ...this.page,
        index: this.types.comments[this.tagCur].key
      })
      this.lists = data
    },
    async getHotSignRecord () {
      const { data } = await this.$u.api.getHotSignRecord({
        ...this.page,
        index: this.types.sign[this.tagCur].key
      })
      this.lists = data
    },
    tabsChange (value) {
      this.current = value
      this.tagCur = 0
      this.page = {
        page: 0,
        limit: 50
      }
      this.hanldeChange()
    },
    tagsChange (value) {
      this.tagCur = value
      this.page = {
        page: 0,
        limit: 50
      }
      this.hanldeChange()
    },
    hanldeChange () {
      if (this.current === 0) {
        // 热门帖子
        this.getHotPost()
      } else if (this.current === 1) {
        // 热门评论
        this.getHotComments()
      } else {
        // 签到排行
        this.getHotSignRecord()
      }
    },
    // 跳转文章详情
    postDetail (item) {
      uni.navigateTo({
        url: '/subcom-pkg/detail/detail?tid=' + item._id
      })
    },
    // 评论详情
    commentDetail (item) {
      uni.navigateTo({
        url: `/subcom-pkg/detail/detail?tid=${item.tid}&cid=${item._id}`
      })
    }
  },
  async onPullDownRefresh () {
    this.hanldeChange()
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

<style lang="scss" scoped>
.tags {
  display: flex;
  padding: 20rpx 25rpx;
  width: 100vw;
  background-color: #fff;
  z-index: 200;
  ::v-deep .uni-tag {
    // margin-top: 20rpx;
    margin-right: 25rpx;
    border-radius: 25rpx;
    text {
      color: #999;
      white-space: nowrap;
      font-size: 26rpx;
    }
  }
  .active {
    ::v-deep .uni-tag {
      background-color: #d6f8ef;
      text {
        color: #02d199;
        font-weight: bold;
      }
    }
  }
}

::v-deep .list {
  z-index: 100;
  padding: 0 30rpx 60rpx 30rpx;
  .list-item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }
  .num {
    font-size: 36rpx;
    font-weight: bold;
    &.first {
      color: #ed745e;
    }
    &.second {
      color: #e08435;
    }
    &.third {
      color: #f1ae37;
    }
    &.common {
      color: #999;
    }
  }
  .user {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    margin-left: 20rpx;
  }
  .column {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    height: 186rpx;
    padding: 30rpx 24rpx;

    &.no-between {
      justify-content: center;
      .title {
        padding-bottom: 16rpx;
      }
    }
    .title {
      color: #333;
      font-size: 32rpx;
      font-weight: bold;
    }
    .read {
      font-size: 26rpx;
      color: #999;
      text {
        color: #333;
        font-weight: bold;
        padding-right: 10rpx;
      }
    }
  }
  .img {
    width: 200rpx;
    height: 125rpx;
    border-radius: 12rpx;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
