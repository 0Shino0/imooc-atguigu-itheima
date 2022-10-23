<template>
  <div>
    <div class="grey">
      <my-header title="签到中心" :zIndex="100"></my-header>
      <div class="bg">
        <div class="wrapper">
          <span class="fav">
            <svg-icon icon="fav2"></svg-icon>
            <i></i>
          </span>
          <span>可用积分：{{ userInfo.favs }}</span>
        </div>
      </div>
      <div class="board">
        <div class="board-wrapper">
          <div class="title">
            已经连续签到
            <span>{{ count }}</span>天
          </div>
          <ul class="sign-bar">
            <li class="item" v-for="(item,index) in weeks" :key="'weeks' + index">
              <i>{{ checked.includes(index) ? '' : preFavs[index] }}</i>
              <svg-icon icon="check" class="active" v-show="checked.includes(index)"></svg-icon>
              <span>{{item}}</span>
              <div
                class="line"
                v-show="(index +1 < weeks.length -1 && checked.includes(index + 1) && checked.includes(index))"
              ></div>
            </li>
          </ul>
          <mt-button
            type="primary"
            size="large"
            class="btn"
            :class="{'signed': isSign}"
            @click="sign()"
          >{{!isSign?'签到':'已签到'}}</mt-button>
        </div>
        <div class="board-wrapper">
          <div class="title center">签到规则</div>
          <p>1.“签到”可获得的社区积分。规则如下:</p>
          <table>
            <thead>
              <tr>
                <td>连续签到天数</td>
                <td>每天活动积分</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>小于5天</td>
                <td>5积分</td>
              </tr>
              <tr>
                <td>小于5天</td>
                <td>5积分</td>
              </tr>
              <tr>
                <td>大于或等于5天</td>
                <td>10积分</td>
              </tr>
              <tr>
                <td>大于或等于15天</td>
                <td>15积分</td>
              </tr>
              <tr>
                <td>大于或等于30天</td>
                <td>20积分</td>
              </tr>
              <tr>
                <td>大于或等于100天</td>
                <td>30积分</td>
              </tr>
              <tr>
                <td>大于或等于365天</td>
                <td>50积分</td>
              </tr>
            </tbody>
          </table>
          <p>2.中间若有间隔，则连续天数重新计算。</p>
          <p>3.不可复用程序自动签到，否则积分清零。</p>
        </div>
      </div>
      <div class="sign-modal" v-show="isShow">
        <div class="title">恭喜您，签到成功!</div>
        <div class="desc">恭喜您已获得{{ expectedFavs }}积分</div>
        <mt-button type="primary" class="btn" @click="close()">好的</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getDay, getDiffFromNow } from '@/utils/mymoment'

const getPreFavs = count => { // 根据签到次数计算预期积分
  let favs = 0
  switch (true) {
    case count < 5:
      favs = 5
      break
    case count >= 5:
      favs = 10
      break
    case count >= 15:
      favs = 15
      break
    case count >= 30:
      favs = 20
      break
    case count >= 100:
      favs = 30
      break
    case count >= 365:
      favs = 50
      break
  }
  return favs
}

export default {
  name: 'sign',
  data () {
    return {
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      checked: [],
      preFavs: [],
      isShow: false,
      count: 0
    }
  },
  mounted () {
    this.renderList()
  },
  methods: {
    ...mapActions({
      signX: 'user/signX'
    }),
    sign () {
      if (this.isSign) {
        this.$Toast('您已签到！')
        return
      }
      this.$Loading.show()
      this.signX().then(res => {
        // this.$Toast(res.msg)
        this.isShow = true
        this.renderList()
        this.$Loading.close()
      })
    },
    close () {
      this.isShow = false
    },
    renderList () {
      this.checked = []
      const today = getDay()
      const lastSignDate = this.userInfo.lastSign
      // 如果签到有中断，签到次数清零
      const isFirstSign = lastSignDate ? (getDiffFromNow(lastSignDate) > 1) : true
      let count = isFirstSign ? 0 : this.userInfo.count
      this.count = count
      if (this.isSign) {
        this.checked.push(today)
        count--
      }
      for (let i = 1; i <= count; i++) { // 渲染之前的签到节点
        const yestoday = today - i
        if (yestoday < 0) {
          break
        }
        this.checked.push(yestoday)
      }
      for (let i = 0; i < 7; i++) {
        if (i < today) {
          this.preFavs.push('未签到')
        } else {
          this.preFavs.push('+' + getPreFavs(i + count))
        }
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    },
    isSign () {
      return this.$store.state.user.userInfo.isSign
    },
    expectedFavs () { // 预期的签到积分
      return getPreFavs(this.userInfo.count + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.grey {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  padding-bottom: 120px;
}
.signed {
  background: #cccccc !important;
  color: #fff;
}
.bg {
  background-image: url('~@/assets/images/my_bg@2x.png');
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 400px;
  background-position: 0 $header-height;
  z-index: 0;
  .wrapper {
    padding-top: $header-height + 30;
    text-align: center;
    display: flex;
    flex-flow: row nowrapper;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    .svg-icon {
      position: relative;
      color: #f9ac4b;
      font-size: 34px;
      z-index: 80;
    }
    i {
      display: inline-block;
      width: 48px;
      height: 48px;
      background: #f5f794;
      position: absolute;
      left: -7px;
      top: -7px;
      border-radius: 50%;
      z-index: 50;
    }
    .fav {
      position: relative;
      padding-right: 20px;
    }
  }
}
.board {
  padding: $header-height 30px 0 30px;
  position: relative;
  z-index: 50;
  top: 120px;
  color: #333333;
  .title {
    font-size: 32px;
    font-weight: bold;
    &.center {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  .board-wrapper {
    padding: 35px 30px;
    background: #fff;
    border-radius: 12px;
    min-height: 375px;
    margin-bottom: 25px;
    box-shadow: 0px 8px 16px 0px rgba(36, 37, 37, 0.08);
  }
  table {
    width: 100%;
    line-height: 80px;
    border-collapse: collapse;
    border: 1px solid $border-color;
    color: #666666;
    thead {
      background: #f6f6f6;
    }
    tr {
      border-bottom: 1px solid $border-color;
    }
    td {
      width: 50%;
      text-align: center;
    }
  }
  .btn {
    height: 90px;
  }
  .sign-bar {
    padding: 60px 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 0;
    .item {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      position: relative;
      &:not(:last-child):before {
        content: '';
        position: absolute;
        width: 60px;
        height: 11px;
        background: #d4f8ee;
        right: -60px;
        top: 22px;
      }
      i {
        display: inline-block;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        color: #02d199;
        font-size: 16px;
        font-style: normal;
        border-radius: 50%;
        position: relative;
        width: 56px;
        height: 56px;
        background: #d4f8ee;
        position: relative;
        z-index: 0;
        // &.active {
        //   &:after {
        //     content: '';
        //     position: absolute;
        //     border-radius: 50%;
        //     width: 44px;
        //     height: 44px;
        //     background: #02d199;
        //   }
        // }
      }
      .active {
        color: #02d199;
        position: absolute;
        font-size: 44px;
        top: 7px;
        z-index: 60;
      }
      span {
        font-size: 24px;
        color: #777;
        padding-top: 20px;
      }
      .line {
        position: absolute;
        width: 70px;
        height: 4px;
        background: #02d199;
        right: -54px;
        top: 25px;
        z-index: 80;
      }
    }
  }
}
.sign-modal {
  position: fixed;
  width: 600px;
  height: 760px;
  left: 50%;
  top: 50%;
  margin-top: -380px;
  margin-left: -300px;
  background-image: url(~@/assets/images/sign.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  z-index: 80;
  text-align: center;
  .title {
    font-size: 34px;
    color: $primary-color;
    font-weight: bold;
    margin-top: 400px;
  }
  .desc {
    font-size: 28px;
    color: #aaafb5;
    padding: 30px 0 60px 0;
  }
  .btn {
    width: 400px;
    height: 90px;
  }
}
</style>
