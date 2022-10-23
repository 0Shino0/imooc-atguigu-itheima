<template>
  <div class="sales-map">
    <div class="sales-map-inner">
      <div id="map_container" />
    </div>
  </div>
</template>

<script>
  export default {
    mounted () {
      // 初始化百度地图
      const initBMap = () => {
        const map = this.$initMap({
          tilt: 0,
          center: [108.154518, 36.643346],
          zoom: 4,
          style: this.$darkStyle
        })
        return map
      }
      const initData = () => {
        const randomCount = 500
        const nodeData = [
          {
            x: 108.154518,
            y: 36.643346
          }
        ]
        const edgeData = [
          {
            source: 1,
            target: 0
          }
        ]
        const cities = [
          '北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口'
        ]
        // 构造数据
        for (let i = 1; i < randomCount; i++) {
          const cityCenter = this.$mapv.utilCityCenter.getCenterByCityName(cities[parseInt(Math.random() * cities.length)])
          nodeData.push({
            x: cityCenter.lng - 5 + Math.random() * 10,
            y: cityCenter.lat - 5 + Math.random() * 10
          })
          edgeData.push({
            source: parseInt(i * Math.random()),
            target: 0
          })
        }
        const fbundling = this.$mapv.utilForceEdgeBundling()
          .nodes(nodeData)
          .edges(edgeData)
        const results = fbundling()
        const data = []
        for (let i = 0; i < results.length; i++) {
          const line = results[i]
          const coordinates = []
          for (let j = 0; j < line.length; j++) {
            coordinates.push([line[j].x, line[j].y])
          }
          data.push({
            geometry: {
              type: 'LineString',
              coordinates: coordinates
            }
          })
        }
        return {
          lineData: data
        }
      }
      const setData = ({ lineData }) => {
        const view = new this.$mapvgl.View({ map })
        const lineLayer = new this.$mapvgl.LineLayer({
          color: 'rgba(55, 50, 250, 0.3)',
          blend: 'lighter'
        })
        view.addLayer(lineLayer)
        lineLayer.setData(lineData)
        const linePointLayer = new this.$mapvgl.LinePointLayer({
          size: 8,
          speed: 10,
          color: 'rgba(255, 255, 0, 0.6)',
          animationType: this.$mapvgl.LinePointLayer.ANIMATION_TYPE_SMOOTH,
          shapeType: this.$mapvgl.LinePointLayer.SHAPE_TYPE_CIRCLE,
          blend: 'lighter'
        })
        view.addLayer(linePointLayer)
        linePointLayer.setData(lineData)
      }

      const map = initBMap()
      const data = initData()
      setData(data)
    }
  }
</script>

<style>
  .anchorBL {
    width: 0;
    height: 0;
  }
</style>
<style lang="scss" scoped>
  .sales-map {
    position: absolute;
    top: 1850px;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 600px;
    padding: 25px 25px 0;
    box-sizing: border-box;

    .sales-map-inner {
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .05);
      #map_container {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
