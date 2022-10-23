<template>
  <div ref="tips" class="tips animation" :class="{ shake: type === 'shake' }">
    <div class="content">{{ msg }}</div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Pop',
    props: {
      type: {
        type: String,
        default: ''
      },
      msg: {
        type: String,
        default: ''
      },
      delay: {
        type: Number,
        default: 2000
      },
      // eslint-disable-next-line vue/require-default-prop
      unmount: {
        type: Function
      }
    },
    mounted() {
      const height = this.$refs.tips.clientHeight
      const width = this.$refs.tips.clientWidth
      this.$refs.tips.style.marginLeft = -width / 2 + 'px'
      this.$refs.tips.style.marginTop = -height / 2 + 'px'
      setTimeout(() => {
        this.unmount()
      }, this.delay)
    }
  })
</script>

<style lang="scss" scoped>
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-10px);
    }

    20%,
    40%,
    60%,
    80% {
      transform: translateX(10px);
    }
  }

  .tips {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2000;
  }

  .animation {
    animation-fill-mode: both;
    animation-duration: 0.3s;
  }

  .content {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 10px 15px;
    border-radius: 6px;
  }

  .shake {
    animation-name: shake;
  }
</style>
