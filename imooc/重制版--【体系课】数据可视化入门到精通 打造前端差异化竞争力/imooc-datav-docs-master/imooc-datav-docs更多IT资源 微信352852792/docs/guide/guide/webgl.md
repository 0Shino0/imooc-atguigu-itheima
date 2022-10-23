# WebGL

WebGL（Web Graphics Library）是一种 3D 绘图协议，WebGL可以为 HTML5 Canvas 提供硬件3D加速渲染，这样Web开发人员就可以借助系统显卡来在浏览器里更流畅地展示 3D 场景和模型了，还能创建复杂的导航和数据视觉化。

## WebGL 案例分享

- [案例1：3D 魔方](http://www.randelshofer.ch/webgl/rubikscube/)
- [案例2：化学模型](https://web.chemdoodle.com/demos/molgrabber-3d)
- [案例3：3D 地球](http://www.webglearth.com/)
- [案例4：3D 大脑](https://www.biodigital.com/)

## WebGL 绘制点

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-webgl.html"
  width="100%"
  height="300"
/>

::: details
```html
<html>
  <body>
    <canvas id="canvas" width="200px" height="200px"></canvas>
    <script>
    window.onload = function () {
      //顶点着色器程序
      var VSHADER_SOURCE =
          "void main() {" +
              //设置坐标
          "gl_Position = vec4(0.0, 0.0, 0.0, 1.0); " +
              //设置尺寸
          "gl_PointSize = 10.0; " +
          "} ";
    
      //片元着色器
      var FSHADER_SOURCE =
          "void main() {" +
              //设置颜色
          "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
          "}";
      //获取canvas元素
      var canvas = document.getElementById('canvas');
      //获取绘制二维上下文
      var gl = canvas.getContext('webgl');
      if (!gl) {
          console.log("Failed");
          return;
      }
      //编译着色器
      var vertShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertShader, VSHADER_SOURCE);
      gl.compileShader(vertShader);
    
      var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragShader, FSHADER_SOURCE);
      gl.compileShader(fragShader);
      //合并程序
      var shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertShader);
      gl.attachShader(shaderProgram, fragShader);
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram);
    
      //绘制一个点
      gl.drawArrays(gl.POINTS, 0, 1);
    }
    </script>
</body>
</html>
```
:::
