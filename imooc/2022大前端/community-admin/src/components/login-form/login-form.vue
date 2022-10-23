<template>
  <Form
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <FormItem prop="username">
      <Input v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="code">
      <Input
        class="imooc-input"
        type="text"
        v-model="form.code"
        placeholder="请输入验证码"
      >
        <span slot="prepend">
          <Icon :size="14" type="md-image"></Icon>
        </span>
        <span
          class="imooc-code"
          slot="append"
          v-html="svg"
          @click="_getCode()"
        ></span>
      </Input>
    </FormItem>
    <FormItem>
      <Button :loading="loading" @click="handleSubmit" type="primary" long
        >登录</Button
      >
    </FormItem>
  </Form>
</template>
<script>
// import axios from '@/libs/request'
import { getCode } from '@/api/login'
import uuid from 'uuid/v4'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'change' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码至少为6位',
            trigger: 'change'
          }
        ]
      }
    },
    codeRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          {
            type: 'string',
            len: 4,
            message: '验证码长度不正确',
            trigger: 'change'
          }
        ]
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      svg: '',
      form: {
        username: 'toimc_admin@toimc.com',
        password: 'toimc@520',
        code: '',
        sid: ''
      }
    }
  },
  computed: {
    rules() {
      return {
        username: this.userNameRules,
        password: this.passwordRules,
        code: this.codeRules
      }
    }
  },
  mounted() {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this.form.sid = sid
    this._getCode()
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', { ...this.form })
        }
      })
    },
    _getCode() {
      getCode(this.$store.state.sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss">
.imooc-input {
  .ivu-input-group-append {
    padding: 0;
  }
  .ivu-input-group-prepend {
    width: 32px;
  }
}

.imooc-code {
  display: inline-block;
  padding: 0;
  height: 28px;
  overflow: hidden;
  svg {
    width: 120px;
    position: relative;
    top: -12px;
  }
}
</style>
