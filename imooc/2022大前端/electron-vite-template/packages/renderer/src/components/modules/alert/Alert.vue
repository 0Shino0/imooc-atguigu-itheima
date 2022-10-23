<template>
  <div v-show="state.on">
    <div class="alert">
      <div class="flex">{{ state.msg }}</div>
      <div v-if="state.type === 'alert'">
        <div class="btnCommon success" @click="close()">确定</div>
      </div>
      <div v-else class="space-round">
        <div class="btnCommon cancel" @click="cancelEvent()">取消</div>
        <div class="btnCommon success" @click="successEvent()">确定</div>
      </div>
    </div>
    <div class="mask" @click="close()"></div>
  </div>
</template>

<script lang="ts">
  import toggleUtils from '@/utils/toggle'
  import { computed, defineComponent, reactive } from 'vue'
  /* eslint-disable */
  export default defineComponent({
    name: 'AlertComponent',
    props: {
      type: {
        type: String,
        default: 'alert'
      },
      msg: {
        type: String,
        default: ''
      },
      success: {
        type: Function
      },
      cancel: {
        type: Function
      },
      unmount: {
        type: Function
      }
    },
    setup(props: any) {
      const { toggle, on } = toggleUtils(true, 0)
      const state = reactive({
        toggle,
        on,
        msg: computed(() => props.msg),
        type: computed(() => props.type)
      })

      const close = () => {
        state.toggle(false)
        // 删除对应的DOM根节点
        props.unmount()
      }

      const cancelEvent = () => {
        props.cancel && props.cancel()
        close()
      }

      const successEvent = () => {
        props.success && props.success()
        close()
      }

      return {
        state,
        close,
        successEvent,
        cancelEvent
      }
    }
  })
</script>

<style lang="scss" scoped>
  $btn-main: #009688;
  $btn-dark: darken($btn-main, 5%);

  .alert {
    width: 300px;
    height: 150px;
    position: fixed;
    background: #fff;
    border-radius: 6px;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -75px;
    padding: 20px 10px;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
    z-index: 3000;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .flex {
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .space-round {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 0 10px;
  }

  .btnCommon {
    width: 105px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 6px;
    &.success {
      background: $btn-main;
      color: #fff;
      &:hover {
        background: $btn-dark;
      }
    }
    &.cancel {
      background: #ededed;
      color: #333;
    }
  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 2000;
  }
</style>
