# 百度地图可视化

- [官方文档](http://lbsyun.baidu.com/solutions/solutions/mapvdata)
- [官方文档2](http://lbsyun.baidu.com/solutions/solutions/visualization)
- [官方示例](http://lbsyun.baidu.com/solutions/solutions/mapvdata)
- [官方示例2](https://mapv.baidu.com/gallery.html)

## 百度地图绘制点

百度地图可视化通过 mapv 和 mapvgl 解决

> [全屏预览](https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-point.html)

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-point.html"
  width="100%"
  height="400"
/>

::: details
```html
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
		html,
    body {
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
    }
    #map_container {
			width: 100%;
			height: 100%;
			margin: 0;
    }
	</style>
	<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"></script>
	<script src="https://mapv.baidu.com/gl/examples/static/common.js"></script>
	<script src="https://mapv.baidu.com/build/mapv.js"></script>
	<script src="https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.54/dist/mapvgl.min.js"></script>
	<title>地图展示</title>
</head>
<body>
	<div id="map_container"></div>
	<script type="text/javascript">
		var map = initMap({
			tilt: 0,
			heading: 0,
			center: [103.438656,25.753594],
			zoom: 8,
			style: snowStyle,
			skyColors: [
				// 地面颜色
				'rgba(226, 237, 248, 0)',
				// 天空颜色
				'rgba(186, 211, 252, 1)'
			]
		});
		setData(initData());
		function initData() {
			var data = [];
			var citys = [
				'北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春',
				'沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州',
				'南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口'
			];
	    var randomCount = 700;
    	// 构造数据
    	while (randomCount--) {
        var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)]);
        data.push({
					geometry: {
						type: 'Point',
						coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
					},
					properties: {
						count: Math.random() * 100
					}
        });
    	}
			return data;
		}
		function setData(data) {
			var view = new mapvgl.View({
        map: map
    	});

    	var intensity = new mapvgl.Intensity({
        max: 100,
        min: 0,
        gradient: {
					0: 'rgb(25, 66, 102, 0.8)',
					0.3: 'rgb(145, 102, 129, 0.8)',
					0.7: 'rgb(210, 131, 137, 0.8)',
					1: 'rgb(248, 177, 149, 0.8)'
        },
        maxSize: 30,
        minSize: 5
    	});

    	var pointLayer = new mapvgl.PointLayer({
        blend: 'lighter',
        size: function (data) {
					return intensity.getSize(data.properties.count);
        },
        color: function (data) {
					return intensity.getColor(data.properties.count);
        }
    	});

    	view.addLayer(pointLayer);
    	pointLayer.setData(data);
		}
	</script>	
</body>
</html>
```
:::

> 思考：百度地图mapv开发流程是怎样的？

::: details
1. 引入 js 库
    - 百度地图 js
    - 百度地图 mapv
    - 百度地图 mapvgl
2. 编写容器组件
3. 初始化 Map 对象
4. 初始化绘制数据，数据格式为：
```js
[{
  geometry: {
    type: 'Point',
    coordinates: [x, y]
  },
  properties: {
    count: Math.random() * 100
    // other properties...
  }
}, {
  // other data...
}]
```
5. 初始化 mapvgl.View 图层管理器
6. 初始化 mapvgl.Intensity 数据显示强度
7. 初始化 mapvgl.PointLayer 图层
8. 调用 view.addLayer 添加图层到图层管理器
9. 调用 mapvgl.PointLayer.setData 关联图层和数据
:::

## 百度地图飞线动画

> [全屏预览](https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-line.html)

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-line.html"
  width="100%"
  height="400"
/>

::: details
```html
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
		html,
    body {
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
    }
    #map_container {
			width: 100%;
			height: 100%;
			margin: 0;
    }
	</style>
	<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"></script>
	<script src="https://mapv.baidu.com/gl/examples/static/common.js"></script>
	<script src="https://mapv.baidu.com/build/mapv.js"></script>
	<script src="https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.54/dist/mapvgl.min.js"></script>
	<script src="https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.54/dist/mapvgl.threelayers.min.js"></script>
	<title>地图展示</title>
</head>
<body>
	<div id="map_container"></div>
	<script type="text/javascript">
		var map = initMap({
			tilt: 60,
			heading: 0,
			center: [103.438656,25.753594],
			zoom: 6,
			style: purpleStyle
		});
		setData(initData());
		function initData() {
			var data = [];
			var citys = [
				'北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨', '长春',
				'沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州', '武汉', '长沙', '广州',
				'南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐', '成都', '贵阳', '昆明', '拉萨', '海口'
			];
	    var randomCount = 100; // 模拟的飞线的数量
   		var curve = new mapvgl.BezierCurve();
	    // 构造数据
  	  while (randomCount--) {
        var startPoint = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)]);
        var endPoint = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)])
        curve.setOptions({
					start: [startPoint.lng, startPoint.lat],
					end: [endPoint.lng, endPoint.lat]
        });
        var curveModelData = curve.getPoints();
        data.push({
					geometry: {
						type: 'LineString',
						coordinates: curveModelData
					},
					properties: {
						count: Math.random()
					}
        });
    	}
			return data;
		}
		function setData(data) {
			var view = new mapvgl.View({
        map: map
    	});

			var flylineLayer = new mapvgl.FlyLineLayer({
        style: 'chaos',
        step: 0.3,
        color: 'rgba(33, 242, 214, 0.3)',
        textureColor: function (data) {
            return data.properties.count > 0.5 ? '#ff0000' : '#56ccdd';
        },
        textureWidth: 20,
        textureLength: 10
    	});
    	view.addLayer(flylineLayer);
    	flylineLayer.setData(data);
		}
	</script>	
</body>
</html>
```
:::

## 百度地图3D建筑

> [全屏预览](https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-shape.html)
>
<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-shape.html"
  width="100%"
  height="400"
/>

::: details
```html
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
		html,
    body {
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
    }
    #map_container {
			width: 100%;
			height: 100%;
			margin: 0;
    }
	</style>
	<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"></script>
	<script src="https://mapv.baidu.com/gl/examples/static/common.js"></script>
	<script src="https://mapv.baidu.com/build/mapv.js"></script>
	<script src="https://code.bdstatic.com/npm/mapvgl@1.0.0-beta.54/dist/mapvgl.min.js"></script>
	<title>地图展示</title>
</head>
<body>
	<div id="map_container"></div>
	<script type="text/javascript">
		var map = initMap({
			tilt: 80,
			heading: -45.3,
			center: [106.540547,29.564858],
			zoom: 17
    });
		initData();
		function initData() {
			fetch('https://www.youbaobao.xyz/datav-res/examples/chongqing.json')
				.then(res => res.json())
				.then(res => {
					var data = res;
					var polygons = [];
        	var len = data.length;
        	for (var i = 0; i < len; i++) {
            var line = data[i];
            var polygon = [];
            var pt = [line[1] * 512, line[2] * 512];
            for (var j = 3; j < line.length; j += 2) {
							pt[0] += line[j] / 100 / 2;
							pt[1] += line[j + 1] / 100 / 2;
							polygon.push([pt[0], pt[1]]);
            }
            polygons.push({
							geometry: {
								type: 'Polygon',
								coordinates: [polygon]
							},
							properties: {
								height: line[0] / 2
							}
            });
        	}
					setData(polygons);
				});
		}
		function setData(data) {
			console.log(data);
			var view = new mapvgl.View({
        map: map
    	});

			var shaperLayer = new mapvgl.ShapeLayer({
				color: 'rgb(0, 255, 255)',
    		blend: 'lighter',
    		// style: 'normal',
				// style: 'gradual',
				style: 'windowAnimation',
				opacity: 1.0, // 透明度
				riseTime: 2000, // 楼房升起动画
			});

			view.addLayer(shaperLayer);
			shaperLayer.setData(data);
		}
	</script>	
</body>
</html>
```
:::

## 百度地图炫酷飞线图

> [全屏预览](https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-fly.html)
>
<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-fly.html"
  width="100%"
  height="400"
/>

::: details
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title></title>

    <style type="text/css">
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        #map {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>

    <div id="map"></div>
    <canvas id="canvas"></canvas>

    <script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=1XjLLEhZhQNUzd93EjU5nOGQ"></script>
    <script type="text/javascript" src="https://mapv.baidu.com/build/mapv.js"></script>

    <script type="text/javascript">

        // 百度地图API功能
        var map = new BMap.Map("map", {
            enableMapClick: false
        });    // 创建Map实例
        map.centerAndZoom(new BMap.Point(108.154518,36.643346), 5);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

        // 地图自定义样式
        map.setMapStyle({
            styleJson: [{
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#044161"
                }
            }, {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#091934"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                    "color": "#064f85"
                }
            }, {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#005b96",
                    "lightness": 1
                }
            }, {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                    "visibility": "on"
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981",
                    "lightness": -39
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#00508b"
                }
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                    "color": "#056197",
                    "visibility": "off"
                }
            }, {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#029fd4"
                }
            }, {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                    "color": "#1a5787"
                }
            }, {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": {
                    "color": "#ffffff"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": {
                    "color": "#1e1c1c"
                }
            }, {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            },{
                "featureType": "road",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }]
        });

        var randomCount = 500;

        var node_data = {
            "0":{"x":108.154518, "y":36.643346},
            "1":{"x":121.485124, "y":31.235317},
        };

        var edge_data = [
            {"source":"1", "target":"0"}
        ]

        var citys = ["北京","天津","上海","重庆","石家庄","太原","呼和浩特","哈尔滨","长春","沈阳","济南","南京","合肥","杭州","南昌","福州","郑州","武汉","长沙","广州","南宁","西安","银川","兰州","西宁","乌鲁木齐","成都","贵阳","昆明","拉萨","海口"];

        // 构造数据
        for (var i = 1; i < randomCount; i++) {
            var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            node_data[i] = {
                x: cityCenter.lng - 5 + Math.random() * 10,
                y: cityCenter.lat - 5 + Math.random() * 10,
            }
            edge_data.push(
                {"source": ~~(i * Math.random()), "target": '0'}
            );
        }

        var fbundling = mapv.utilForceEdgeBundling()
                        .nodes(node_data)
                        .edges(edge_data);

        var results = fbundling();  

        var data = [];
        var timeData = [];

        for (var i = 0; i < results.length; i++) {
            var line = results[i];
            var coordinates = [];
            for (var j = 0; j < line.length; j++) {
                coordinates.push([line[j].x, line[j].y]);
                timeData.push({
                    geometry: {
                        type: 'Point',
                        coordinates: [line[j].x, line[j].y]
                    },
                    count: 1,
                    time: j
                });
            }
            data.push({
                geometry: {
                    type: 'LineString',
                    coordinates: coordinates
                }
            });
        }

        var dataSet = new mapv.DataSet(data);

        var options = {
            strokeStyle: 'rgba(55, 50, 250, 0.3)',
            globalCompositeOperation: 'lighter',
            shadowColor: 'rgba(55, 50, 250, 0.5)',
            shadowBlur: 10,
            methods: {
                click: function (item) {
                }
            },
            lineWidth: 1.0,
            draw: 'simple'
        }

        var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

        var dataSet = new mapv.DataSet(timeData);

        var options = {
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
                duration: 5,
            },
            draw: 'simple'
        }

        var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

    </script>
	
</body>
</html>
```
:::

## 百度地图慕课外卖指数

> [全屏预览](https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-star.html)

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-datav-star.html"
  width="100%"
  height="400"
/>

::: details
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title></title>

    <style type="text/css">
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        #map {
            width: 100%;
            height: 100%;
        }

        #time {
            position: absolute;
            right: 10px;
            bottom: 10px;
            color: #fff;
            padding: 10px;
            background: rgba(255, 255, 255, 0.3);
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <canvas id="canvas"></canvas>
    <div id="time"></div>

    <script type="text/javascript" src="https://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=1XjLLEhZhQNUzd93EjU5nOGQ"></script>
    <script type="text/javascript" src="https://mapv.baidu.com/build/mapv.js"></script>

    <script type="text/javascript">

        // 百度地图API功能
        var map = new BMap.Map("map", {
            enableMapClick: false
        });    // 创建Map实例
        map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

        // 地图自定义样式
        map.setMapStyle({
            styleJson: [{
                "featureType": "water",
                "elementType": "all",
                "stylers": {
                    "color": "#044161"
                }
            }, {
                "featureType": "land",
                "elementType": "all",
                "stylers": {
                    "color": "#091934"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry",
                "stylers": {
                    "color": "#064f85"
                }
            }, {
                "featureType": "railway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981"
                }
            }, {
                "featureType": "highway",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#005b96",
                    "lightness": 1
                }
            }, {
                "featureType": "highway",
                "elementType": "labels",
                "stylers": {
                    "visibility": "on"
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry",
                "stylers": {
                    "color": "#004981",
                    "lightness": -39
                }
            }, {
                "featureType": "arterial",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#00508b"
                }
            }, {
                "featureType": "poi",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "green",
                "elementType": "all",
                "stylers": {
                    "color": "#056197",
                    "visibility": "off"
                }
            }, {
                "featureType": "subway",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "manmade",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "local",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "arterial",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "boundary",
                "elementType": "geometry.fill",
                "stylers": {
                    "color": "#029fd4"
                }
            }, {
                "featureType": "building",
                "elementType": "all",
                "stylers": {
                    "color": "#1a5787"
                }
            }, {
                "featureType": "label",
                "elementType": "all",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": {
                    "color": "#ffffff"
                }
            }, {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": {
                    "color": "#1e1c1c"
                }
            }, {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": {
                    "visibility": "on"
                }
            },{
                "featureType": "road",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }]
        });

        $.get('https://www.youbaobao.xyz/datav-res/examples/weibo.json', function (rs) {
            console.log(rs);
            var data1 = [];
            var data2 = [];
            var data3 = [];
            var data4 = [];
            for (var i = 0; i < rs[0].length; i++) {
                var geoCoord = rs[0][i].geoCoord;
                data1.push({
                    geometry: {
                        type: 'Point',
                        coordinates: geoCoord 
                    }
                });
            }

            for (var i = 0; i < rs[1].length; i++) {
                var geoCoord = rs[1][i].geoCoord;
                data2.push({
                    geometry: {
                        type: 'Point',
                        coordinates: geoCoord 
                    },
                    time: Math.random() * 10
                });
            }

            for (var i = 0; i < rs[2].length; i++) {
                var geoCoord = rs[2][i].geoCoord;
                data3.push({
                    geometry: {
                        type: 'Point',
                        coordinates: geoCoord 
                    },
                });
            }

            var dataSet = new mapv.DataSet(data1);
            var options = {
                fillStyle: 'rgba(200, 200, 0, 0.8)',
                bigData: 'Point',
                size: 0.7,
                draw: 'simple',
            }
            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

            var dataSet = new mapv.DataSet(data2);
            var options = {
                fillStyle: 'rgba(255, 250, 0, 0.8)',
                size: 0.7,
                bigData: 'Point',
                draw: 'simple',
            }
            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

            var dataSet = new mapv.DataSet(data3);
            var options = {
                fillStyle: 'rgba(255, 250, 250, 0.6)',
                size: 0.7,
                bigData: 'Point',
                draw: 'simple',
            }
            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

            var dataSet = new mapv.DataSet(data2);
            var options = {
                fillStyle: 'rgba(255, 250, 250, 0.9)',
                size: 1.1,
                draw: 'simple',
                bigData: 'Point',
                animation: {
                    stepsRange: {
                        start: 0,
                        end: 10
                    },
                    trails: 1,
                    duration: 6,
                }
            }
            var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
        });
    </script>
</body>
</html>
```
:::
