# 数据可视化前端技术选型

## 数据可视化解决方案

前端数据可视化解决方案如下：

![可视化解决方案](https://book.youbaobao.xyz/datav-res/datav/datav-tech-arch.png)

## Skia

[Skia](https://github.com/google/skia) 是 Chrome 和 Android 的底层 2D 绘图引擎，具体可参考[百度百科](https://baike.baidu.com/item/skia/1287196)，Skia 采用 C++ 编程，由于它位于浏览器的更底层，所以我们平常接触较少

> 对底层绘图感兴趣的同学可以从这个[案例](http://www.kevinbeason.com/smallpt/)入手，了解一下 C++ 的可视化编程。

## OpenGL

OpenGL（Open Graphics Library）是2D、3D图形渲染库，它可以绘制从简单的2D图形到复杂的3D景象。OpenGL 常用于 CAD、VR、数据可视化和游戏等众多领域。

## Chrome

Chrome 使用 Skia 作为绘图引擎，向上层开放了 canvas、svg、WebGL、HTML 等绘图能力。


