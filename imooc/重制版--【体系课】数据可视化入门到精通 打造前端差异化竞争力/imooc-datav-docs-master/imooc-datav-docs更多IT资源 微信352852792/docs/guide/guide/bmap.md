# 百度地图入门

## 百度开发者账号申请

- [官方教程](http://lbsyun.baidu.com/index.php?title=jspopularGL/guide/getkey)
- [控制台](http://lbsyun.baidu.com/apiconsole/key#/home)
- [API](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_webgl_1_0.html#a0b0)

## 基本用法

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap.html"
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
	var map = new BMapGL.Map("allmap"); // 创建Map实例
    var point = new BMapGL.Point(116.404, 39.915); // 初始化中心点坐标 
	map.centerAndZoom(point, 12);  // 初始化地图，设置中心点坐标和地图级别
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
</script>
```
:::

> 思考：百度地图的绘图流程是怎样的？

::: details
1. 引入 js 库，注意需要附带申请的密钥 ak
2. 编写容器组件
3. 初始化 Map 对象
4. 初始化 Point 对象
5. 设置中心点和地图级别
:::

## 异步加载

在对性能敏感的场景下，我们可以选择异步加载百度地图，从而加快首屏的渲染速度

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-async.html"
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
	<title>异步地图展示</title>
</head>
<body>
	<div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
	function init() { 
		var map = new BMapGL.Map('allmap'); 
		var point = new BMapGL.Point(116.404, 39.915);
		map.centerAndZoom(point, 12);
		map.enableScrollWheelZoom(true);
	} 
			
	function loadScript() { 
		var script = document.createElement("script"); 
		script.src = "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb&callback=init";
		document.body.appendChild(script); 
	} 
			
	window.onload = loadScript;
</script>
```
:::

## 3D地图

我们可以使用 heading 和 tilt 属性控制地图的旋转角度和俯角

> [官方文档](http://lbsyun.baidu.com/index.php?title=jspopularGL/guide/show)

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-3d.html"
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
	#allmap { position: relative; }
	#tools { position: absolute; left: 0; top: 0; z-index: 1000;}
	.tools-bar { display: flex; }
	.label { width: 80px; text-align: right; }
	</style>
	<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb"></script>
	<title>地图展示</title>
</head>
<body>
	<div id="allmap"></div>
	<div id="tools">
		<div class="tools-bar">
			<div class="label">heading:</div>
			<button id="heading-add">+</button>
			<input type="text" id="heading" value="40">
			<button id="heading-minus">-</button>
		</div>
		<div class="tools-bar">
			<div class="label">tilt:</div>
			<button id="tilt-add">+</button>
			<input type="text" id="tilt" value="70">
			<button id="tilt-minus">-</button>
		</div>
		<div class="tools-bar">
			<button id="loop">loop</button>
			<button id="stop">stop</button>
		</div>
	</div>
</body>
</html>
<script type="text/javascript">
    // GL版命名空间为BMapGL
    // 按住鼠标右键，修改倾斜角和角度
	var map = new BMapGL.Map("allmap");    // 创建Map实例
  var point = new BMapGL.Point(116.280190, 40.049191);
	map.centerAndZoom(point, 19);  // 初始化地图,设置中心点坐标和地图级别
	map.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
	map.setHeading(40);   // 设置地图旋转角度
	map.setTilt(70);       // 设置地图的倾斜角度
	var heading = document.getElementById('heading');
	var headingAdd = document.getElementById('heading-add');
	var headingMinus = document.getElementById('heading-minus');
	var tilt = document.getElementById('tilt');
	var tiltAdd = document.getElementById('tilt-add');
	var tiltMinus = document.getElementById('tilt-minus');
	heading.addEventListener('input', function(e) {
		map.setHeading(e.target.value);
	});
	tilt.addEventListener('input', function(e) {
		map.setTilt(e.target.value);
	});
	headingAdd.addEventListener('click', function(e) {
		heading.value++;
		map.setHeading(heading.value);
	});
	headingMinus.addEventListener('click', function(e) {
		heading.value--;
		map.setHeading(heading.value);
	});
	tiltAdd.addEventListener('click', function(e) {
		tilt.value++;
		map.setTilt(tilt.value);
	});
	tiltMinus.addEventListener('click', function(e) {
		tilt.value--;
		map.setTilt(tilt.value);
	});
	var task;
	document.getElementById('loop').addEventListener('click', function(e) {
		task = setInterval(() => {
			if (loop) {
				heading.value++;
				map.setHeading(heading.value);
			}
		}, 100);
	});
	document.getElementById('stop').addEventListener('click', function(e) {
		task && clearInterval(task);
	})
</script>
```
:::

## 3D地球

> [官方文档](http://lbsyun.baidu.com/index.php?title=jspopularGL/guide/maptype)

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-3d-earth.html"
  width="100%"
  height="600"
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
    // GL版命名空间为BMapGL
    // 按住鼠标右键，修改倾斜角和角度
	var map = new BMapGL.Map("allmap");
    map.centerAndZoom(new BMapGL.Point(118.5, 27.5), 5);
	map.enableScrollWheelZoom(true);
	map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式
	var scaleCtrl = new BMapGL.ScaleControl({ 
		anchor: BMAP_ANCHOR_TOP_LEFT,
		offset: new BMapGL.Size(100, 10)
	});  // 添加比例尺控件
	map.addControl(scaleCtrl);
	var zoomCtrl = new BMapGL.ZoomControl({ 
		anchor: BMAP_ANCHOR_BOTTOM_LEFT
	});  // 添加比例尺控件
	map.addControl(zoomCtrl);
</script>
```
:::

## 添加控件

> [官方文档](http://lbsyun.baidu.com/index.php?title=jspopularGL/guide/widget)

案例同上

## 个性化地图

> [官方文档](http://lbsyun.baidu.com/index.php?title=jspopularGL/guide/custom)

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-bmap-custom.html"
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
    // GL版命名空间为BMapGL
    // 按住鼠标右键，修改倾斜角和角度
	var map = new BMapGL.Map("allmap");    // 创建Map实例
  var point = new BMapGL.Point(116.404, 39.915);
	map.centerAndZoom(point, 9);  // 初始化地图,设置中心点坐标和地图级别
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	map.setMapStyleV2({     
  	styleId: 'a0c43e8c7279db0a4a032712d0e4c32c'
	});
</script>
```
:::
