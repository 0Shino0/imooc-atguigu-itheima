<template>
  <ul class="jieda" id="jieda">
    <li class="jieda-daan" v-for="(item,index) in state.comments" :key="item._id">
      <div class="detail-about detail-about-reply">
        <a class="fly-avatar" href>
          <img :src="item.cuid ? item.cuid.pic : '/img/bear-200-200.jpg'" alt=" " />
        </a>
        <div class="fly-detail-user">
          <router-link class="fly-link" :to="{name: 'home', params: {uid: item.cuid ? item.cuid._id : ''}}">
            <cite>{{item.cuid? item.cuid.name :'imooc'}}</cite>
            <i v-if="item.cuid && item.cuid.isVip !=='0'?item.cuid.isVip : false " class="layui-badge fly-badge-vip">VIP{{item.cuid.isVip}}</i>
          </router-link>

          <span v-if="index === 0">(楼主)</span>
          <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                  -->
        </div>

        <div class="detail-hits">
          <span>{{formatDate(item.created)}}</span>
        </div>

        <i class="iconfont icon-caina" title="最佳答案" v-show="item.isBest === '1'"></i>
      </div>
      <div class="detail-body jieda-body photos" v-richtext="item.content"></div>
      <div class="jieda-reply">
        <span class="jieda-zan" :class="{'zanok' :item.handed === '1'}" type="zan" @click="hands(item)">
          <i class="iconfont icon-zan"></i>
          <em>{{item.hands}}</em>
        </span>
        <span type="reply" @click="reply(item)">
          <i class="iconfont icon-svgmoban53"></i>
          回复
        </span>
        <div class="jieda-admin">
          <span v-show="page.isEnd ==='0' && user && item.cuid._id === user._id" @click="editComment(item)">编辑</span>
          <!-- <span type="del">删除</span> -->
          <span class="jieda-accept" v-show="page.isEnd ==='0' && user && page.uid && page.uid._id === user._id" @click="setBest(item)">采纳</span>
        </div>
      </div>
    </li>
    <!-- 无数据时 -->
    <li class="fly-none" v-if="state.comments.length === 0">消灭零回复</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { formatDate } from '@/utils/formatDate'
import { ContentsService } from '@/services/contents'
const {
  state,
  getCommentsList,
  hands,
  setBest,
  editComment
} = ContentsService()

export default defineComponent({
  name: 'CommentsList',
  props: ['tid', 'page'],
  setup (props) {
    onBeforeMount(async () => {
      await getCommentsList(props.tid)
    })

    return {
      formatDate,
      state,
      hands,
      setBest,
      editComment
    }
  }
})
</script>

<style scoped>
</style>
