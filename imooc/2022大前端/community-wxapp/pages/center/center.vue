<template>
  <view>
    <view class="grey">
      <view class="bg"></view>
      <view class="wrapper">
        <!-- 个人信息卡片 -->
        <view class="profile">
          <view class="info">
            <u-image class="pic" :src="isLogin ? userInfo.pic: ''" width="120" height="120" shape="circle" error-icon="/static/images/header.jpg" />
            <!-- 用户昵称 + VIP -->
            <view class="user" @click="navTo">
              <view class="name">{{isLogin ?userInfo.name : '请登录'}}</view>
              <view class="fav">
                <!-- <van-icon name="fav2" class-prefix="iconfont" size="14"></van-icon> -->
                积分：{{userInfo && userInfo.favs ? userInfo.favs:0}}
              </view>
            </view>
            <view class="link" @click="gotoGuard('/sub-pkg/user-info/user-info')">个人主页 ></view>
            <!-- <navigator class="link" url="/subcom-pkg/auth/auth">个人主页 ></navigator> -->
            <!-- <navigator class="link" url="/sub-pkg/user-info/user-info">个人主页 ></navigator> -->
          </view>
          <view class="stats" v-if="isLogin">
            <view class="item">
              <navigator :url="'/sub-pkg/posts/posts?uid=' + uid + '&type=p'">
                <view>{{ countMyPost }}</view>
                <view class="title">我的帖子</view>
              </navigator>
            </view>
            <view class="item">
              <navigator :url="'/sub-pkg/posts/posts?uid=' + uid+ '&type=c'">
                <view>{{ countMyCollect }}</view>
                <view class="title">收藏夹</view>
              </navigator>
            </view>
            <view class="item">
              <navigator :url="'/sub-pkg/posts/posts?uid=' + uid+ '&type=h'">
                <view>{{ countMyHistory }}</view>
                <view class="title">最近浏览</view>
              </navigator>
            </view>
          </view>
        </view>
      </view>
      <view class="center-wraper">
        <view class="center-list first">
          <li v-for="(item,index) in lists" :key="index">
            <view @click="gotoGuardHandler(item)">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </view>
          </li>
        </view>
        <view class="center-list">
          <li v-for="(item,index) in routes" :key="index" @click="gotoHome(item.tab)">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </li>
        </view>
      </view>
    </view>
    <view class="bottom-line"></view>
  </view>
</template>

<script>
import { gotoGuard } from '@/common/checkAuth'
import { mapGetters, mapState, mapMutations } from 'vuex'
import sub from '@/common/utils/subscribe'

export default {
  data: () => ({
    lists: [
      {
        name: '我的帖子',
        icon: 'icon-teizi',
        routeName: '/sub-pkg/posts/posts'
      },
      {
        name: '修改设置',
        icon: 'icon-setting',
        routeName: '/sub-pkg/settings/settings'
      },
      {
        name: '签到中心',
        icon: 'icon-qiandao',
        routeName: '/sub-pkg/sign/sign'
      },
      {
        name: '电子书',
        icon: 'icon-book',
        routeName: '/sub-pkg/books/books'
      },
      {
        name: '关于我们',
        icon: 'icon-about',
        routeName: '/sub-pkg/about/about'
      },
      {
        name: '人工客服',
        icon: 'icon-support',
        routeName: '/sub-pkg/suggest/suggest'
      },
      {
        name: '意见反馈',
        icon: 'icon-lock2',
        routeName: '/sub-pkg/suggest/survey'
      }
    ],
    routes: [
      {
        name: '提问',
        icon: 'icon-question',
        tab: 'ask'
      },
      {
        name: '分享',
        icon: 'icon-share',
        tab: 'share'
      },
      {
        name: '讨论',
        icon: 'icon-taolun',
        tab: 'discuss'
      },
      {
        name: '建议',
        icon: 'icon-advise',
        tab: 'advise'
      }
    ],
    countMyPost: 0,
    countMyCollect: 0,
    countMyHistory: 0
    // isLogin: true
  }),
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['userInfo']),
    uid () {
      return this.userInfo._id
    }
  },
  onShow () {
    this.getUserCount()
  },
  methods: {
    ...mapMutations(['setTab', 'setUserInfo']),
    gotoGuard,
    gotoGuardHandler (item) {
      const { name, routeName } = item
      if (name === '我的帖子') {
        gotoGuard(routeName + `?uid=${this.uid}&type=p`)
      } else {
        gotoGuard(routeName)
      }
    },
    gotoHome (tab) {
      this.setTab(tab)
      uni.switchTab({
        url: '/pages/home/home'
      })
    },
    navTo () {
      const app = getApp()
      const tmplIds = app.globalData.tmplIds || []
      sub(tmplIds.splice(0, 3), () => {
        if (!this.isLogin) {
          uni.navigateTo({
            url: '/subcom-pkg/auth/auth'
          })
        }
      }, true)
    },
    async getUserInfo () {
      const { _id: uid } = this.userInfo
      const { code, data } = await this.$u.api.getBasic({ uid })
      if (code === 200) {
        this.setUserInfo(data)
      }
    },
    async getUserCount () {
      const { _id: uid } = this.userInfo
      if (!uid) return
      await this.getUserInfo()
      const { data, code } = await this.$u.api.wxUserCount({ uid, reqAll: 1 })
      if (code === 200) {
        const { countMyPost, countMyCollect, countMyHistory } = data
        this.countMyPost = countMyPost
        this.countMyCollect = countMyCollect
        this.countMyHistory = countMyHistory
      }
    }
  }

}
</script>

<style lang="scss">
.grey {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 30;
}
a {
  color: #666;
  text-decoration: none;
}
// .bg {
//   height: 260rpx;
//   // 4个参数： 左上 右上 右下 左下
//   border-radius: 0 0 50% 50%;
//   background-color: #16d1a2;
//   position: relative;
//   z-index: 50;
// }
.bg {
  background-image: url("/static/images/my_bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 280rpx;
  background-position: 0 0;
  z-index: 100;
}
.wrapper {
  width: 100%;
  height: 370rpx;
  padding: 25rpx;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
  color: #333;
  .profile {
    background: #fff;
    border-radius: 12rpx;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    .name {
      font-size: 36rpx;
      font-weight: 700;
      margin-bottom: 10rpx;
      margin-top: 0;
      width: 370rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .link {
      font-size: 24rpx;
      color: #999;
    }
    .fav {
      display: inline-block;
      padding: 8px 12rpx;
      background: rgba(2, 209, 153, 0.16);
      border-radius: 12rpx;
      color: #02d199;
      margin: 0;
      font-size: 22rpx;
      .icon-fav {
        padding-right: 10rpx;
      }
    }
    .info,
    .stats {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }
    .info {
      margin-bottom: 24rpx;
    }
    .stats {
      justify-content: space-around;
    }
    .user {
      flex: 1;
      padding-left: 20rpx;
    }
    .pic {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
    }
    .item {
      text-align: center;
      position: relative;
      p {
        margin-top: 14rpx;
        margin-bottom: 0;
      }
      &:after {
        width: 2rpx;
        height: 80rpx;
        background: #ddd;
        content: "";
        position: absolute;
        right: -60rpx;
        top: 20rpx;
      }
      &:last-child {
        &:after {
          width: 0;
        }
      }
      .title {
        color: #666;
      }
    }
  }
}
.center-wraper {
  background: #f6f5f8;
  position: relative;
  width: 100%;
  // height: 100%;
  z-index: 10;
  .center-list {
    background: #fff;
    margin-bottom: 30rpx;
    display: flex;
    flex-flow: wrap;
    padding-top: 40rpx;
    &.first {
      padding-top: 100rpx;
    }
    li {
      width: 25%;
      text-align: center;
      color: #666;
      margin-bottom: 40rpx;
      font-size: 26rpx;
    }
    i {
      display: block;
      margin: 0 auto;
      font-size: 40rpx;
      width: 56rpx;
      height: 56rpx;
      margin-bottom: 20rpx;
      color: #888;
      background-size: contain;
    }
    .icon-teizi {
      background-image: url("/static/images/teizi@2x.png");
    }
    .icon-setting {
      background-image: url("/static/images/setting@2x.png");
    }
    .icon-lock2 {
      background-image: url("/static/images/lock2@2x.png");
    }
    .icon-support {
      background-image: url("/static/images/support.png");
    }
    .icon-qiandao {
      background-image: url("/static/images/sign1.png");
    }
    .icon-book {
      background-image: url("/static/images/books.png");
    }
    .icon-record {
      background-image: url("/static/images/record@2x.png");
    }
    .icon-about {
      background-image: url("/static/images/about.png");
    }
    // 快捷访问
    .icon-question {
      background-image: url("/static/images/question@2x.png");
    }
    .icon-share {
      background-image: url("/static/images/share@2x.png");
    }
    .icon-taolun {
      background-image: url("/static/images/taolun@2x.png");
    }
    .icon-advise {
      background-image: url("/static/images/advice@2x.png");
    }
  }
}
</style>
