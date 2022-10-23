<template>
  <transition name="fade">
    <div v-show="isShow" class="layui-layer-tips layui-edit-face edit-content">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(value, key) in lists" :key="key" @click="handleFaceClick(key)">
            <img :src="value" alt />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import faces from '@/assets/js/face'
  export default {
    name: 'FaceComponent',
    // eslint-disable-next-line vue/require-prop-types
    props: ['isShow', 'ctrl'],
    emits: ['addEvent', 'closeEvent'],
    data() {
      return {
        lists: faces
      }
    },
    methods: {
      handleFaceClick(item) {
        this.$emit('addEvent', item)
        this.$emit('closeEvent')
      }
    }
  }
</script>

<style lang="scss" scoped></style>
