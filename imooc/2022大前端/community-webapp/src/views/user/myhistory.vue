<template>
  <div>
    <my-header title="浏览历史" bkColor="#fff" :zIndex="100"></my-header>
    <div class="container">
      <div class="content">
        <ul
          v-infinite-scroll="getList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="30"
          class="content-box"
        >
          <li class="content-item" v-for="(item, index) in postList" :key="index">
            <div class="header">
              <img :src="item.tid.uid.pic || '/img/bear-200-200.jpg'" class="img" alt />
              <span>{{ item.tid.uid.name }}</span>
            </div>
            <div class="title" @click="$router.push({ name: 'detail', params: { tid: item.tid._id } })">
              {{ item.tid.title }}
            </div>
            <div class="desc">
              {{ item.tid.content }}
            </div>
            <div class="bottom flex">
              <div>
                <span class="hands">
                  <svg-icon icon="zan"></svg-icon>
                </span>
                <span class="reads">
                  <svg-icon icon="eye-open"></svg-icon>{{ item.tid.answer }}
                </span>
              </div>
              <div>
                <svg-icon icon="delete"></svg-icon>
              </div>
            </div>
          </li>
          <li v-if="isEnd" style="text-align:center;">没有更多了~~~</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Paging from '../../utils/paging'
import { getPostHistory } from '../../api/content'

export default {
  name: 'myhistory',
  data () {
    return {
      postList: [],
      loading: false,
      isEnd: false,
      paging: {}
    }
  },
  mounted () {
    this.paging = new Paging(
      getPostHistory,
      { currentPage: 1, limit: 10 },
      this.postList,
      'historyList' // 后台返回数据的键
    )
  },
  computed: {
    uid () {
      return this.$store.state.user.userInfo._id
    }
  },
  methods: {
    getList () {
      this.isEnd = this.paging.isEnd()
      if (this.isEnd) {
        return
      }
      this.loading = true
      this.paging.next({ uid: this.uid }, res => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_mixin';

.container {
  // padding-top: $header-height + 10;
  padding-top: $header-height;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  .content-box {
    background: #fff;
    padding: 0 30px;
    .flex {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
    .content-item {
      align-items: center;
      padding: 30px 20px;
      @extend %border-line;
    }
    .title {
      color: #333;
      font-size: 30px;
      font-weight: bold;
      overflow: hidden;
      line-height: 38px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 15px;
    }
    .desc {
      font-size: 24px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 32px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 30px;
    }
    .header {
      margin-bottom: 30px;
      span {
        font-size: 26px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-left: 10px;
      }
      .img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .bottom {
      color: #999;
      font-size: 24px;
      .reads,
      .hands {
        margin-right: 20px;
      }
    }
    .svg-icon {
      font-size: 36px;
    }
  }
}
</style>
