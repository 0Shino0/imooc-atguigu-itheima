# svg 动画

## transform 变换

### translate 位移
```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="50" height="50" transform="translate(10,10)" />
</svg>
```

### rotate 旋转
```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="50" height="50" transform="translate(50,50) rotate(30)" />
</svg>
```

### skewX 和 skewY 斜切
```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="50" height="50" transform="translate(50,50) skewX(30)" />
</svg>
```

### scale 缩放
```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="50" height="50" transform="translate(50,50) scale(.5)" />
</svg>
```

### matrix 复杂变形
```html
<svg viewBox="0 0 200 200">
  <rect x="10" y="10" width="30" height="20" fill="green" />
 
  <!--
  In the following example we are applying the matrix:
  [a c e]    [3 -1 30]
  [b d f] => [1  3 40]
  [0 0 1]    [0  0  1]

  which transform the rectangle as such:

  top left corner: oldX=10 oldY=10
  newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 10 + 30 = 50
  newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 10 + 40 = 80

  top right corner: oldX=40 oldY=10
  newX = a * oldX + c * oldY + e = 3 * 40 - 1 * 10 + 30 = 140
  newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 10 + 40 = 110

  bottom left corner: oldX=10 oldY=30
  newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 30 + 30 = 30
  newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 30 + 40 = 140

  bottom right corner: oldX=40 oldY=30
  newX = a * oldX + c * oldY + e = 3 * 40 - 1 * 30 + 30 = 120
  newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 30 + 40 = 170
  -->
  <rect x="10" y="10" width="30" height="20" fill="red"
        transform="matrix(3 1 -1 3 30 40)" />
</svg>
```

## svg 动画（CSS）

### 案例1：环形进度条
```vue
<template>
  <div>
    <svg width="440" height="440" viewbox="0 0 440 440">
      <circle cx="220" cy="220" r="170" stroke-width="50" stroke="#D1D3D7" fill="none"></circle>
      <circle
        class="circle"
        cx="220"
        cy="220"
        r="170"
        stroke-width="50"
        stroke="#00A5E0"
        fill="none"
        transform="matrix(0,-1,1,0,0,440)"
      />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'SvgAnimation'
  }
</script>

<style scoped>
  .circle {
    animation: circle 5s linear infinite;
  }

  @keyframes circle {
    from {
      stroke-dasharray: 0 1069;
    }
    to {
      stroke-dasharray: 1069 0;
    }
  }
</style>
```

关键知识点：

- keyframes 动画
- stroke-dasharray 使用技巧
- matrix 计算公式

![matrix](https://www.youbaobao.xyz/datav-res/datav/svg_matrix1.png)

同样的方法我们实现一个矩形进度条，核心代码：
```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="200" height="200" fill="none" stroke="grey" stroke-width="8"></rect>
  <rect x="0" y="0" width="200" height="200" fill="none" stroke="blue" stroke-width="8" class="rect" transform="matrix(0,1,-1,0,200,0)"></rect>
</svg>
```

matrix 计算方法：
![matrix](https://www.youbaobao.xyz/datav-res/datav/svg_matrix2.png)

### 案例2：LOGO 描边

- 下载任意 SVG 格式的 LOGO
- 获取 path 长度
```javascript
const path = document.getElementById('taobao-logo')
const pathLen = path.getTotalLength() // 6885
```
- 添加描边样式和动画
```css
.taobao-path {
  fill: none;
  stroke: #333;
  stroke-width: 1;
  animation: taobao 5s linear infinite forwards;
}
@keyframes taobao {
  from {
    stroke-dasharray: 6885;
    stroke-dashoffset: 6885;
  }
  to {
    stroke-dasharray: 6885;
    stroke-dashoffset: 0;
  }
}
```

关键知识点：

- stroke-dasharray
- stroke-dashoffset

## svg 动画（SMIL）

[SMIL](https://www.w3.org/TR/REC-smil/) 全称 Synchronized Multimedia Integration Language，它允许我们通过 HTML 标签实现动画效果，它可以用于：

- 实现过渡动画
- 实现补间动画
- 动画颜色变换
- 路径运动动画（CSS3无法实现）

SMIL 包含以下标签：
```html
<set>
<animate>
<animateColor>
<animateTransform>
<animateMotion>
```

::: tip
SMIL 兼容性：[查看](https://caniuse.com/#search=SMIL)
:::

### 为什么要用 SMIL？

实现动画的全新方式：
- 无需 CSS
- 无需 JS
- 几个标签轻松实现复杂动画，它不香吗？

### set 标签

实现属性的延迟设置

```html
<svg width="400" height="400">
  <rect x="0" y="0" width="100" height="100" fill="red">
    <set attributeName="x" attributeType="XML" to="10" begin="1s" />
    <set attributeName="x" attributeType="XML" to="20" begin="2s" />
    <set attributeName="x" attributeType="XML" to="30" begin="3s" />
    <set attributeName="x" attributeType="XML" to="40" begin="4s" />
    <set attributeName="x" attributeType="XML" to="50" begin="5s" />
  </rect>
</svg>
```

### animation 标签

案例一：移动的小球

```html
<svg width="500" height="200" viewBox="0 0 500 200">
  <circle cx="0" cy="0" r="30" fill="blue" stroke="black" stroke-width="1">
    <animate attributeName="cx" from="0" to="200" dur="5s" repeatCount="indefinite" />
    <animate attributeName="cy" from="0" to="200" dur="5s" repeatCount="indefinite" />
  </circle>
</svg>
```

案例二：形状补间动画

```html
<svg width="400" height="400">
  <polygon points="30 30 70 30 90 70 10 70" fill="#fcc" stroke="black">
    <animate attributeName="points" attributeType="XML" to="50 30 70 50 50 90 30 50" dur="5s" fill="freeze" repeatCount="1" />
  </polygon>
</svg>
```

::: warning
注意点：
- animation 作用域的问题
- fill 属性：freeze 和 remove
:::

### animationColor 标签

已废弃，通过 animation 可实现同样效果（[参考](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateColor)）

```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="100" height="50" fill="red">
    <animate attributeName="fill" from="red" to="blue" dur="5s" repeatCount="indefinite"></animate>
  </rect>
</svg>
```

当然你想用这个属性也用不了，看看这个糟糕的兼容性：

![animationColor](https://www.youbaobao.xyz/datav-res/datav/svg_animationColor.png)

### animateTransform 标签

```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="60" height="60" fill="red">
    <animateTransform attributeName="transform" begin="0s" dur="3s" type="scale" from="1" to="2" repeatCount="indefinite" />
  </rect>
</svg>
```

### animateMotion 标签

案例一：按 path 轨迹运动的正方形

```html
<svg width="200" height="200" viewBox="0 0 200 200">
  <rect x="0" y="0" width="10" height="10" fill="red">
    <animateMotion
      path="M 10 10 L 110 10 L 110 110 L 10 110 Z"
      dur="5s"
      rotate="auto"
      fill="freeze"
      repeatCount="indefinite"
    />
  </rect>
  <path id="motion-path" d="M 10 10 L 110 10 L 110 110 L 10 110 Z" fill="none" stroke="green" />
</svg>
```

案例二：混合动画

```html
<svg viewBox="0 0 200 200" width="200" height="200">
    <rect x="0" y="0" rx="0" ry="0" width="10" height="10" fill="red">
      <animateMotion
        id="forward-rect"
        path="M 10 10 L 110 10 L 110 110 L 10 110"
        dur="2s"
        rotate="0"
        fill="freeze"
        begin="0; backward-rect.end + 0.5s"
      />
      <animateMotion
        id="backward-rect"
        path="M 10 110 L 110 110 L 110 10 L 10 10"
        dur="2s"
        rotate="0"
        fill="freeze"
        begin="forward-rect.end + 0.5s"
      />
      <animate
        id="red-to-blue"
        attributeType="XML"
        attributeName="fill"
        begin="0; blue-to-red.end + 1s"
        from="red"
        to="blue"
        dur="2s"
        fill="freeze"
      />
      <animate
        id="blue-to-red"
        attributeType="XML"
        attributeName="fill"
        begin="red-to-blue.end + 1s"
        from="blue"
        to="red"
        dur="2s"
        fill="freeze"
      />
    </rect>
    <path d="M 10 10 L 110 10 L 110 110 L 10 110" fill="none" stroke-width="1" stroke="blue"/>
</svg>
```

案例三：点击变色或位移

```html
<svg viewBox="0 0 200 200" width="200" height="200">
    <g id="rect1">
      <rect x="0" y="0" rx="0" ry="0" width="100" height="100" fill="red">
        <animate
          attributeType="XML"
          attributeName="fill"
          from="red"
          to="green"
          begin="rect1.click"
          dur="2s"
          fill="freeze"
        />
      </rect>
    </g>
    <animateTransform
      attributeType="XML"
      attributeName="transform"
      type="translate"
      from="0, 0"
      to="50, 50"
      begin="rect1.click"
      dur="2s"
      fill="freeze"
    />
    <rect x="0" y="100" width="100" height="100" fill="blue">
      <animate
        attributeType="XML"
        attributeName="fill"
        from="blue"
        to="green"
        begin="rect1.click"
        dur="2s"
        fill="freeze"
      />
    </rect>
</svg>
```

::: tip
实现细节：
- rotate: auto -> 0 可以更加流畅
- begin: 可填入多个值，支持表达式
- 多个 animateMotion 并行时，后者会覆盖前者
- path 用法：[查看](https://www.w3school.com.cn/svg/svg_path.asp)
:::

## 扩展

### 总结 svg 特点

1. SVG 与 PNG、JPEG 和 GIF 图片相比，拥有很小的尺寸；
2. SVG 是矢量图，可以伸缩，适用各种分辨率；
3. SVG 采用开放标准，本质是 XML，可以被各种工具读取（浏览器、图片管理器、markdown 等）；
4. SVG 图像中的文本是可选的，同时也是可搜索的；
5. SVG 可以与 CSS 结合，获得更强的扩展性。


### SVG 实用工具

#### termtosvg

[github地址](https://github.com/nbedos/termtosvg)

实现效果：

![termtosvg_test](https://www.youbaobao.xyz/datav-res/datav/termtosvg_test.svg)

#### SVG 压缩

[github地址](https://github.com/svg/svgo)
