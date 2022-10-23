<template>
  <view class="home">
    <view class="fixed-top">
      <search @click="handle()"></search>
      <u-tabs name="value" :list="tabs" :is-scroll="true" :current="current" @change="change" gutter="50" height="88" active-color="#02D199"></u-tabs>
    </view>
    <!-- 首页的列表 -->
    <view class="content" :style="{'padding-top': offsetTop + 'px'}">
      <view class="wrapper">
        <view class="hasnew" v-show="hasNew" :style="{'top': offsetTop + 'px'}">有新的内容，请下拉刷新</view>
        <!-- 取不到值 -->
        <!-- {{$store.state.count}} -->
        <view class="list-box" v-for="(item,index) in lists" :key="index" @click="gotoDetail(item)">
          <list-item :item="item" v-if="item.status === '0' && item.title && item.catalog"></list-item>
        </view>
        <view class="end">{{msg}}</view>
      </view>
    </view>
    <image src="/static/images/add-post.png" class="add-post" mode="aspectFit" @click="addContent()" />
    <view class="bottom-line"></view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'
// import { request } from '@/common/http'
// 方法一：辅助函数
// import { mapState } from 'vuex'
import { checkToken } from '@/common/checkAuth'
// 获取初始值，需要导入store
import { tabs } from '@/config/const'
// import sub from '@/common/utils/subscribe'

export default {
  components: {},
  data: () => ({
    current: 0,
    offsetTop: 50,
    page: {
      page: 0,
      limit: 10,
      catalog: '',
      sort: 'created'
    },
    lists: [],
    loading: false,
    pullDown: false,
    isEnd: false,
    tabs,
    hasNew: false
    // this.$store 取不到
    // count: this.$store.state.count
  }),
  methods: {
    ...mapMutations(['setTab']),
    handle () {
      // sub(['S7zrpjN9Kq05-4ZG_nlTAYxnARMLWlSW09h54A2JCZo'])
      uni.navigateTo({
        url: '/subcom-pkg/order/order'
      })
    },
    change (index) {
      this.isEnd = false
      this.current = index
      this.page = {
        page: 0,
        limit: 10,
        catalog: this.tabs[index].key,
        sort: 'created'
      }
      this.lists = []
      this.getList()
    },
    async getList () {
      this.loading = true
      const { data } = await this.$u.api.getList(this.page)
      if (data.length < this.page.limit) {
        this.isEnd = true
      }
      this.lists = [...this.lists, ...data]
      this.loading = false
      this.page.page++
    },
    async addContent () {
      const flag = await checkToken()
      if (!flag) {
        console.log('checkToken失败，拦截用户，并跳转登录')
        return
      }
      // 跳转到添加文章的页面
      // console.log('checkToken之后的内容')
      uni.navigateTo({
        url: '/subcom-pkg/post/post'
      })
    },
    gotoDetail (item) {
      console.log('🚀 ~ file: home.vue ~ line 89 ~ gotoDetail ~ item', item)
      // 导航到文章详情页面
      uni.navigateTo({
        url: '/subcom-pkg/detail/detail?tid=' + item._id
      })
    }
  },
  async mounted () {
    this.getList()
    // console.log(this.$store)
  },
  computed: {
  // 方法一：辅助函数
  // ...mapState(['count']),
  // ...mapState({
  //   msg2: (state) => state.msg
  // }),
  // 方法二：computed
    msg () {
      let str = ''
      if (this.loading) {
        str = '加载中...'
      } else {
        if (this.lists.length > 0) {
          // 说明有数据
          if (this.isEnd) {
            str = '您已经到底啦~没有更多了！'
          }
        } else {
          // 说明没有数据
          str = '暂无内容，请下拉刷新'
        }
      }
      return str
    }
  },
  watch: {
    loading (newval) {
      if (this.pullDown && !newval) {
        this.pullDown = false
        uni.stopPullDownRefresh()
      }
    }
  },

  // 页面周期函数--监听页面加载
  onLoad () {
    console.log(process.env.NODE_ENV)
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady () {
    const query = uni.createSelectorQuery().in(this)
    query.select('.fixed-top').boundingClientRect((data) => {
      this.offsetTop = data.height
    }).exec()
  },
  // 页面周期函数--监听页面显示(not-nvue)
  async onShow () {
    // 读取页面tab信息，缓存信息
    const tab = this.$store.state.tab
    const index = this.tabs.findIndex(item => item.key === tab)
    this.current = index
    this.lists = uni.getStorageSync('save_lists') || []
    // 请求页面信息，并且与接口部分进行对比
    console.log('onShow')
    if (this.lists.length > 0) {
      // 存在缓存的情况
      this.page = uni.getStorageSync('save_page')
      if (this.page.page === 0) {
        this.change(index)
      } else {
        // 页面用户有缓存数据，有分页数据
        const { data } = await this.$u.api.getList({ ...this.page, page: 0, limit: 10 })
        // 对比缓存 以便知道是否有更新
        if (data && data.length > 0 && this.lists && this.lists.length > 0 && data[0]._id !== this.lists[0]._id) {
          this.hasNew = true
        } else {
          this.hasNew = false
        }
      }
    } else {
      this.change(index)
    }
  },
  // 页面周期函数--监听页面隐藏
  onHide () {
    // 缓存页面信息
    uni.setStorageSync('save_lists', this.lists)
    uni.setStorageSync('save_page', this.page)
    // 恢复到默认情况
    this.setTab()
  },
  // 页面周期函数--监听页面卸载
  onUnload () {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh () {
    this.pullDown = true
    this.change(this.current)
    this.hasNew = false
    uni.removeStorageSync('save_lists')
    uni.removeStorageSync('save_page')
    // setTimeout(() => {
    //   console.log(2222)
    //   uni.stopPullDownRefresh()
    // }, 2000)
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom () {
    // 1. 触发条件的设置，距离底部多远的时候触发 - 50
    // console.log('reach bottom')
    // 2. 当没有更多的时候，需要给用户一个提示，同时设置页面样式，不再发请新的请求
    if (this.isEnd || this.loading) return
    this.getList()
  }
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
}
</script>

<style lang="scss">
.hasnew {
  text-align: center;
  color: #999;
  font-size: 26rpx;
  /* padding-top: 20rpx; */
  position: fixed;
  top: 0;
  width: 100vw;
  height: 40rpx;
  line-height: 40rpx;
  background: rgba(255, 255, 255, 1);
  z-index: 9999;
  box-shadow: 0 5px 8px rgba(255, 255, 255, 0.7);
}

.fixed-top {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 999;
}

.search {
  width: 70%;
}

.add-post {
  position: fixed;
  bottom: 30rpx;
  right: 10rpx;
  width: 150rpx;
  height: 150rpx;
  z-index: 9999;
}

.content {
  background: #f5f6f7;
  .wrapper {
    padding-bottom: 24rpx;
  }
}

.end {
  color: #999;
  text-align: center;
  background: #fff;
  padding: 25rpx 0;
  // background: transparent;
}
</style>
