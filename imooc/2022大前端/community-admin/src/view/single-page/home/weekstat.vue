<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import moment from 'dayjs'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  props: {
    weekData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dom: null,
      dateArr: [],
      seriesArr: [],
      labelOptions: {
        show: true,
        position: 'top',
        distance: 10,
        align: 'center',
        verticalAlign: 'middle',
        rotate: 0,
        formatter: '{c}',
        fontSize: 12
        // rich: {
        //   name: {
        //     textBorderColor: '#fff'
        //   }
        // }
      },
      option: null
    }
  },
  methods: {
    resize() {
      this.dom.resize()
    },
    initDom() {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(this.option)
      on(window, 'resize', this.resize)
    }
  },
  mounted() {
    // window.vue = this
    this.dateArr = []
    for (let i = 0; i <= 6; i++) {
      this.dateArr.push(
        moment()
          .subtract(6 - i, 'day')
          .format('YYYY-MM-DD')
      )
    }
    // this.seriesArr = []
    Object.keys(this.weekData).forEach((key) => {
      let name = ''
      if (key === 'user') {
        name = '新增用户'
      } else if (key === 'sign') {
        name = '签到总数'
      } else if (key === 'post') {
        name = '发帖总数'
      } else if (key === 'comments') {
        name = '回复总数'
      }
      this.seriesArr.push({
        name: name,
        type: 'bar',
        barGap: 0,
        data: this.weekData[key],
        label: this.labelOptions
      })
    })
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: this.dateArr
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: this.seriesArr
    }
    this.option = option
    this.$nextTick(this.initDom)
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  }
}
</script>
