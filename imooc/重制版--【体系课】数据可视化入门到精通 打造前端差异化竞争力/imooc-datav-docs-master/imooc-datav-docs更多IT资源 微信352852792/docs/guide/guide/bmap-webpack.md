# 百度地图 + Vue

## 基本用法

1. 引入 js 库

```html
<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"></script>
```

2. 挂载 Vue 实例

```js
Vue.prototype.$bmap = window.BMapGL
```

3. 编写代码

```html
<template>
  <div id="bmap" />
</template>

<script>
  export default {
    mounted() {
      const { Map, Point } = this.$bmap
      const map = new Map('bmap')
      const point = new Point(116.404, 39.915)
      map.centerAndZoom(point, 12)
      map.enableScrollWheelZoom(true)
    }
  }
</script>

<style>
  #bmap {
    width: 100%;
    height: 100%;
  }
</style>
```

注意以下问题：
- 容器 div 需要使用 id
- 容器 div 需要指定宽高

其余用法与 html 中编码无异

## 百度地图组件封装

封装 BaiduMap 组件：

```html
<template>
  <div :id="bmapId" :style="{ width: '100%', height: '100%' }" />
</template>

<script>
  export default {
    props: {
      point: Array,
      zoom: Number,
      enableScroll: Boolean
    },
    data() {
      return {
        bmapId: `bmap-${new Date().getTime()}`
      }
    },
    mounted() {
      const { Map, Point } = this.$bmap
      const map = new Map(this.bmapId)
      const point = new Point(this.point[0], this.point[1])
      map.centerAndZoom(point, this.zoom)
      map.enableScrollWheelZoom(this.enableScroll)
    }
  }
</script>
```

优化上节中的源码：

```html
<template>
  <baidu-map
    :point="[116.404, 39.915]"
    :zoom="12"
    enable-scroll
  />
</template>

<script>
  import BaiduMap from '../components/BaiduMap'

  export default {
    components: { BaiduMap }
  }
</script>
```

## 飞线地图移植

添加依赖

```html
<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"></script>
<script src="https://mapv.baidu.com/gl/examples/static/common.js"></script>
<script src="https://mapv.baidu.com/build/mapv.js"></script>
<script src="https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.54/dist/mapvgl.min.js"></script>
<script src="https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.54/dist/mapvgl.threelayers.min.js"></script>
```

在 main.js 中添加百度地图相关对象

```js
Vue.prototype.$bmap = window.BMapGL
Vue.prototype.$initMap = window.initMap
Vue.prototype.$mapvgl = window.mapvgl
Vue.prototype.$mapv = window.mapv
Vue.prototype.$purpleStyle = window.purpleStyle
```

代码移植和修改

```html
<template>
  <div id="map_container" />
</template>

<script>
  export default {
    mounted() {
      const map = this.$initMap({
        tilt: 60,
        heading: 0,
        center: [103.438656, 25.753594],
        zoom: 6,
        style: this.$purpleStyle
      })

      const initData = () => {
        const data = []
        const cities = [
          '北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春',
          '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州',
          '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口'
        ]
        let randomCount = 100 // 模拟的飞线的数量
        const curve = new this.$mapvgl.BezierCurve()
        // 构造数据
        while (randomCount--) {
          const startPoint = this.$mapv.utilCityCenter.getCenterByCityName(cities[parseInt(Math.random() * cities.length, 10)])
          const endPoint = this.$mapv.utilCityCenter.getCenterByCityName(cities[parseInt(Math.random() * cities.length, 10)])
          curve.setOptions({
            start: [startPoint.lng, startPoint.lat],
            end: [endPoint.lng, endPoint.lat]
          })
          const curveModelData = curve.getPoints()
          data.push({
            geometry: {
              type: 'LineString',
              coordinates: curveModelData
            },
            properties: {
              count: Math.random()
            }
          })
        }
        return data
      }

      const setData = (data) => {
        const view = new this.$mapvgl.View({
          map: map
        })

        const flylineLayer = new this.$mapvgl.FlyLineLayer({
          style: 'chaos',
          step: 0.3,
          color: 'rgba(33, 242, 214, 0.3)',
          textureColor: function(data) {
            return data.properties.count > 0.5 ? '#ff0000' : '#56ccdd'
          },
          textureWidth: 20,
          textureLength: 10
        })
        view.addLayer(flylineLayer)
        flylineLayer.setData(data)
      }

      setData(initData())
    }
  }
</script>

<style>
  #map_container {
    width: 100%;
    height: 100%;
  }
</style>
```

## 炫酷飞线地图移植

```html
<template>
  <div id="map" />
</template>

<script>
  import styleJson from '@/assets/style.json'

  /* eslint-disable */
  export default {
    mounted() {
      const map = new this.$bmap2.Map('map', {
        enableMapClick: false
      })
      map.centerAndZoom(new this.$bmap2.Point(108.154518, 36.643346), 5)
      map.enableScrollWheelZoom(true)
      map.setMapStyle({
        styleJson
      })
      const randomCount = 500
      const nodeData = {
        0: { x: 108.154518, y: 36.643346 },
        1: { x: 121.485124, y: 31.235317 }
      }
      const edgeData = [
        { source: '1', target: '0' }
      ]
      const cities = ['北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口']
      // 构造数据
      for (let i = 1; i < randomCount; i++) {
        const cityCenter = this.$mapv.utilCityCenter.getCenterByCityName(cities[parseInt(Math.random() * cities.length)])
        nodeData[i] = {
          x: cityCenter.lng - 5 + Math.random() * 10,
          y: cityCenter.lat - 5 + Math.random() * 10
        }
        edgeData.push({
          source: ~~(i * Math.random()),
          target: '0'
        })
      }
      const fbundling = this.$mapv.utilForceEdgeBundling()
        .nodes(nodeData)
        .edges(edgeData)

      const results = fbundling()
      const data = []
      const timeData = []
      for (let i = 0; i < results.length; i++) {
        const line = results[i]
        const coordinates = []
        for (let j = 0; j < line.length; j++) {
          coordinates.push([line[j].x, line[j].y])
          timeData.push({
            geometry: {
              type: 'Point',
              coordinates: [line[j].x, line[j].y]
            },
            count: 1,
            time: j
          })
        }
        data.push({
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        })
      }

      let dataSet = new this.$mapv.DataSet(data)

      let options = {
        strokeStyle: 'rgba(55, 50, 250, 0.3)',
        globalCompositeOperation: 'lighter',
        shadowColor: 'rgba(55, 50, 250, 0.5)',
        shadowBlur: 10,
        methods: {
          click: function(item) {
          }
        },
        lineWidth: 1.0,
        draw: 'simple'
      }

      let mapvLayer = new this.$mapv.baiduMapLayer(map, dataSet, options)
      dataSet = new this.$mapv.DataSet(timeData)
      options = {
        fillStyle: 'rgba(255, 250, 250, 0.9)',
        globalCompositeOperation: 'lighter',
        size: 1.5,
        animation: {
          type: 'time',
          stepsRange: {
            start: 0,
            end: 100
          },
          trails: 1,
          duration: 5
        },
        draw: 'simple'
      }
      mapvLayer = new this.$mapv.baiduMapLayer(map, dataSet, options)
    }
  }
</script>

<style>
  #map {
    width: 100%;
    height: 100%;
  }
</style>
```
