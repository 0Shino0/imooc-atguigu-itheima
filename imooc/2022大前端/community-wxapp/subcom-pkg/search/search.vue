<template>
  <view class="search">
    <!-- 搜索框 -->
    <view class="search-box">
      <u-search v-model="searchValue" @clear="clearSearch" @search="search" @custom="search"></u-search>
    </view>
    <!-- 搜索建议列表 -->
    <view class="list" v-if="searchResults.length !== 0">
      <view class="item" v-for="(item) in searchResults" :key="item._id" @click="gotoDetail(item)">
        <view class="name">{{item.title}}</view>
        <u-icon name="arrow-right" size="25"></u-icon>
      </view>
    </view>
    <view class="list no-result" v-else-if="searchResults.length === 0 && showResult">
      这里空空如也~
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else-if="historyList.length !== 0 && searchResults.length === 0">
      <view class="history-title">
        <text>搜索历史</text>
        <u-icon name="trash" size="32" @click="clearStorage"></u-icon>
      </view>
      <!-- 标签列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in historyList" :key="i" @click="quickSearch(item)"></uni-tag>
      </view>
    </view>
    <!-- 热门推荐 -->
    <view class="history-box" v-if="!showResult">
      <view class="history-title">
        <text>热门推荐</text>
      </view>
      <!-- 标签列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in hotList" :key="i" @click="quickSearch(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '',
      historyList: uni.getStorageSync('historyList') || [],
      hotList: ['前端', 'vue', 'node', '面试', 'react', 'devops', 'flutter', 'MySQL', 'gitlab', 'redis', 'git', 'typescript', '升职', 'B站'],
      page: {
        title: '',
        page: 0,
        limit: 20
      },
      loading: false,
      searchResults: [],
      showResult: false
    }
  },
  methods: {
    search (value) {
      if (value.trim() === '') {
        uni.showToast({
          icon: 'error',
          title: '关键词不得为空',
          duration: 2000
        })
        return
      }
      this.page.title = value
      this.quickSearch(value)
    },
    addHis (value) {
      // 标签去重
      const index = this.historyList.indexOf(value)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      // 最近搜索的标签，显示在最前端
      this.historyList.unshift(value)
      // 本地缓存
      uni.setStorageSync('historyList', this.historyList)
    },
    async getList () {
      if (this.loading) return
      this.loading = true
      this.showResult = true
      const { data } = await this.$u.api.getList(this.page)
      this.searchResults = [...this.searchResults, ...data]
      this.loading = false
    },
    // 点击热门推荐，快速搜索
    quickSearch (item) {
      this.searchValue = item
      this.page.title = item
      // 添加到搜索历史
      this.addHis(item)
      // 发送搜索请求 -> 请求文件列表
      this.getList()
    },
    clearSearch () {
      // 当用户点击搜索框右侧的清空按钮的逻辑
      this.showResult = false
      this.searchResults = []
      this.page = {
        title: '',
        page: 0,
        limit: 20
      }
      this.loading = false
    },
    gotoDetail (item) {
      // 文章详情
      console.log('🚀 ~ file: search.vue ~ line 99 ~ gotoDetail ~ item', item)
    },
    clearStorage () {
      this.historyList = []
      uni.setStorageSync('historyList', [])
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding: 24rpx;
}

.search-box {
  padding-bottom: 50rpx;
}

.history-box {
  padding: 0 10rpx 50rpx;
  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;
    ::v-deep .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
      border-radius: 25rpx;
    }
  }
}

.list {
  padding: 0 5px;
  .item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:last-child {
      border-bottom: none;
    }
    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
  &.no-result {
    text-align: center;
    color: #666;
    font-size: 28rpx;
  }
}
</style>
