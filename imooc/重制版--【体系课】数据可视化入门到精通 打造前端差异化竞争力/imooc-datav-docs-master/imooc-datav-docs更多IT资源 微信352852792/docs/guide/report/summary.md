# 知识点汇总

## Vue

### mixins
用于抽取公共代码

- 定义 mixins
```js
import CommonCard from '../components/CommonCard/index'

export default {
  components: {
    CommonCard
  }
}
```

- 消费 mixins
```html
<script>
  import commonCardMixin from '../../mixins/commonCardMixin'

  export default {
    mixins: [commonCardMixin]
  }
</script>
```

### slot
用于定义资源位，允许父组件动态修改资源位

- 定义插槽
```html
<div class="common-card">
  <div class="title">{{title}}</div>
  <div class="value">{{value}}</div>
  <div class="chart">
    <slot></slot>
  </div>
  <div class="line" />
  <div class="total">
    <slot name="footer"></slot>
  </div>
</div>
```

- 使用插槽
```html
<common-card
    title="累计销售额"
    value="¥ 32,039,165"
  >
  <template>
    <div class="total-sales-chart" />
  </template>
  <template v-slot:footer>
    <span>昨日销售额 </span>
    <span class="emphasis">¥ 30,000,000 </span>
  </template>
</common-card>
```

## element-ui

### el-row 和 el-col

- el-row gutter 属性控制间距
- el-col span 属性控制长度，总长度为 24

### el-card

- shadow=hover 鼠标悬浮时显示阴影

### 按需引用

安装 element-ui
```bash
vue add element
```

按需引用
```js
import Vue from 'vue'
import { Card, Row, Col } from 'element-ui'

Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
```

## ECharts

### Vue 引用 ECharts

- 定义
```js
import ECharts from 'echarts'

Vue.prototype.$echarts = ECharts
```

- 消费
```js
const chartDom = document.getElementById('today-users-chart')
const chart = this.$echarts.init(chartDom)
chart.setOption({
  // ...
})
```

### series

- 隐藏线条 
```js
lineStyle: {
  width: 0
}
```

- 隐藏数据点
```js
itemStyle: {
  opacity: 0
}
```

- 折线图填充面积区域颜色
```js
areaStyle: {
  color: 'purple'
}
```

- 将折线图平滑显示
```js
smooth: true
```

- 柱状图聚合

```js
series: [{
  type: 'bar',
  stack: '总量',
  data: [100]
}, {
  type: 'bar',
  stack: '总量',
  data: [250]
}]
```

- 自定义绘图

```js
{
  type: 'custom',
  stack: '总量',
  data: [100],
  renderItem: (params, api) => {
    const value = api.value(0)
    const endPoint = api.coord([value, 0])

    return {
      type: 'group',
      position: endPoint,
      children: [{
        type: 'path',
        shape: {
          d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
          x: -5,
          y: -20,
          width: 10,
          height: 10,
          layout: 'cover'
        },
        style: {
          fill: '#45c946'
        }
      }, {
        type: 'path',
        shape: {
          d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
          x: -5,
          y: 10,
          width: 10,
          height: 10,
          layout: 'cover'
        },
        style: {
          fill: '#45c946'
        }
      }]
    }
  }
}
```

### xAxis

- 消除 x 轴两侧边距
```js
boundaryGap: false
```

- 柱状图宽度

```js
barWidth: '60%'
barWidth: 10
```

- 条形图

```js
xAxis: {
  type: 'value'
},
yAxis: {
  type: 'category'
}
```

## CSS

### 绘制三角形

```css
.increase {
  width: 0;
  height: 0;
  border-width: 3px;
  border-color: transparent transparent red transparent;
  border-style: solid;
}
```
