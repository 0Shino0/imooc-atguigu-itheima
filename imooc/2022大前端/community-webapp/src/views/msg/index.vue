<template>
  <div>
    <ul class="links">
      <li>
        <router-link to="/msg/reply">回复</router-link>
      </li>
      <li>
        <router-link to="/msg/hands">点赞</router-link>
      </li>
    </ul>
    <ul class="content-box" v-if="localType==='reply'">
      <li class="item" v-for="(item,index) in lists" :key="'msg-'+index">
        <div class="content-item">
          <div class="flex">
            <img class="user" src="/img/bear-200-200.jpg" alt />
            <div class="column">
              <div class="title">{{item.cuid? item.cuid.name : '用户未设置昵称'}}</div>
              <div class="read">{{item.created |moment}}</div>
            </div>
          </div>
          <div class="reply">
            <svg-icon icon="editor"></svg-icon>回复
          </div>
        </div>
        <div class="reply-content">{{item.content}}</div>
        <div class="page" @click="goDetail(item)">
          <div class="title">{{item.tid ? item.tid.title: ''}}</div>
          <div class="desc">{{item.tid ? item.tid.content : ''}}</div>
        </div>
      </li>
    </ul>
    <ul class="content-box" v-else>
      <li class="item" v-for="(item,index) in lists" :key="'hands-'+index">
        <div class="content-item">
          <div class="flex">
            <img class="user" src="/img/bear-200-200.jpg" alt />
            <div class="column">
              <div class="title">{{item.uid? item.uid.name : '未设置昵称'}}</div>
              <div class="read">{{item.created | moment}} 赞了你</div>
            </div>
          </div>
        </div>
        <div class="page" v-if="item.cid">
          <div class="title">{{item.cid.content}}</div>
          <!-- <div class="desc">帖子的内容简介</div> -->
        </div>
      </li>
    </ul>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { getMsg, setMsg, getHands } from '@/api/user'
export default {
  name: 'msg',
  props: ['type'],
  data () {
    return {
      localType: 'reply',
      lists: [],
      page: 0,
      limit: 10,
      total: 0
    }
  },
  watch: {
    type (newval, oldval) {
      if (newval !== this.localType) {
        this.localType = newval
        this.page = 0
        this.lists = []
        this.dispatch()
      }
    }
  },
  mounted () {
    this.localType = this.type
    this.dispatch()
  },
  methods: {
    dispatch () {
      if (this.localType === 'reply') {
        this.getMsgAll()
      } else {
        this.getHandsAll(0)
      }
    },
    getMsgAll () {
      getMsg({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    getHandsAll () {
      getHands({
        page: this.page,
        limit: this.limit
      }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
        }
      })
    },
    goDetail (item) {
      setTimeout(() => {
        this.clear(item)
      }, 0)
      this.$router.push({ name: 'detail', params: { tid: item.tid._id } })
    },
    clear (item) {
      setMsg({ id: item._id }).then((res) => {
        if (res.code === 200) {
          this.$Toast('消息已阅！已跳转！')
          // 设置特定消息已读
          // this.lists = []
          // this.getMsgAll()
          // this.$store.commit('setMessage', { message: this.num - 1 })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.links {
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  box-shadow: 0 0 10px rgba(112, 94, 94, 0.1);
  a {
    color: #666;
  }
  .active {
    color: $primary-color;
    position: relative;
    &:after {
      content: '';
      display: inline-block;
      width: 48px;
      height: 4px;
      position: absolute;
      bottom: -30px;
      right: 4px;
      background: $primary-color;
    }
  }
}
.content-box {
  padding: 0 30px;
  .content-item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .user {
      width: 72px;
      height: 72px;
      border-radius: 50%;
    }
    .flex {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
    }
    .column {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      padding: 35px 20px;
      .title {
        color: #333;
        font-size: 32px;
        font-weight: bold;
        padding-bottom: 10px;
      }
      .read {
        font-size: 26px;
        color: #999;
      }
    }
    .reply {
      color: #999;
      font-size: 24px;
      .svg-icon {
        font-size: 32px;
        padding-right: 10px;
      }
    }
  }
  .reply-content {
    padding-bottom: 30px;
    color: #333;
    font-size: 28px;
  }
  .item {
    padding-bottom: 30px;
  }
  .page {
    background: #f3f3f3;
    border-radius: 12px;
    padding: 15px 30px;
    .title {
      font-size: 26px;
      color: #333;
      padding-bottom: 15px;
    }
    .desc {
      font-size: 24px;
      color: #999;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 32px;
    }
  }
  .flex {
    flex: 1;
  }
}
</style>
