<template>
  <div>
    <div class="fly-home fly-panel" style="background-image: url();">
      <img :src="userInfo.pic ? userInfo.pic : '/img/bear-200-200.jpg'" />
      <!-- <i class="iconfont icon-renzheng" title="Imooc社区认证"></i> -->
      <h1>
        {{userInfo.name}}
        <i class="iconfont icon-nan"></i>
        <!-- <i class="iconfont icon-nv"></i>  -->
        <i
          class="layui-badge fly-badge-vip"
        >{{userInfo.isVip === '0' ? '非VIP': 'VIP' + userInfo.isVip}}</i>
        <!--
    <span style="color:#c00;">（管理员）</span>
    <span style="color:#5FB878;">（社区之光）</span>
    <span>（该号已被封）</span>
        -->
      </h1>

      <!-- <p style="padding: 10px 0; color: #5FB878;">认证信息：layui 作者</p> -->

      <p class="fly-home-info">
        <i class="iconfont icon-kiss" title="飞吻"></i>
        <span style="color: #FF7200;">{{userInfo.favs}} 积分</span>
        <i class="iconfont icon-shijian"></i>
        <span>{{userInfo.created | moment}} 加入</span>
        <i class="iconfont icon-chengshi"></i>
        <span>{{userInfo.location}}</span>
      </p>

      <p class="fly-home-sign">{{userInfo.regmark}}</p>

      <div class="fly-sns" data-user>
        <a
          href="javascript:;"
          class="layui-btn layui-btn-primary fly-imActive"
          data-type="addFriend"
        >加为好友</a>
        <a href="javascript:;" class="layui-btn layui-btn-normal fly-imActive" data-type="chat">发起会话</a>
      </div>
    </div>

    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{userInfo.name}} 最近的提问</h3>
            <ul class="jie-row">
              <li v-for="(item,index) in postList" :key="'postlist' + index">
                <div
                  class="fly-list-badge"
                  v-show="item.tags.length > 0 && item.tags[0].name !== ''"
                >
                  <span
                    class="layui-badge"
                    v-for="(tag, index) in item.tags"
                    :key="'tag' + index"
                    :class="tag.class"
                  >{{tag.name}}</span>
                </div>
                <router-link
                  class="jie-title link"
                  :to="{name:'detail', params: {tid: item._id}}"
                >{{item.title}}</router-link>
                <i>{{item.created | moment}}</i>
                <em class="layui-hide-xs">{{item.reads}}阅/{{item.answer}}答</em>
              </li>
              <div
                v-show="postList.length === 0"
                class="fly-none"
                style="min-height: 50px; padding:30px 0; height:auto;"
              >
                <i style="font-size:14px;">没有发表任何求解</i>
              </div>
            </ul>
          </div>
        </div>

        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{userInfo.name}} 最近的回答</h3>
            <ul class="home-jieda">
              <li v-for="(item,index) in commentList" :key="'comments' + index">
                <p>
                  <span>{{item.created | moment}}</span>
                  在
                  <router-link
                    :to="item.tid? {name: 'detail', params: {tid: item.tid? item.tid._id : ''}} : {name: '404'}"
                  >{{item.tid ? item.tid.title: '(用户已经删除该贴)'}}</router-link>中回答：
                </p>
                <div class="home-dacontent" v-richtext="item.content"></div>
              </li>
              <div
                v-show="commentList.length === 0"
                class="fly-none"
                style="min-height: 50px; padding:30px 0; height:auto;"
              >
                <span>没有回答任何问题</span>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo, getCommentList, getPostPublic } from '@/api/user'
export default {
  name: 'home',
  props: ['uid'],
  data () {
    return {
      postList: [],
      commentList: [],
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfo()
    this.getPostList()
    this.getCommentList()
  },
  methods: {
    getUserInfo () {
      // 获取用户的基本信息
      getInfo({ uid: this.uid || 123 }).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data
        }
      })
    },
    getPostList () {
      // 获取最近的发贴列表
      getPostPublic({
        uid: this.uid,
        page: 0,
        limit: 20
      }).then((res) => {
        if (res.code === 200) {
          this.postList = res.data
        }
      })
    },
    getCommentList () {
      // 获取最近的评论信息
      getCommentList({
        uid: this.uid,
        page: 0,
        limit: 20
      }).then((res) => {
        if (res.code === 200) {
          this.commentList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
