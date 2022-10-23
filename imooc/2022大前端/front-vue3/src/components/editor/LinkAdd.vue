<template>
  <transition name="fade">
    <div class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">请输入合法链接</div>
      <div class="layui-layer-content">
        <input type="text" class="layui-layer-input" id="linkInput" v-model="link" />
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LinkAdd',
  props: ['isShow'],
  data () {
    return {
      link: ''
    }
  },
  methods: {
    submit () {
      if (this.link === '') {
        document.getElementById('linkInput').focus()
        this.$pop('shake', '请输入合法的链接')
        return
      }
      this.$emit('addEvent', this.link)
      setTimeout(() => {
        this.link = ''
        this.$emit('closeEvent')
      }, 0)
    },
    cancel () {
      this.$emit('closeEvent')
      this.link = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
