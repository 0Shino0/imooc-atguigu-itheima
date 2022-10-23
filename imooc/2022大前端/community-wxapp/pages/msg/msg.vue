<template>
  <view class="msg">
    <view class="msg" v-if="isLogin">
      <u-sticky>
        <view class="tabs box-shadow">
          <!-- tabs -->
          <u-tabs :list="tabs" :name="'value'" :is-scroll="false" active-color="#02D199" inactive-color="#666" height="88" @change="tabsChange" :current="current"></u-tabs>
        </view>
      </u-sticky>
      <view>
        <!-- 评论列表 -->
        <view v-if="current === 0">
          <view v-for="(item, index) in comments" :key="index">
            <view class="box">
              <!-- 评论用户卡片 -->
              <view class="user u-flex">
                <u-image class="phone" :src="item.cuid.pic" width="72" height="72" shape="circle" error-icon="/static/images/header.jpg"></u-image>
                <view class="user-column u-flex-1 u-flex flex-column u-col-top">
                  <text class="name">{{ item.cuid.name }}</text>
                  <text class="label">{{ item.created | moment }} 回复了你</text>
                </view>
                <view class="reply u-flex u-row-center">
                  <image src="/static/images/advice.png" mode="aspectFit" />
                  回复
                </view>
              </view>
              <!-- 评论内容 -->
              <view class="comment">{{ item.content }}</view>
              <view class="post">
                <view>
                  <!-- 封面图 -->
                  <view v-if="item.tid.shotpic">
                    <view class="img">
                      <u-image :src="item.tid.shotpic" width="192" height="122"></u-image>
                    </view>
                  </view>
                  <!-- 文章标题 + 摘要 -->
                  <view class="post-content u-flex flex-column u-col-top">
                    <text class="title">{{ item.tid.title }}</text>
                    <text class="content">{{ item.tid.content }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 点赞列表 -->
        <view v-else>
          <view v-for="(item, index) in handUsers" :key="index">
            <view class="box">
              <view class="user u-flex">
                <u-image class="pic" :src="item.huid.pic" width="72" height="72" shape="circle" error-icon="/static/images/header.jpg" />
                <view class="user-column u-flex-1 u-flex flex-column u-col-top">
                  <span class="name">{{ item.huid.name }}</span>
                  <span class="label">{{ item.created | moment }}</span>
                </view>
              </view>
            </view>
            <view class="comment">赞了你的评论 {{item.cid.content}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="info u-flex u-row-center u-col-center flex-column" v-else>
      <view class="center">
        登录过后查看评论&点赞消息
      </view>
      <u-button type="primary" hover-class="none" @click="navTo">去登录</u-button>
    </view>
    <view class="bottom-line"></view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkAuth } from '@/common/checkAuth'
export default {
  props: {},
  data: () => ({
    current: 0,
    tabs: [
      {
        key: 'comments',
        value: '评论'
      },
      {
        key: 'like',
        value: '点赞'
      }
    ],
    comments: [
    ],
    handUsers: [
    ],
    pageMsg: {
      page: 0,
      limit: 10
    },
    pageHands: {
      page: 0,
      limit: 10
    }
  }),
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    navTo () {
      uni.navigateTo({
        url: '/subcom-pkg/auth/auth'
      })
    },
    tabsChange (i) {
      this.current = i
      this.$store.commit('setType', i === 0 ? 'comment' : 'hands')
      this.checkType()
    },
    async getMsg () {
      const { data, code } = await this.$u.api.getMsg(this.pageMsg)
      if (code === 200) {
        this.comments = data
      }
    },
    async getHands () {
      const { data, code } = await this.$u.api.getHands(this.pageHands)
      if (code === 200) {
        this.handUsers = data
      }
    },
    async checkType () {
      if (!this.isLogin) return
      const flag = await checkAuth()
      if (!flag) {
        return
      }
      if (this.$store.state.type === 'hands') {
        // 这里肯定已经登录
        this.current = 1
        this.getHands()
      } else {
        this.current = 0
        this.getMsg()
      }
    }
  },
  watch: {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow () {
    this.checkType()
  },
  // 页面周期函数--监听页面隐藏
  onHide () {
    this.current = 0
  }
}
</script>

<style lang="scss" scoped>
.flex-column {
  flex-flow: column nowrap;
}

.info {
  flex-flow: column nowrap;
  height: 100vh;
  width: 100vw;
  .center {
    color: #666;
    font-size: 32rpx;
    line-height: 50px;
  }
}
.user {
  margin: 20rpx;
  .name {
    margin-block: 20rpx;
    margin-bottom: 10rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  .phone {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
  }
  .user-column {
    margin-left: 20rpx;
  }
  .label {
    font-size: 22rpx;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
}

.reply {
  color: rgba(153, 153, 153, 1);
  margin-right: 40rpx;
  font-size: 24rpx;
  font-weight: 500;
  line-height: 40rpx;
  image {
    width: 30rpx;
    height: 30rpx;
    margin-right: 10rpx;
  }
}

.comment {
  margin: 0 20rpx 20rpx;
}

.post {
  margin: 0 20rpx 20rpx;
  padding: 20rpx;
  background-color: #f3f3f3;
  border-radius: 15rpx;
  .title {
    margin-bottom: 10rpx;
    font-size: 26rpx;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    display: -webkit-box;
    -webkit-line-clamp: 1; /*这个数字是设置要显示省略号的行数*/
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .content {
    font-size: 24rpx;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 30rpx;
    display: -webkit-box;
    -webkit-line-clamp: 2; /*这个数字是设置要显示省略号的行数*/
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
