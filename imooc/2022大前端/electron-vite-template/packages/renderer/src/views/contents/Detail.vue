<template>
  <div class="layui-container">
    <imooc-panel></imooc-panel>
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <h1>{{ state.page.title }}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span class="layui-badge layui-bg-green fly-detail-column">{{ tag }}</span>

            <span v-if="state.page.isEnd === '0'" class="layui-badge" style="background-color: #999"
              >未结</span
            >
            <span v-else class="layui-badge" style="background-color: #5fb878">已结</span>

            <span v-show="state.page.isTop === '1'" class="layui-badge layui-bg-black">置顶</span>
            <template v-if="state.page.tags">
              <span
                v-for="(tag, index) in state.page.tags"
                :key="'tags' + index"
                class="layui-badge"
                :class="tag.class"
                >{{ tag.name }}</span
              >
            </template>

            <!-- method1: vuex -> userInfo -> roles -> includes admin -->
            <!-- method2: 组件级权限控制 richtext -->
            <div>
              <div class="fly-admin-box" data-id="123">
                <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

                <span
                  v-if="state.page.isTop === '0'"
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="stick"
                  rank="1"
                  >置顶</span
                >
                <span
                  v-else
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="stick"
                  rank="0"
                  style="background-color: #ccc"
                  >取消置顶</span
                >

                <!-- <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
                <span
                  class="layui-btn layui-btn-xs jie-admin"
                  type="set"
                  field="status"
                  rank="0"
                  style="background-color:#ccc;"
                >取消加精</span>-->
              </div>
            </div>

            <span class="fly-list-nums">
              <a href="#comment">
                <i class="iconfont" title="回答">&#xe60c;</i>
                {{ state.page && state.page.answer }}
              </a>
              <i class="iconfont" title="人气">&#xe60b;</i>
              {{ state.page && state.page.reads }}
            </span>
          </div>
          <!-- 收藏、作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img :src="state.page.uid ? state.page.uid.pic : '/img/bear-200-200.jpg'" />
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{ state.page.uid ? state.page.uid.name : 'imooc' }}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息："></i> -->
                <i
                  v-if="
                    state.page.uid && state.page.uid.isVip !== '0' ? state.page.uid.isVip : false
                  "
                  class="layui-badge fly-badge-vip mr1"
                  >VIP{{ state.page.uid && state.page.uid.isVip }}</i
                >
              </a>
              <span>{{ state.page.created && formatDate(state.page.created) }}</span>
            </div>
            <div class="detail-hits">
              <span style="padding-right: 10px; color: #ff7200">悬赏：{{ state.page.fav }}</span>
            </div>
          </div>
          <div class="layui-btn-container fly-detail-admin pt1">
            <!-- <a class="layui-btn layui-btn-sm jie-admin" :to="{name: 'edit', params: {tid: tid , page: page}}" v-show="state.page.isEnd === '0' && state.page.uid._id === user._id">编辑</a> -->
            <a
              class="layui-btn layui-btn-sm jie-admin-collect"
              :class="{ 'layui-btn-primary': state.page.isFav }"
              >{{ state.page.isFav ? '取消收藏' : '收藏' }}</a
            >
          </div>
          <div class="detail-body photos" v-html="state.page.content"></div>
        </div>

        <!-- 回帖相关的内容 -->
        <div id="flyReply" class="fly-panel detail-box">
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center">
            <legend>回帖</legend>
          </fieldset>
          <!-- <comments :tid="tid" :page="state.page"></comments> -->
          <!-- <imooc-page v-show="comments.length > 0 && total > 0" :showType="'icon'" :hasSelect="false" :hasTotal="false" :total="total" :size="size" :current="current" :showEnd="imooc-pagetrue" @changeCurrent="handleChange" @changeLimit="handleLimit"></imooc-page> -->
          <div class="layui-form layui-form-pane">
            <form>
              <Form ref="observer" v-slot="{ errors }">
                <!-- <imooc-edit @changeContent="addContent" :initContent="state.editInfo.content"></imooc-edit> -->
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <Field
                        as="input"
                        rules="required|length:4"
                        type="text"
                        name="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class>
                      <span
                        class="svg"
                        style="color: #c00"
                        @click="getCaptcha()"
                        v-html="codeState.svg"
                      ></span>
                    </div>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.code }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button">提交回复</button>
                </div>
              </Form>
            </form>
          </div>
        </div>
      </div>
      <div class="layui-col-md4">
        <imooc-simplebar></imooc-simplebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount } from 'vue'
  import { Form, Field } from 'vee-validate'
  import SimpleSideBar from '@/views/sidebar/SimpleSideBar.vue'
  import Panel from '@/components/Panel.vue'
  // import Comments from '@/views/contents/Commets.vue'
  // import Editor from '../modules/editor/index.vue'
  // import CodeMix from '@/mixin/code'
  // import Pagination from '@/components/modules/pagination/index.vue'
  import { formatDate } from '@/utils/formatDate'
  import { ContentsService } from '@/services/contents'
  import { LoginService } from '@/services/login'
  const {
    state,
    tag,
    getPostDetail
    // addContent
  } = ContentsService()
  const { state: codeState, getCaptcha } = LoginService()

  export default defineComponent({
    name: 'DetailPage',
    components: {
      Form,
      Field,
      // Comments,
      'imooc-panel': Panel,
      'imooc-simplebar': SimpleSideBar
      // 'imooc-edit': Editor
      // 'imooc-page': Pagination
    },
    props: ['tid'],
    setup(props) {
      onBeforeMount(async () => {
        await getPostDetail(props.tid)
        await getCaptcha()
      })

      return {
        formatDate,
        state,
        codeState,
        getCaptcha,
        // addContent,
        tag
      }
    }
  })
</script>

<style lang="scss" scoped>
  .fly-detail-admin {
    text-align: right;
    border-top: 1px dotted #eaeaea;
    background: #f8f8f8;
  }

  .fly-detail-info {
    span {
      margin-right: 5px;
    }
  }

  .fly-admin-box {
    margin-left: 0;
    margin-top: 15px;
  }

  .jieda-body {
    margin: 25px 0 20px !important;
  }
</style>
