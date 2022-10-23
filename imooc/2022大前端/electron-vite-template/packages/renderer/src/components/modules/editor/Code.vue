<template>
  <transition name="fade">
    <div v-show="isShow" class="layui-layer-page layui-layer-prompt edit-content">
      <div class="layui-layer-title">请贴入代码或任意文本</div>
      <div class="layui-layer-content">
        <textarea
          id="codeInput"
          v-model="code"
          class="layui-layer-input"
          :style="{ width: width + 'px', height: height + 'px' }"
          @keydown.enter="$event.stopPropagation()"
        ></textarea>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>
      </span>
      <div class="layui-layer-btn layui-layer-btn-">
        <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a class="layui-layer-btn1" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Code',
    // eslint-disable-next-line vue/require-prop-types
    props: ['isShow', 'width', 'height'],
    emits: ['addEvent', 'closeEvent'],
    data() {
      return {
        code: ''
      }
    },
    methods: {
      submit() {
        if (this.code === '') {
          document.getElementById('codeInput').focus()
          this.$pop('shake', '请输入引用内容')
          return
        }
        this.$emit('addEvent', this.code)
        setTimeout(() => {
          this.code = ''
          this.$emit('closeEvent')
        }, 0)
      },
      cancel() {
        this.code = ''
        this.$emit('closeEvent')
      }
    }
  }
</script>

<style scoped></style>
