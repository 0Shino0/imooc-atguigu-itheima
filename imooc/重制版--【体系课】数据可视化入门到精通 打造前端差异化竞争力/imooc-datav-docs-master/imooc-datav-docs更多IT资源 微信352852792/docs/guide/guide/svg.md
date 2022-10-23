# svg

SVG是一种基于 XML 的图像文件格式，它的英文全称为Scalable Vector Graphics，意思为可缩放的矢量图形

## 入门案例：绘制点、矩形、直线和圆形

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-svg.html"
  width="100%"
  height="300"
/>

::: details
```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <svg width="800" height="800">
      <rect
        width="50"
        height="50"
        style="fill:red;stroke-width:0;stroke:rgb(0,0,0);"
      />
      <line 
        x1="100" 
        y1="100" 
        x2="250" 
        y2="75"
        style="stroke:blue;stroke-width:1"
      />
      <line 
        x1="250" 
        y1="75" 
        x2="300" 
        y2="100"
        style="stroke:blue;stroke-width:1"
      />
      <circle 
        cx="200" 
        cy="200" 
        r="50" 
        stroke="green"
        stroke-width="2" 
        fill="red"
      />
      <line 
        x1="300" 
        y1="300" 
        x2="301" 
        y2="301"
        style="stroke:red;stroke-width:1"
      />
    </svg>
  </body>
</html>
```
:::

> 思考：你能否总结出 svg 绘图的流程？
::: details
1. 编写 svg 标签，指定宽高
2. 编写 svg 绘图标签
3. 编写绘图属性和样式
:::

::: tip
[svg 参考手册](https://www.w3school.com.cn/svg/svg_reference.asp)
:::
