<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
        </ul>
        <div id="LAY_ucm" class="layui-form layui-tab-content" style="padding: 20px 0">
          <Form v-slot="{ errors, validate }" ref="form">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <Field
                      v-model="state.username"
                      as="input"
                      type="text"
                      name="name"
                      placeholder="请输入用户名"
                      rules="required|email"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.name }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <Field
                      v-model="state.password"
                      as="input"
                      type="password"
                      name="password"
                      placeholder="请输入密码"
                      rules="required|min:6"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.password }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <Field
                        v-model="state.code"
                        as="input"
                        type="text"
                        name="code"
                        placeholder="请输入验证码"
                        rules="required|length:4"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class>
                      <!-- eslint-disable vue/no-v-html -->
                      <span
                        class="svg"
                        style="color: #c00"
                        @click="getCaptcha()"
                        v-html="state.svg"
                      ></span>
                    </div>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.code }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button" @click="validate().then(loginHandle)"
                    >立即登录</button
                  >
                  <span style="padding-left: 20px">
                    <router-link :to="{ name: 'forget' }">忘记密码？</router-link>
                  </span>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a class="iconfont icon-qq" title="QQ登入" @click="showQrCode()"></a>
                  <a class="iconfont icon-weibo" title="微博登入" @click="showNotify()"></a>
                </div>
                <div v-show="show">
                  <div id="login_container"></div>
                  <div class="mask" @click="toggle"></div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Form, Field } from 'vee-validate'
  import { LoginService } from '@/services/login'
  import { defineComponent, onMounted, ref } from 'vue'
  import { alert } from '@/components/modules/alert'
  import { v4 as uuidv4 } from 'uuid'

  const { state, loginHandle, getCaptcha } = LoginService()

  export default defineComponent({
    name: 'LoginPage',
    components: {
      Form,
      Field
    },
    setup() {
      onMounted(async () => await getCaptcha())
      const show = ref(false)

      let cid = localStorage.getItem('cid')
      if (!cid) {
        cid = uuidv4()
        localStorage.setItem('cid', cid)
      }

      const showQrCode = () => {
        //  https://open.weixin.qq.com/connect/qrconnect?appid=wx0af81b0d697d9db0&redirect_uri=https%3A%2F%2Fopen.toimc.com&response_type=code&scope=snsapi_login#wechat_redirect
        new WxLogin({
          self_redirect: true,
          id: 'login_container',
          appid: 'wx0af81b0d697d9db0',
          scope: 'snsapi_login',
          redirect_uri: encodeURIComponent('https://open.toimc.com'),
          state: cid,
          style: 'white',
          href: ''
        })
        show.value = true
      }

      const toggle = () => {
        show.value = false
      }

      const showNotify = () => {
        new Notification('通知的标题', { body: '通知的内容' }).onclick = () => {
          console.log('通知被点击了')
        }
      }

      return {
        state,
        loginHandle,
        getCaptcha,
        alert,
        showQrCode,
        show,
        toggle,
        showNotify
      }
    }
  })
</script>

<style lang="scss" scoped>
  #login_container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 30000;
  }
</style>
