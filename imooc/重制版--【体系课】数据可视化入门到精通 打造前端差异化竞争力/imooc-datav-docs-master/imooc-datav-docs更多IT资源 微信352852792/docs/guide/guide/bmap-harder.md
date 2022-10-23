# 百度地图进阶

## 百度地图绘图

包括：
- 绘制图标
- 绘制线段
- 绘制文本
- 绘制弹窗

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-layer.html"
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
	body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	</style>
	<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"></script>
	<title>地图展示</title>
</head>
<body>
	<div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
	var map = new BMapGL.Map("allmap");    // 创建Map实例
  var point = new BMapGL.Point(116.404, 39.915);
	map.centerAndZoom(point, 12);
	// map.enableScrollWheelZoom(true);
	map.setMapStyleV2({     
  	styleId: '556b6c846f130ec3ad0016f2eba410f6'
	});
	// var marker = new BMapGL.Marker(point);        // 创建标注   
	// map.addOverlay(marker);                     // 将标注添加到地图中
	var myIcon = new BMapGL.Icon("https://www.youbaobao.xyz/datav-res/datav/location.png", 
	  new BMapGL.Size(60, 60), {
			anchor: new BMapGL.Size(30, 30),
			imageOffset: new BMapGL.Size(0, 0)
		}
	);
	// 创建标注对象并添加到地图  
	var marker = new BMapGL.Marker(point, { icon: myIcon });
	marker.addEventListener("click", function(){   
    var opts = {
    	width: 250,     // 信息窗口宽度
    	height: 100,    // 信息窗口高度
    	title: "标题"  // 信息窗口标题
		}
		var infoWindow = new BMapGL.InfoWindow("内容", opts);  // 创建信息窗口对象
		map.openInfoWindow(infoWindow, point);        // 打开信息窗口
	});
	map.addOverlay(marker); 
	var polyline = new BMapGL.Polyline([
		new BMapGL.Point(116.399, 39.800),
		new BMapGL.Point(116.405, 39.810),
		new BMapGL.Point(116.425, 39.820)
	], {
		strokeColor: "blue",
		strokeWeight: 2,
		strokeOpacity: 0.5
	});
	map.addOverlay(polyline);
	var content = "欢迎学习数据可视化体系课";
	var label = new BMapGL.Label(content, {       // 创建文本标注
		position: point,                          // 设置标注的地理位置
		offset: new BMapGL.Size(200, 20)           // 设置标注的偏移量
	});
	label.setStyle({                              // 设置label的样式
    width: '100px',
		height: '20px',
		padding: '20px',
		color: '#fff',
    fontSize: '20px',
    border: '2px solid #1E90FF',
		background: 'red',
		whiteSpace: 'wrap',
		overflow: 'hidden',
		lineHeight: '20px'
	});
	label.addEventListener('click', function(e) {
		alert(e.target.content);
	});
	map.addOverlay(label);                        // 将标注添加到地图中
</script>
```
:::

## 百度地图动画

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-animation.html"
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
	body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	#allmap {position: relative;}
	#tools {position: absolute;left:0;top:0;z-index: 1000;}
	</style>
	<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"></script>
	<title>地图展示</title>
</head>
<body>
	<div id="allmap"></div>
	<div id="tools">
		<button id="start">播放动画</button>
		<button id="end">停止播放</button>
	</div>
</body>
</html>
<script type="text/javascript">
  var bmap = new BMapGL.Map("allmap");                          // 创建Map实例
	bmap.centerAndZoom(new BMapGL.Point(116.414, 39.915), 20);    // 初始化地图，设置中心点坐标和地图级别
	bmap.enableScrollWheelZoom(true);                             // 开启鼠标滚轮缩放
	bmap.setTilt(20);                              // 设置地图初始倾斜角度
	var keyFrames = [
		{
			center: new BMapGL.Point(116.307092,40.054922),
			zoom:20,
			tilt: 50,
			heading: 0,
			percentage: 0
		},
		{
			center: new BMapGL.Point(116.307631,40.055391),
			zoom: 21,
			tilt: 70,
			heading: 0,
			percentage: 0.1
		},
		{
			center: new BMapGL.Point(116.306858,40.057887),
			zoom:21,
			tilt: 70,
			heading: 0,
			percentage: 0.25
		},
		{
			center: new BMapGL.Point(116.306858,40.057887),
			zoom:21,
			tilt: 70,
			heading: -90,
			percentage: 0.35
		},
		{
			center: new BMapGL.Point(116.307904,40.058118),
			zoom: 21,
			tilt: 70,
			heading: -90,
			percentage: 0.45
		},
		{
			center: new BMapGL.Point(116.307904,40.058118),
			zoom: 21,
			tilt: 70,
			heading: -180,
			percentage: 0.55
		},
		{
			center: new BMapGL.Point(116.308902,40.055954),
			zoom:21,
			tilt: 70,
			heading: -180,
			percentage: 0.75
		},
		{
			center: new BMapGL.Point(116.308902,40.055954),
			zoom:21,
			tilt: 70,
			heading: -270,
			percentage: 0.85
		},
		{
			center: new BMapGL.Point(116.307779,40.055754),
			zoom:21,
			tilt: 70,
			heading: -360,
			percentage: 0.95
		},
		{
			center: new BMapGL.Point(116.307092,40.054922),
			zoom:20,
			tilt: 50,
			heading: -360,
			percentage: 1
		},
	];
	var opts = {
    duration: 10000,     // 设置每次迭代动画持续时间
    delay: 3000,         // 设置动画延迟开始时间
    interation: 'INFINITE'        // 设置动画迭代次数
	};
	var animation = new BMapGL.ViewAnimation(keyFrames, opts);        // 初始化动画实例
	animation.addEventListener('animationstart', function(e) {        // 监听动画开始事件
		console.log('start');
	});
	animation.addEventListener('animationiterations', function(e) {   // 监听动画迭代事件
		console.log('onanimationiterations');
	});
	animation.addEventListener('animationend', function(e) {        // 监听动画结束事件
		console.log('end');
	});
	animation.addEventListener('animationcancel', function(e) {       // 监听动画中途被终止事件
		console.log('cancel');
	});
	document.getElementById('start').addEventListener('click', function() {
		bmap.startViewAnimation(animation);         // 开始播放动画
	});
	document.getElementById('end').addEventListener('click', function() {
		bmap.cancelViewAnimation(animation);         // 强制停止动画
	});
</script>
```
:::

## 百度地图轨迹动画

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-track.html"
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
	body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	#allmap {position: relative;}
	#tools {position: absolute;left:0;top:0;z-index: 1000;}
	</style>
	<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"></script>
	<script type="text/javascript" src="https://api.map.baidu.com/library/TrackAnimation/src/TrackAnimation_min.js"></script>
	<title>地图展示</title>
</head>
<body>
	<div id="allmap"></div>
	<div id="tools">
		<button id="start">播放动画</button>
		<button id="end">停止播放</button>
	</div>
</body>
</html>
<script type="text/javascript">
  var bmap = new BMapGL.Map("allmap");                          // 创建Map实例
	bmap.centerAndZoom(new BMapGL.Point(116.297611, 40.047363), 17);    // 初始化地图，设置中心点坐标和地图级别
	bmap.enableScrollWheelZoom(true);                             // 开启鼠标滚轮缩放
	var path = [{
    'lng': 116.297611,
    'lat': 40.047363
	}, {
		'lng': 116.302839,
		'lat': 40.048219
	}, {
		'lng': 116.308301,
		'lat': 40.050566
	}, {
		'lng': 116.305732,
		'lat': 40.054957
	}, {
		'lng': 116.304754,
		'lat': 40.057953
	}, {
		'lng': 116.306487,
		'lat': 40.058312
	}, {
		'lng': 116.307223,
		'lat': 40.056379
	}];
	var point = [];
	for (var i = 0; i < path.length; i++) {
		point.push(new BMapGL.Point(path[i].lng, path[i].lat));
	}
	var pl = new BMapGL.Polyline(point);
	var trackAni = new BMapGLLib.TrackAnimation(bmap, pl, {
    overallView: true, // 动画完成后自动调整视野到总览
    tilt: 30,          // 轨迹播放的角度，默认为55
    duration: 20000,   // 动画持续时长，默认为10000，单位ms
    delay: 3000        // 动画开始的延迟，默认0，单位ms
	});
	document.getElementById('start').addEventListener('click', function() {
		trackAni.start();
	});
	document.getElementById('end').addEventListener('click', function() {
		trackAni.cancel();         // 强制停止动画
	});
</script>
```
:::
