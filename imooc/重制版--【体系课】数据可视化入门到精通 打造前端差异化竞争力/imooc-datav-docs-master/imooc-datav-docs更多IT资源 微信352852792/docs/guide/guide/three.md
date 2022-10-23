# Three.js

[Three.js](https://github.com/mrdoob/three.js) 是一个基于 WebGL 的 Javascript 3D 图形库

## 官方案例：旋转正方体

<iframe 
  src="https://www.youbaobao.xyz/datav-res/examples/test-three.html"
  width="100%"
  height="600"
/>

::: details
```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/three@0.116.1/build/three.js"></script>
  </head>
  <body>
    <script>
      var camera, scene, renderer;
      var geometry, material, mesh;

      init();
      animate();

      function init() {
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        camera.position.z = 1;
        scene = new THREE.Scene();
        geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        material = new THREE.MeshNormalMaterial();
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
      }

      function animate() {
        requestAnimationFrame( animate );
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        renderer.render( scene, camera );
      }
    </script>
  </body>
</html>
```
:::
