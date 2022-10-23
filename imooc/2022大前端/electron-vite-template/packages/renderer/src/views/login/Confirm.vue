<template>
  <div class="layui-container flex">
    <div class="layui-row font pb3">确定更新账号为：{{ username }}吗？</div>
    <div class="layui-row">
      <button type="button" class="layui-btn" @click="submit()"> 确定更新 </button>
      <router-link class="layui-btn layui-btn-primary" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { getDecodeParam } from '@/utils/common'
  import { UserService } from '@/services/user'

  const { updateUser } = UserService()

  export default defineComponent({
    name: 'ConfirmPage',
    setup() {
      const username = ref('')

      onMounted(() => {
        username.value = getDecodeParam('username') || ''
      })

      const submit = async () => {
        await updateUser(username.value)
      }

      return {
        username,
        submit
      }
    }
  })
</script>

<style lang="scss" scoped>
  .flex {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    min-height: 260px;
  }
  .font {
    font-size: 16px;
    color: #333;
  }
</style>
