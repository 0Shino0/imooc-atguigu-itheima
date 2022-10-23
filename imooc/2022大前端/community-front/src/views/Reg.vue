<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
          <validation-observer ref="observer" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <validation-provider
                      name="username"
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label for="L_email" class="layui-form-label"
                          >用户名</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="username"
                            v-model="username"
                            placeholder="请输入用户名"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">
                          将会成为您唯一的登入名
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_username" class="layui-form-label"
                      >昵称</label
                    >
                    <validation-provider
                      name="name"
                      rules="required|min:4|name"
                      v-slot="{ errors }"
                    >
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="name"
                          v-model="name"
                          placeholder="请输入昵称"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      name="password"
                      rules="required|min:6|max:16|confirmed:confirmation"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label for="L_pass" class="layui-form-label"
                          >密码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="password"
                            v-model="password"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">
                          6到16个字符
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider v-slot="{ errors }" vid="confirmation">
                      <div class="layui-row">
                        <label for="L_repass" class="layui-form-label"
                          >确认密码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            name="repassword"
                            v-model="repassword"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                      </div>
                      <div class="layui-row">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      name="code"
                      rules="required|length:4"
                      v-slot="{ errors }"
                    >
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label"
                          >验证码</label
                        >
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="code"
                            v-model="code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class>
                          <span
                            class="svg"
                            style="color: #c00"
                            @click="_getCode()"
                            v-html="svg"
                          ></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(submit)"
                    >
                      立即注册
                    </button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, reg } from '@/api/login'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'reg',
  data () {
    return {
      username: '',
      name: '',
      password: '',
      repassword: '',
      code: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
      let sid = this.$store.state.sid
      getCode(sid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT!!
        return
      }
      reg({
        username: this.username,
        password: this.password,
        name: this.name,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.username = ''
          this.password = ''
          this.repassword = ''
          this.name = ''
          this.code = ''
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // 跳转到登录界面，让用户登录
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        } else {
          // username -> '用户名已经注册'
          // res.msg = { username: [], name: [], code: []}
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// 公用样式可以放在App.vue中
</style>
