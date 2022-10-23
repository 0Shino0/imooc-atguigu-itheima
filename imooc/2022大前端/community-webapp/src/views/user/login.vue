<template>
  <div class="wrapper">
    <my-header title="登录"></my-header>
    <div class="logo">
      <img src="@/assets/images/logo.jpg" alt />
    </div>
    <div class="form">
      <validation-observer ref="observer">
        <validation-provider
          tag="div"
          class="outer"
          name="email"
          rules="required|email"
          v-slot="{errors}"
        >
          <div class="input-wrap" :class="{'error-outline': errors.length > 0}">
            <svg-icon icon="person"></svg-icon>
            <input type="text" placeholder="请输入用户名" v-model="username" />
          </div>
          <span class="error">{{errors[0]}}</span>
        </validation-provider>
        <div class="input-wrap">
          <svg-icon icon="lock"></svg-icon>
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="input-wrap flex">
          <div class="code-input">
            <svg-icon icon="images"></svg-icon>
            <input type="text" placeholder="请输入验证码" v-model="code" />
          </div>
          <div v-html="svg" class="code" @click="_getCode()"></div>
        </div>
        <div class="form-controls">
          <router-link :to="{name: 'reg'}">注册</router-link>
          <router-link :to="{name: 'forget'}">忘记密码</router-link>
        </div>
        <div class="btns">
          <mt-button type="primary" @click="_login()" size="large">登录</mt-button>
        </div>
        <div class="form-bottom">
          <svg-icon icon="qq" class="icon-qq"></svg-icon>
          <svg-icon icon="weixin" class="icon-weixin"></svg-icon>
          <svg-icon icon="weibo" class="icon-weibo"></svg-icon>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      svg: '',
      username: '',
      password: '',
      code: ''
    }
  },
  mounted () {
    this._getCode()
  },
  methods: {
    ...mapActions({
      getCode: 'user/getCode',
      login: 'user/login'
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
    async _login () {
      const result = await this.login({
        username: this.username,
        password: this.password,
        code: this.code
      })
      if (result.code === 200) {
        this.$router.push({ name: 'index' })
      } else {
        this.$Toast(result.msg)
      }
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
    // .code {
    //   float: right;
    //   position: relative;
    //   top: -12px;
    // }
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

.form-bottom {
  text-emphasis: center;
  margin-top: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  .svg-icon {
    font-size: 60px;
    color: #666;
  }
  .icon-qq {
    color: #7ca9c9;
  }
  .icon-weibo {
    color: #e6162d;
  }
  .icon-weixin {
    color: #2fd63a;
  }
}

.outer {
  position: relative;
  .error {
    position: absolute;
    top: -28px;
    right: 0;
  }
  .error-outline {
    border: 1px solid #c00;
    border-radius: 6px;
  }
}
</style>
