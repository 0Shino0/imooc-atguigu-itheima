<template>
  <div>
    <my-header :zIndex="10" title="我的帖子"></my-header>
    <div class="container">
      <div class="content">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="30"
          class="content-box"
        >
          <li class="content-item flex" v-for="(item, index) in postList" :key="index">
            <div class="column">
              <div
                class="title"
                @click="$router.push({ name: 'detail', params: { tid: item._id } })"
              >{{ item.title }}</div>
              <div class="bottom flex">
                <div>
                  <span class="reads">{{ item.answer }}回复</span>
                  <span class="time">{{ item.created | fromNow }}</span>
                </div>
                <div @click="deletePost(item._id)">
                  <svg-icon icon="delete"></svg-icon>
                </div>
              </div>
            </div>
          </li>
          <li v-if="isEnd" style="text-align:center;">没有更多了~~~</li>
        </ul>
        <div v-if="isEnd" style="text-align:center;">没有更多了~~~</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
import { getMyPosts } from '../../api/content'
import { fromNow } from '../../utils/mymoment'
import Paging from '../../utils/paging'

export default {
  name: 'mypost',
  data () {
    return {
      postList: [],
      loading: false,
      isEnd: false,
      paging: {}
    }
  },
  mounted () {
    this.paging = new Paging( // 初始化分页对象
      getMyPosts, // 后台请求数据的 api
      { currentPage: 1, pageSize: 10 }, // 后台分页初始化参数
      this.postList // 前端渲染用的数组
    )
  },
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  methods: {
    loadMore () {
      this.isEnd = this.paging.isEnd()
      if (this.isEnd) {
        return
      }
      this.getList()
    },
    getList () {
      this.loading = true
      this.paging.next({ uid: this.user._id }, res => {
        this.loading = false
      })
    },
    deletePost (postId) {
      MessageBox.confirm('确定删除该帖子吗?').then(action => {
        // console.log(postId)
        // console.log(action)
      }).catch(cancel => {})
    }
  },
  filters: {
    fromNow (value) {
      return fromNow(value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_mixin';

.container {
  // padding-top: $header-height + 10;
  padding-top: $header-height;
  .content-box {
    padding: 0 30px;
    .content-item {
      align-items: center;
      @extend %border-line;
    }
    .column {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      height: 150px;
      padding: 30px 20px;
      // @extend %border-line;
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
      }
    }
    .flex {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
    .tags {
      font-size: 24px;
      color: #fff;
      background: $primary-color;
      border-radius: 24px 24px 24px 0;
      padding: 4px 12px;
      margin-right: 10px;
      display: inline-block;
      transform: scale(0.8);
      position: relative;
      top: -2px;
      &.color1 {
        background: #0166f8;
      }
    }
    .bottom {
      color: #999;
      font-size: 24px;
      .reads {
        margin-right: 20px;
      }
    }
    .svg-icon {
      font-size: 36px;
    }
  }
}
</style>
