<template>
  <div class="wrapper">
    <my-header title="找回密码"></my-header>
    <div class="form">
      <div class="input-wrap">
        <svg-icon icon="person"></svg-icon>
        <input type="text" placeholder="请输入用户名" v-model="username" />
      </div>
      <div class="input-wrap flex">
        <div class="code-input">
          <svg-icon icon="images"></svg-icon>
          <input type="text" placeholder="请输入验证码" v-model="code" />
        </div>
        <div v-html="svg" class="code" @click="_getCode()"></div>
      </div>
      <div class="form-controls">
        <router-link :to="{name: 'login'}">已有账号</router-link>
        <router-link :to="{name: 'reg'}">注册</router-link>
      </div>
      <div class="btns">
        <mt-button type="primary" @click="submit()" size="large">确定发送</mt-button>
        <mt-button @click="goback()" size="large">取消</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { forget } from '@/api/login'
export default {
  name: 'forget',
  data () {
    return {
      svg: '',
      username: '',
      code: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    ...mapActions({
      getCode: 'user/getCode'
    }),
    async _getCode () {
      const result = await this.getCode()
      if (result.code === 200) {
        // 返回到前端svg图片数据
        this.svg = result.data
      } else {
        // 请求失败，或者异常
      }
    },
    async submit () {
      const result = await forget({
        username: this.username,
        code: this.code,
        sid: this.$store.state.sid
      })
      if (result.code === 200) {
        this.$Toast('邮件发送成功！2s后跳转')
        setTimeout(() => {
          this.$router.push({ name: 'index' })
        }, 2000)
      }
    },
    goback () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: $header-height 30px 0 30px;
  .logo {
    padding-top: 10px;
    text-align: center;
    img {
      width: 40%;
    }
  }
  .btns {
    button {
      margin-bottom: 40px;
    }
  }
}

.form {
  padding-top: 30px;
  .input-wrap {
    line-height: 80px;
    border-bottom: 1px solid $border-color;
    margin-bottom: 20px;
    input {
      width: 80%;
      outline: none;
      border: none;
      -webkit-appearance: none;
    }
    .svg-icon {
      font-size: 36px;
      vertical-align: middle;
      padding: 0 20px;
      color: #666;
    }
    &.flex {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .code-input {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        input {
          width: 100%;
        }
      }
    }
  }
}

.form-controls {
  margin: 40px 0 60px 0;
  font-size: 28px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  a {
    text-decoration: none;
    color: #999;
  }
}
</style>
