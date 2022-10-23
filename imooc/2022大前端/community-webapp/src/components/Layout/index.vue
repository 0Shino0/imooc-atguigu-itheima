<template>
  <div class="wrapper">
    <slot></slot>
    <my-footer></my-footer>
  </div>
</template>

<script>
// import Footer from './footer'
export default {
  name: 'Layout'
  // components: {
  //   'my-footer': Footer
  // }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding-bottom: $footer-height;
}
</style>
