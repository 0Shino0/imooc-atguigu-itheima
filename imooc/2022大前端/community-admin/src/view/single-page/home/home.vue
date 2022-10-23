<template>
  <div>
    <Row :gutter="20">
      <i-col
        :xs="12"
        :md="8"
        :lg="4"
        v-for="(infor, i) in inforCardData"
        :key="`infor-${i}`"
        style="height: 120px;padding-bottom: 10px;"
      >
        <infor-card
          shadow
          :color="infor.color"
          :icon="infor.icon"
          :icon-size="36"
          :key="timer1"
        >
          <count-to :end="infor.count" count-class="count-style" />
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie
            style="height: 300px;"
            :value="pieData"
            text="发帖统计"
            tipname="统计内容"
            :key="timer2"
          ></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar
            style="height: 300px;"
            :value="barData"
            text="近6月的累计发帖"
            :key="timer3"
          />
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow class="w100">
        <week-stat :key="timer4" :weekData="weekData" style="height: 310px;" />
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import WeekStat from './weekstat.vue'
import { getStatData } from '@/api/admin'
import moment from 'dayjs'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    WeekStat
  },
  data() {
    return {
      timer1: 0,
      timer2: 0,
      timer3: 0,
      timer4: 0,
      inforCardData: [
        {
          title: '新增用户',
          icon: 'md-person-add',
          count: 0,
          color: '#2d8cf0'
        },
        { title: '发帖累计', icon: 'md-locate', count: 0, color: '#19be6b' },
        {
          title: '新增评论',
          icon: 'md-chatbubbles',
          count: 0,
          color: '#ff9900'
        },
        {
          title: '本周采纳',
          icon: 'md-checkmark-circle',
          count: 0,
          color: '#ed3f14'
        },
        { title: '本周签到', icon: 'md-contacts', count: 0, color: '#E46CBB' },
        { title: '本周发帖', icon: 'md-map', count: 0, color: '#9A66E4' }
      ],
      pieData: [
        { value: 0, name: '提问' },
        { value: 0, name: '分享' },
        { value: 0, name: '讨论' },
        { value: 0, name: '建议' }
      ],
      barData: {},
      weekData: {}
    }
  },
  mounted() {
    //
    this.getData()
  },
  methods: {
    getData() {
      getStatData().then((res) => {
        if (res.code === 200) {
          // method 1
          // this.inforCardData.forEach((item, index) => {
          //   console.log('getData -> index', index)
          //   console.log('getData -> item', item)
          //   this.inforCardData.splice(index, 1, {
          //     ...this.inforCardData[index],
          //     count: res.data.inforCardData[index]
          //   })
          // })
          // method 2
          // this.inforCardData.forEach((item, index) => {
          //   this.$set(this.inforCardData, index, {
          //     ...this.inforCardData[index],
          //     count: res.data.inforCardData[index]
          //   })
          // })
          // method 3
          if (res.data.inforCardData) {
            this.inforCardData.forEach(
              (item, index) => (item.count = res.data.inforCardData[index])
            )
            this.timer1 = new Date().getTime()
          }
          if (res.data.pieData) {
            const arr = []
            const pieData = res.data.pieData
            arr.push({ name: '提问', value: pieData.ask || 0 })
            arr.push({ name: '分享', value: pieData.share || 0 })
            arr.push({ name: '讨论', value: pieData.discuss || 0 })
            arr.push({ name: '建议', value: pieData.advise || 0 })
            this.pieData = arr
            this.timer2 = new Date().getTime()
          }
          if (res.data.monthData) {
            const result = {}
            // 补足未有月份
            for (let i = 0; i <= 5; i++) {
              const key = moment()
                .subtract(5 - i, 'M')
                .format('YYYY-MM')
              result[key] = res.data.monthData[key] || 0 // key-value
            }
            this.barData = result
            this.timer3 = new Date().getTime()
          }
          if (res.data.weekData) {
            this.weekData = res.data.weekData
            this.timer4 = new Date().getTime()
          }
        }
        // 2. 左侧饼图数据
        if (res.code === 200) {
          console.log('getData -> res', res)
        }
      })
    }
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}

.w100 {
  width: 100%;
}
</style>
