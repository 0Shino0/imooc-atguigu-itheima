<template>
  <div>
    <my-header :title="page.title || '页面详情'" :hasBack="true" :zIndex="1000"></my-header>
    <div class="wrapper">
      <div class="detail-head">{{page.title}}</div>
      <div class="detail-info">
        <div class="detail-info-head">
          <div class="avatar">
            <img :src="page.uid && page.uid.pic" alt />
          </div>
          <div class="cont">
            <p class="name">{{page.uid && page.uid.name}}</p>
            <p class="time">{{page.created | moment }}</p>
          </div>
        </div>
        <div class="detail-info-body" v-richtext="page.content"></div>
        <div class="detail-info-foot">{{page.reads}} 阅读</div>
      </div>
      <div class="comments">
        <div class="title">评论</div>
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="30"
          class="comments-lists"
        >
          <li class="item" v-for="(item,index) in comments" :key="'comments-' + index">
            <div class="detail-info-head">
              <div class="user">
                <div class="avatar">
                  <img :src="item.cuid && item.cuid.pic" alt />
                </div>
                <div class="cont">
                  <p class="name">{{item.cuid && item.cuid.name}}</p>
                  <p class="time">{{item.created | moment }}・评论了帖子</p>
                </div>
              </div>
              <div class="hands" @click="test()">
                <svg-icon icon="zan"></svg-icon>
                <span>{{item.hands}}</span>
              </div>
            </div>
            <div class="detail-body" v-richtext="item.content"></div>
          </li>
        </ul>
        <div class="info" v-if="comments.length === 0">暂无评论，赶紧来抢沙发吧~~~</div>
        <div class="loading" v-if="loading">
          <mt-spinner type="fading-circle"></mt-spinner>加载中...
        </div>
        <div class="info" v-if="isEnd">没有更多了~~~</div>
      </div>
    </div>

    <div class="detail-bottom" :class="{'fixed': isFocus ||faceStatus, 'on': faceStatus}">
      <span class="bottom-input-wrap">
        <svg-icon icon="advice"></svg-icon>
        <input
          class="input"
          type="text"
          placeholder="写评论..."
          v-model="commentContent"
          v-on:keyup.enter="submitComment"
          @focus="focus()"
          @blur="blur()"
        />
        <span @click.stop="showFace()">
          <svg-icon icon="smile" class="face"></svg-icon>
        </span>
      </span>
      <ul class="bottom-right">
        <li :class="{'row': !showText}">
          <svg-icon icon="bianji"></svg-icon>
          <p>
            <span v-show="showText">评论</span>
            {{page.answer}}
          </p>
        </li>
        <li :class="{'row': !showText}" @click="collect(page._id)">
          <svg-icon icon="shoucang"></svg-icon>
          <p>
            <span v-show="showText">{{page.isCollect?'取消收藏':'收藏'}}</span>
          </p>
        </li>
        <!-- <li :class="{'row': !showText}">
          <svg-icon icon="zan"></svg-icon>
          <p>
            <span v-show="showText">赞</span>
            {{page.fav}}
          </p>
        </li>-->
      </ul>
    </div>
    <div class="detail-face" :class="{'on': faceStatus}" ref="faces">
      <ul>
        <li class="detail-face-item" v-for="(value,key) in faces" :key="'face-' + key">
          <img :src="value" alt />
        </li>
        <li class="clear"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import faces from '@/assets/js/face'
import { getDetail, addCollect } from '@/api/content'
import { getComents, addComment } from '@/api/comments'
import Paging from '../../utils/paging'
import { mapGetters } from 'vuex'

export default {
  name: 'detail',
  props: ['tid'],
  data () {
    return {
      faces: faces,
      page: {},
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: ''
      },
      showText: true,
      loading: false,
      isEnd: false,
      isFocus: false,
      faceStatus: false,
      scroll: null,
      commentContent: '',
      paging: {} // 分页对象
    }
  },
  mounted () {
    this.getPostDetail()
    const wrap = this.$refs.faces
    const faceHandler = (evt) => {
      if (!wrap.contains(evt.target) && this.faceStatus) {
        this.faceStatus = false
      }
    }
    document.removeEventListener('touchstart', faceHandler)
    document.addEventListener('touchstart', faceHandler)
    this.paging = new Paging( // 初始化分页对象
      getComents, // 后台请求数据的 api
      { page: 0, limit: 10 }, // 后台分页初始化参数
      this.comments // 前端渲染用的数组
    )
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isLogin: 'user/isLogin'
    })
  },
  watch: {
    faceStatus (newval, oldval) {
      if (!newval) {
        this.scroll.scrollTo(0, 0)
      }
    },
    tid () { // 实时刷新页面
      this.paging.clear()
      this.getPostDetail()
      this.getCommentsList()
    }
  },
  methods: {
    showFace () {
      this.faceStatus = !this.faceStatus
      if (this.faceStatus) {
        this.scroll = new BScroll(this.$refs.faces)
      }
    },
    focus () {
      this.isFocus = true
    },
    blur () {
      this.isFocus = false
    },
    loadMore () {
      this.isEnd = this.paging.isEnd()
      if (this.isEnd) return
      this.loading = true
      this.getCommentsList()
    },
    getPostDetail () {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    getCommentsList () {
      this.paging.next({ tid: this.tid }, res => {
        this.loading = false
        // console.log(res)
      })
    },
    collect (postid) {
      this.$Loading.show()
      addCollect({ tid: postid, isCollect: this.page.isCollect }).then(res => {
        if (res.code === 200) {
          this.page.isCollect = res.isCollect
        }
        this.$Loading.close()
        this.$Toast(res.msg)
      })
    },
    submitComment () {
      if (!this.isLogin) {
        this.$Toast('请登录后再发表评论！')
        return
      }
      if (this.commentContent === '') {
        this.$Toast('评论内容不能为空！')
        return
      }
      this.$Loading.show()
      addComment({
        tid: this.page._id,
        uid: this.page.uid._id,
        cuid: this.user._id,
        content: this.commentContent
      }).then(res => {
        this.$Loading.close()
        if (res.code === 200) {
          this.loading = true
          this.paging.clear()
          this.getCommentsList()
        }
        this.$Toast(res.msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './detail.scss';
</style>
