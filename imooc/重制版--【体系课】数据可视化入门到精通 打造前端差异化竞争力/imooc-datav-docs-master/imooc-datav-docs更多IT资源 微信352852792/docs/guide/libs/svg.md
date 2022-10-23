# svg 进阶

## svg 应用场景

- 绘制 icon
- 绘制动画

## svg viewport 和 viewBox

- viewport 是 svg 图像的可见区域
- viewBox 是用于在画布上绘制 svg 图形的坐标系统

```html
<svg width="500" height="200" viewBox="0 0 50 20" style="border: 1px solid #000000">
  <rect x="20" y="10" width="10" height="5" style="stroke: #000000; fill:none;"/>
</svg>      
```

上述案例中 viewBox 坐标系中 1 = 10px，上述代码相当于：
```html
<svg width="500" height="200" style="border: 1px solid #000000">
  <rect x="200" y="100" width="100" height="50" stroke-width="10" style="stroke: #000000; fill:none;"/>
</svg>
```

- preserveAspectRatio 用于当 viewport 和 viewBox 宽高比不相同时，指定这个坐标系在viewport 中是否完全可见，同时也可以指定它在viewport 坐标系统中的位置

preserveAspectRatio 是一个较难理解的概念，它相当于在 viewport 内部绘制了一个虚拟内框，它的默认值为：xMidYMid meet
```html
<svg width="500" height="200" viewBox="0 0 200 200" style="border: 1px solid #000000" preserveAspectRatio="xMidYMid meet">
  <rect x="100" y="100" width="100" height="50" stroke-width="10" style="stroke: #000000; fill:none;"/>
</svg>
```

上述配置的原理如下图：
![svg_viewbox](https://www.youbaobao.xyz/datav-res/datav/svg_viewbox3.png)

```html
<svg width="500" height="200" viewBox="0 0 200 200" style="border: 1px solid #000000" preserveAspectRatio="xMaxYMin meet">
  <rect x="100" y="100" width="100" height="50" stroke-width="10" style="stroke: #000000; fill:none;"/>
</svg>
```

上述配置的原理如下图：
![svg_viewbox](https://www.youbaobao.xyz/datav-res/datav/svg_viewbox.png)

preserveAspectRatio 第二个参数如下：
- meet: 保持宽高比并将viewBox缩放为适合viewport的大小

> meet 模式下，svg 将优先采纳压缩比较小的作为最终压缩比，meet 是默认参数

- slice: 保持宽高比并将所有不在viewport中的viewBox剪裁掉

```html
<svg width="500" height="200" viewBox="0 0 200 200" style="border: 1px solid #000000" preserveAspectRatio="xMidYMax slice">
  <rect x="100" y="100" width="100" height="50" stroke-width="10" style="stroke: #000000; fill:none;"/>
</svg>                          
```

上述代码原理如下图：
![svg_viewbox](https://www.youbaobao.xyz/datav-res/datav/svg_viewbox4.png)

```html
<svg width="500" height="200" viewBox="0 0 200 200" style="border: 1px solid #000000" preserveAspectRatio="xMaxYMin slice">
  <rect x="100" y="100" width="100" height="50" stroke-width="10" style="stroke: #000000; fill:none;"/>
</svg>                          
```

上述代码原理如下图：
![svg_viewbox](https://www.youbaobao.xyz/datav-res/datav/svg_viewbox2.png)

> slice 模式下，svg 将优先采纳压缩比较大的作为最终压缩比

- none: 不保存宽高比。缩放图像适合整个viewbox，可能会发生图像变形

> none 模式下，svg 将分别计算 x 和 y 轴的压缩比

```html
<svg width="500" height="200" viewBox="0 0 200 200" style="border: 1px solid #000000" preserveAspectRatio="none">
  <rect x="100" y="100" width="100" height="50" stroke-width="10" style="stroke: #000000; fill:none;"/>
</svg>                              
```

## svg 组件库

- defs 标签
- g 标签
```html
<g id="arrow">
  <polyline points="30 20, 70 50, 30 80" fill="transparent" stroke="currentColor" stroke-width="3"></polyline>
</g>
```
- use 标签
```html
<svg :style="{color:'red'}">
  <use href="#filledArrow"></use>
</svg>
```

- symbol
symbol 与 g 标签类似，但 symbol 可以拥有一个独立的 viewBox
```html
<svg width="0" height="0">
  <symbol id="cross" viewBox="0 0 100 100">
    <line x1="50" y1="10" x2="50" y2="90" stroke-width="8" stroke="currentColor"></line>
    <line x1="10" y1="50" x2="90" y2="50" stroke-width="8" stroke="currentColor"></line>
  </symbol>
</svg>
```

## 使用 iconfont 的正确姿势

### 集成 svg 图标

- 找到合适的 svg 图标
- 下载图标
- 将 svg 代码集成到组件库
- 在 vue 项目中使用组件

### 创建 iconfont 项目

- 创建 iconfont 项目
- 上传 svg 图标
- 生成 js 库

> 官方帮助文档：[查看](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code)，推荐使用 symbol 方式

### 创建 svg 组件

- 外部引用 symbol 链接
- 接收 icon name
- icon 外层样式封装
