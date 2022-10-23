# canvas

canvas 是 HTML5 的新特性，它允许我们使用 canvas 元素在网页上通过 JavaScript 绘制图像。

## 入门案例：绘制点、矩形、直线和圆形

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-canvas.html"
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
    <canvas id="canvas" width="800" height="800"></canvas>
    <script>
      const canvas = document.getElementById('canvas'); // 获取 DOM 对象
      const ctx = canvas.getContext('2d'); // 获取 Canvas 对象
      ctx.fillStyle = 'red'; // 填充为红色
      ctx.fillRect(0, 0, 50, 50); // 绘制矩形

      ctx.beginPath(); // 开始绘制路径
      ctx.lineWidth = 1; // 线条宽度
      ctx.strokeStyle = 'blue'; // 线条填充色
      ctx.moveTo(100, 100); // 起点坐标
      ctx.lineTo(250, 75); // 中间点坐标
      ctx.lineTo(300, 100); // 终点坐标
      ctx.stroke(); // 绘制线段

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'green'; // 圆形边框色
      ctx.fillStyle = 'red'; // 圆形填充色
      ctx.arc(200, 200, 50, 0, 2 * Math.PI); // 绘制圆形
      ctx.stroke(); // 绘制圆形的边框
      ctx.fill(); // 绘制圆形的填充色

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.moveTo(300, 300);
      ctx.lineTo(301, 301); // 绘制一个点
      ctx.stroke();
    </script>
  </body>
</html>
```
:::

> 思考：你能否总结出 canvas 绘图的流程？

::: details
1. 编写 canvas 标签（注意指定宽高）
2. 获取 canvas DOM 对象
3. 获取 Canvas 对象
4. 设置绘图属性
5. 调用绘图 API 
:::

::: tip
[canvas 参考手册](https://www.w3school.com.cn/tags/html_ref_canvas.asp)
:::

## 进阶案例：图片压缩

<iframe 
  src="https://book.youbaobao.xyz/datav-res/examples/test-compress-img.html"
  width="100%"
  height="300"
/>

[在线预览](https://book.youbaobao.xyz/datav-res/examples/test-compress-img.html)

::: details
```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <input type="file" id="upload">
    <script>
      const ACCEPT = ['image/jpg', 'image/png', 'image/jpeg']; // 限定图片文件类型
      const MAXSIZE = 1024 * 1024 * 3; // 限定图片最大容量
      const MAXSIZE_STR = '3MB';
      function convertImageToBase64(file, cb) {
        let reader = new FileReader();
        reader.addEventListener('load', function(e) {
          const base64Image = e.target.result; // 获取文件内容，等同于 reader.result
          cb(base64Image);
          reader = null;
        });
        reader.readAsDataURL(file); // 读取 file 对象中的内容
      }
      function compress(base64Image, cb) {
        let maxW = 1024;
        let maxH = 1024;

        const image = new Image();
        image.addEventListener('load', function() {
          let ratio; // 压缩比
          let needCompress = false; // 是否需要压缩
          if (maxW < image.naturalWidth) {
            needCompress = true;
            ratio = image.naturalWidth / maxW;
            maxH = image.naturalHeight / ratio;
          }
          if (maxH < image.naturalHeight) {
            needCompress = true;
            ratio = image.naturalHeight / maxH;
            maxW = image.naturalWidth / ratio;
          }
          if (!needCompress) {
            maxW = image.naturalWidth;
            maxH = image.naturalHeight;
          }
          const canvas = document.createElement('canvas');
          canvas.setAttribute('id', '__compress__');
          canvas.width = maxW;
          canvas.height = maxH;
          canvas.style.visibility = 'hidden';
          document.body.append(canvas);

          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, maxW, maxH);
          ctx.drawImage(image, 0, 0, maxW, maxH); // 渲染图片
          const compressImage = canvas.toDataURL('image/jpeg', 0.9); // 压缩图片
          cb(compressImage);
          const _image = new Image();
          _image.src = compressImage;
          document.body.appendChild(_image);
          canvas.remove(); // 移除 canvas
        });
        image.src = base64Image; // 将图片设置到 image 的 src 属性中
        document.body.appendChild(image);
      }
      function uploadImage(compressImage) {
        console.log('upload image to server...', compressImage);
      }

      const upload = document.getElementById('upload');
      upload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        console.log(file);
        if (!file) {
          return;
        }
        const { type: fileType, size: fileSize } = file;
        // 图片类型检查
        if (!ACCEPT.includes(fileType)) {
          alert('不支持上传该格式文件！');
          upload.value = '';
          return;
        }
        // 图片大小检查
        if (fileSize > MAXSIZE) {
          alert('文件超出' + MAXSIZE_STR + '！');
          upload.value = '';
          return;
        }
        // 压缩文件
        convertImageToBase64(file, (base64Image) => compress(base64Image, uploadImage));
      });
    </script>
  </body>
</html>
```
:::
