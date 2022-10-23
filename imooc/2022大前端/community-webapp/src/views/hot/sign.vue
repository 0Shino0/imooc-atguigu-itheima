<template>
  <div>
    <div class="wrapper">
      <ul class="ctrls">
        <li :class="{'active': current === 0 }" @click="setIndex(0)">总签到榜</li>
        <li :class="{'active': current === 1 }" @click="setIndex(1)">今日签到榜</li>
      </ul>
    </div>
    <div class="content">
      <scroll
        :distance="footerHeight"
        :isEnd="isEnd"
        @on-loadTop="loadTop"
        @on-loadBottom="loadBottom"
      >
        <ul class="content-box">
          <li class="content-item" v-for="(item,index) in lists" :key="'sign-comments-' + index">
            <div class="num first" v-if="index === 0">01</div>
            <div class="num second" v-else-if="index === 1">02</div>
            <div class="num third" v-else-if="index === 2">03</div>
            <div class="num common" v-else-if="index < 9">{{ '0' + (index+1) }}</div>
            <div class="num common" v-else-if="index < 50 && index >=9">{{ index+1 }}</div>
            <div class="num" v-else></div>
            <img
              v-if="current === 0"
              class="user"
              :src="item && item.pic & item.pic !=='' ? item.pic: '/img/header.jpg'"
              alt
            />
            <img
              v-else
              class="user"
              :src="item && item.uid & item.uid.pic !=='' ? item.uid.pic: '/img/header.jpg'"
              alt
            />
            <div class="column no-between">
              <div class="title">{{item.uid ?item.uid.name: 'imooc'}}</div>
              <div class="read" v-if="current === 0">
                已经连续签到
                <span>{{item.count}}</span> 天
              </div>
              <div class="read" v-else>{{item.created | hours}}</div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { getHotSignRecord } from '@/api/hot'
export default {
  name: 'sign',
  data () {
    return {
      current: 0,
      page: 0,
      limit: 10,
      lists: [],
      footerHeight: 100,
      handle: {},
      isEnd: false,
      isRepeat: false
    }
  },
  mounted () {
    this.localType = this.type
    this.dispatch()
  },
  methods: {
    initHeight () {
      this.footerHeight = document.getElementsByClassName(
        'layout-footer'
      )[0].offsetHeight
    },
    init () {
      if (typeof this.handle === 'function') {
        this.handle()
      }
      this.isEnd = false
      this.isRepeat = false
      this.dispatch()
    },
    loadTop (end) {
      this.page = 0
      this.handle = end
      this.lists = []
      this.init()
    },
    loadBottom (end) {
      this.page++
      this.handle = end
      this.init()
    },
    async dispatch () {
      const handler = (res) => {
        // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
        this.isRepeat = false
        // 对于异常的判断，res.code 非200，我们给用户一个提示
        // 判断是否lists长度为0，如果为零即可以直接赋值
        // 当Lists长度不为0，后面请求的数据，加入到Lists里面来
        if (res.code === 200) {
          // 判断res.data的长度，如果小于20条，则是最后页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
        if (typeof this.handle === 'function') {
          this.handle()
        }
        this.initHeight()
      }
      try {
        const result = await this._getHotSignRecord()
        handler(result)
      } catch (err) {
        this.isRepeat = false
        if (err) {
          this.$Toast(err.message)
        }
      }
    },
    setIndex (val) {
      this.current = val
      this.lists = []
      this.page = 0
      this.init()
    },
    _getHotSignRecord () {
      const result = getHotSignRecord({
        type: this.localType,
        index: this.current,
        page: this.page,
        limit: this.limit
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 20px;
  .ctrls {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    li {
      background: rgba(243, 243, 243, 1);
      color: #999;
      height: 50px;
      font-size: 26px;
      font-weight: bold;
      line-height: 50px;
      padding: 0 35px;
      border-radius: 20px;
      margin-right: 25px;
      margin-top: 15px;
      &.active {
        color: rgba(2, 209, 153, 1);
        background: rgba(2, 209, 153, 0.16);
      }
    }
  }
}
.content-box {
  padding: 0 30px 60px 30px;
  .content-item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .num {
    font-size: 36px;
    font-weight: bold;
    &.first {
      color: #ed745e;
    }
    &.second {
      color: #e08435;
    }
    &.third {
      color: #f1ae37;
    }
    &.common {
      color: #999;
    }
  }
  .user {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    padding-left: 20px;
  }
  .column {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    height: 130px;
    padding: 35px 20px;
    &.no-between {
      justify-content: center;
      .title {
        padding-bottom: 16px;
      }
    }
    .title {
      color: #333;
      font-size: 32px;
      font-weight: bold;
    }
    .read {
      font-size: 26px;
      color: #999;
      span {
        color: $font-main-color;
        font-weight: bold;
      }
    }
  }
  .img {
    width: 200px;
    height: 125px;
    border-radius: 12px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
