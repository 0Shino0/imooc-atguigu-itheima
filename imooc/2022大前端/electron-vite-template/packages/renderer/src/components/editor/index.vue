<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div ref="icons" class="layui-unselect fly-edit">
          <!-- 表情 -->
          <span @click="choose(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="choose(1)">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="choose(2)">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote" @click="choose(3)">”</span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="addHr()">hr</span>
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          id="edit"
          ref="textEdit"
          v-model="content"
          class="layui-textarea fly-editor"
          name="content"
          @focus="focusEvent()"
          @blur="blurEvent()"
        ></textarea>
      </div>
    </div>
    <div ref="modal">
      <face :is-show="current === 0" @close-event="closeModal()" @add-event="addFace"></face>
      <img-upload
        :is-show="current === 1"
        @close-event="closeModal()"
        @add-event="addPic"
      ></img-upload>
      <link-add
        :is-show="current === 2"
        @close-event="closeModal()"
        @add-event="addLink"
      ></link-add>
      <quote :is-show="current === 3" @close-event="closeModal()" @add-event="addQuote"></quote>
      <code-input
        :is-show="current === 4"
        :width="codeWidth"
        :height="codeHeight"
        @close-event="closeModal()"
        @add-event="addCode"
      ></code-input>
      <preview :is-show="current === 6" :content="content" @close-event="closeModal()"></preview>
    </div>
  </div>
</template>

<script>
  import Face from './Face'
  import ImgUpload from './ImgUpload'
  import LinkAdd from './LinkAdd'
  import Quote from './Quote'
  import CodeInput from './Code'
  import Preview from './Preview'
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Editor',
    components: {
      Face,
      ImgUpload,
      LinkAdd,
      Quote,
      CodeInput,
      Preview
    },
    // eslint-disable-next-line vue/require-prop-types
    props: ['initContent'],
    emits: ['changeContent'],
    data() {
      return {
        current: '',
        codeWidth: 400,
        codeHeight: 200,
        content: '',
        pos: ''
      }
    },
    watch: {
      initContent(newval) {
        this.content = newval
      }
    },
    updated() {
      this.$emit('changeContent', this.content)
    },
    mounted() {
      this.$nextTick(() => {
        document.querySelector('body').addEventListener('click', this.handleBodyClick)
      })
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80
      window.addEventListener('resize', () => {
        this.codeWidth = this.$refs.textEdit.offsetWidth - 60
        this.codeHeight = this.$refs.textEdit.offsetHeight - 80
      })
    },
    beforeUnmount() {
      document.querySelector('body').removeEventListener('click', this.handleBodyClick)
    },
    methods: {
      closeModal() {
        this.current = ''
      },
      focusEvent() {
        this.getPos()
      },
      blurEvent() {
        this.getPos()
      },
      // 计算光标的当前位置
      getPos() {
        let cursorPos = 0
        let elem = document.getElementById('edit')
        if (document.selection) {
          // IE
          let selectRange = document.selection.createRange()
          selectRange.moveStart('character', -elem.value.length)
          cursorPos = selectRange.text.length
        } else if (elem.selectionStart || elem.selectionStart === '0') {
          cursorPos = elem.selectionStart
        }
        this.pos = cursorPos
      },
      // 添加表情
      addFace(item) {
        const insertContent = ` face${item}`
        this.insert(insertContent)
        this.pos += insertContent.length
      },
      // 添加图片链接
      addPic(item) {
        const insertContent = ` img[${item}]`
        this.insert(insertContent)
        this.pos += insertContent.length
      },
      // 添加链接
      addLink(item) {
        const insertContent = ` a(${item})[${item}]`
        this.insert(insertContent)
        this.pos += insertContent.length
      },
      // 添加代码
      addCode(item) {
        const insertContent = ` \n[pre]\n${item}\n[/pre]`
        this.insert(insertContent)
        this.pos += insertContent.length
      },
      // 添加引用
      addQuote(item) {
        const insertContent = ` \n[quote]\n${item}\n[/quote]`
        this.insert(insertContent)
        this.pos += insertContent.length
      },
      // 添加hr
      addHr() {
        this.insert('\n[hr]')
        this.pos += 5
      },
      choose(index) {
        if (index === this.current) {
          this.closeModal()
        } else {
          this.current = index
        }
      },
      handleBodyClick(e) {
        e.stopPropagation()
        // 触发隐藏本组件的关闭事件，改变isShow
        // 判断是否点击到了非控制ICON以外 + 本组件 的地方
        if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) {
          this.closeModal()
        }
      },
      insert(val) {
        if (typeof this.content === 'undefined') {
          return
        }
        let tmp = this.content.split('')
        tmp.splice(this.pos, 0, val)
        this.content = tmp.join('')
      }
    }
  }
</script>

<style lang="scss">
  .fly-editor {
    height: 260px;
  }
  .quote {
    font-size: 22px;
    vertical-align: middle;
    position: relative;
    top: 4px;
  }
  .edit-wrap {
    position: relative;
  }
  .edit-content {
    position: absolute;
    top: 45px;
    left: 0;
    z-index: 100;
    background: #fff;
  }
  .icon-emwdaima {
    position: relative;
    top: 2px;
  }
  .layui-layer-prompt {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
</style>
