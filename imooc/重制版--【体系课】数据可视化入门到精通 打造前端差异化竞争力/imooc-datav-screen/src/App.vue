<template>
  <div id="app">
    <screen />
  </div>
</template>

<script>
 import Screen from './views/Screen'

 export default {
   components: {
     Screen
   }
 }
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    font-family: "Microsoft Yahei", Arial, sans-serif;
    overflow: hidden;
  }
</style>
