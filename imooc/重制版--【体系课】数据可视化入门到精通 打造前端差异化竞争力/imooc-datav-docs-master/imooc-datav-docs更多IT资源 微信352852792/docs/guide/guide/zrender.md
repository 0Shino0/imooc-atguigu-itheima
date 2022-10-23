# zrender

[zrender](https://ecomfe.github.io/zrender-doc/public/) 是二维绘图引擎，它提供 Canvas、SVG、VML 等多种渲染方式。ZRender 也是 ECharts 的渲染器。 

## 入门案例：绘制点、矩形、直线和圆形

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-zrender.html"
  width="100%"
  height="300"
/>

::: details
```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/zrender@4.3.0/dist/zrender.js"></script>
  </head>
  <body>
    <div id="container" style="width: 800px;height: 800px;"></div>
    <script>
      var zr = zrender.init(document.getElementById('container'));
      var rect = new zrender.Rect({
        shape: {
          x: 0,
          y: 0,
          width: 50,
          height: 50
        },
        style: {
          fill: 'red',
          lineWidth: 0
        }
      });
      var line = new zrender.Polyline({
        shape: {
          points:[
            [100, 100],
            [250, 75],
            [300, 100]
          ]
        },
        style: {
          stroke: 'blue',
          lineWidth: 1
        }
      });
      var circle = new zrender.Circle({
        shape: {
          cx: 200,
          cy: 200,
          r: 50
        },
        style: {
          fill: 'red',
          stroke: 'green',
          lineWidth: 2
        }
      });
      var point = new zrender.Polyline({
        shape: {
          points:[
            [300, 300],
            [301, 301]
          ]
        },
        style: {
          stroke: 'red',
          lineWidth: 1
        }
      });
      zr.add(rect);
      zr.add(line);
      zr.add(circle);
      zr.add(point);
    </script>
  </body>
</html>
```
:::

> 思考：你能否总结出 zrender 绘图的流程？

::: details
1. 引入 zrender 库
2. 编写 div 容器
3. 初始化 zrender 对象
4. 初始化 zrender 绘图对象
5. 调用 zrender add 方法绘图 
:::

想深入学习 zrender 的同学可以参考[官方案例](https://ecomfe.github.io/zrender-doc/public/examples/animation.html)，源码可以在 [zrender-docs](https://github.com/ecomfe/zrender-doc/tree/master/public/examples) 中找到
