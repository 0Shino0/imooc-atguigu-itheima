# AntV

[AntV](https://antv.vision/zh) 是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。

AntV 包括以下解决方案：

- G2：可视化引擎
- G2Plot：图表库
- G6：图可视化引擎
- Graphin：基于 G6 的图分析组件
- F2：移动可视化方案
- ChartCube：AntV 图表在线制作
- L7：地理空间数据可视化

## G2 案例：折线图

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-g2.html"
  width="100%"
  height="400"
/>

::: details
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://unpkg.com/@antv/g2plot@latest/dist/g2plot.js"></script>
  </head>
  <body>
    <div id="g2-chart"></div>
    <script>
      const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ];
      const chartDom = document.getElementById('g2-chart');
      const plot = new G2Plot.Line(chartDom, {
        title: {
          visible: true,
          text: 'g2折线图示例',
        },
        data,
        xField: 'year',
        yField: 'value',
        description: {
          visible: true,
          text: '折线图用于表示连续时间跨度内的数据，它通常用于显示某变量随时间的变化模式。',
        },
        point: {
          visible: true
        },
        label: {
          visible: true
        },
        color: '#FE740C',
        point: {
          visible: true,
          size: 5,
          color: 'white',
          style: {
            stroke: '#FE740C',
            lineWidth: 2,
            fillOpacity: 0.6,
          },
        },
        yAxis: {
          formatter: (v) => {
            return v + 'k';
          },
        },
      });
      plot.render();
    </script>
  </body>
</html>
```
:::

> 思考：Antv G2 的绘图流程是怎样的？

::: details
1. 引入 js 库
2. 编写渲染容器 DOM
3. 准备渲染数据
4. 获取渲染 DOM 对象
5. 初始化 G2 绘图对象（如：G2Plot.Line），配置绘图参数
6. 调用 render 完成渲染
:::

## G6 案例：绘制矢量图

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-g6.html"
  width="100%"
  height="400"
/>

::: details
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g6-3.4.8/dist/g6.min.js"></script>
  </head>
  <body>
    <div id="g6-chart"></div>
    <script>
      const data = {
        // 点集
        nodes: [
          {
            id: 'node1', // String，该节点存在则必须，节点的唯一标识
            x: 100, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
            label: '起始点', // 节点文本
            size: 60, // 元素的尺寸
            labelCfg: {           // 标签配置属性
              position: 'center',// 标签的属性，标签在元素中的位置
              style: {            // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
                fontSize: 12,     // 标签的文字大小
                fill: '#ffffff',  // 标签的文字颜色
              }
            },
            style: {              // 包裹样式属性的字段 style 与其他属性在数据结构上并行
              fill: '#ff0000',    // 样式属性，元素的填充色
              stroke: '#888',     // 样式属性，元素的描边色
              lineWidth: 1,       // 节点描边粗细
            }
          },
          {
            id: 'node2', // String，该节点存在则必须，节点的唯一标识
            x: 300, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
            label: '目标点1', // 节点文本
            size: 80, // 元素的尺寸
            labelCfg: {           // 标签配置属性
              position: 'center',// 标签的属性，标签在元素中的位置
              style: {            // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
                fontSize: 12,     // 标签的文字大小
                fill: '#ffffff',  // 标签的文字颜色
              }
            },
            style: {              // 包裹样式属性的字段 style 与其他属性在数据结构上并行
              fill: '#333',    // 样式属性，元素的填充色
              stroke: '#ccc',     // 样式属性，元素的描边色
              lineWidth: 2,       // 节点描边粗细
            }
          },
          {
            id: 'node3', // String，该节点存在则必须，节点的唯一标识
            x: 500, // Number，可选，节点位置的 x 值
            y: 200, // Number，可选，节点位置的 y 值
            label: '目标点2', // 节点文本
            size: 100, // 元素的尺寸
            labelCfg: {           // 标签配置属性
              position: 'center',// 标签的属性，标签在元素中的位置
              style: {            // 包裹标签样式属性的字段 style 与标签其他属性在数据结构上并行
                fontSize: 12,     // 标签的文字大小
                fill: '#ffffff',  // 标签的文字颜色
              }
            },
            style: {              // 包裹样式属性的字段 style 与其他属性在数据结构上并行
              fill: 'green',    // 样式属性，元素的填充色
              stroke: '#ccc',     // 样式属性，元素的描边色
              lineWidth: 2,       // 节点描边粗细
            }
          }
        ],
        // 边集
        edges: [
          {
            source: 'node1', // String，必须，起始点 id
            target: 'node2', // String，必须，目标点 id
            label: '连接线1', // 边的文本
          },
          {
            source: 'node2', // String，必须，起始点 id
            target: 'node3', // String，必须，目标点 id
            label: '连接线2', // 边的文本
          },
        ],
      };
      const graph = new G6.Graph({
        container: 'g6-chart', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 800, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
      });
      graph.data(data); // 读取 Step 2 中的数据源到图上
      graph.render(); // 渲染图
    </script>
  </body>
</html>
```
:::

> 思考：Antv G6 的绘图流程是怎样的？

::: details
1. 引入 js 库
2. 编写渲染容器 DOM
3. 准备渲染数据
4. 获取渲染 DOM 对象
5. 初始化 G6 绘图对象（如：G6.Graph），配置绘图参数
6. 调用 render 完成渲染
:::

## L7 案例：气泡图

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-l7.html"
  width="100%"
  height="600"
/>

::: details
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>创建地图场景</title>
    <style>
       html,body{overflow:hidden;margin:0;}
    	#map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
</head>
<body>
<div id="map"></div>
<script src="https://unpkg.com/@antv/l7"></script>
<script>

  const scene = new L7.Scene({
    id: 'map',
    map: new L7.GaodeMap({
      style: 'dark', // 样式URL
      center: [120.19382669582967, 30.258134],
      pitch: 0,
      zoom: 6,
      token: '***',
    }),
  });

  scene.on('loaded', () => {
    fetch(
      'https://gw.alipayobjects.com/os/basement_prod/337ddbb7-aa3f-4679-ab60-d64359241955.json'
    )
      .then(res => res.json())
      .then(data => {
        data.features = data.features.filter(item => {
          return item.properties.capacity > 800;
        });
        const pointLayer = new L7.PointLayer({})
          .source(data)
          .shape('circle')
          .size('capacity', [ 0, 16 ])
          .color('capacity', [
            '#34B6B7',
            '#4AC5AF',
            '#5FD3A6',
            '#7BE39E',
            '#A1EDB8',
            '#CEF8D6'
          ])
          .active(true)
          .style({
            opacity: 0.5,
            strokeWidth: 0
          });

        scene.addLayer(pointLayer);
      });
  });

</script>
</body>
</html>
```
:::

> 思考：Antv L7 的绘图流程是怎样的？

::: details
1. 引入 js 库
2. 编写渲染容器 DOM
3. 初始化地图对象 L7.Scene
4. 请求数据
5. 数据清洗
6. 初始化绘图对象（如：L7.PointLayer）
7. 调用 L7.Scene.addLayer 方法绘图
:::

> [查看](https://l7.antv.vision/zh/docs/tutorial/map/amap)高德地图 key 获取方法
