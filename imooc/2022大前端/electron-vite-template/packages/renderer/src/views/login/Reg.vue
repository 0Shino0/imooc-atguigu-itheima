<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div id="LAY_ucm" class="layui-form layui-tab-content" style="padding: 20px 0">
          <Form v-slot="{ errors }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <div class="layui-input-inline">
                      <Field
                        v-model="state.username"
                        as="input"
                        type="text"
                        name="username"
                        rules="required|email"
                        placeholder="请输入用户名"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid layui-word-aux"> 将会成为您唯一的登入名 </div>
                  </div>
                  <div class="layui-row">
                    <span style="color: #c00">{{ errors.username }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_username" class="layui-form-label">昵称</label>
                    <div class="layui-input-inline">
                      <Field
                        v-model="state.name"
                        as="input"
                        type="text"
                        rules="required|min:4"
                        name="name"
                        placeholder="请输入昵称"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                  </div>
                  <div class="layui-row">
                    <span style="color: #c00">{{ errors.name }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <div class="layui-input-inline">
                      <Field
                        v-model="state.password"
                        as="input"
                        rules="required|min:6|max:16"
                        type="password"
                        name="password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                  </div>
                  <div class="layui-row">
                    <span style="color: #c00">{{ errors.password }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_repass" class="layui-form-label">确认密码</label>
                    <div class="layui-input-inline">
                      <Field
                        v-model="state.repassword"
                        as="input"
                        type="password"
                        name="repassword"
                        rules="confirmed:@password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                  </div>
                  <div class="layui-row">
                    <span style="color: #c00">{{ errors.repassword }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <Field
                        v-model="state.code"
                        as="input"
                        rules="required|length:4"
                        type="text"
                        name="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class>
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
                  <button class="layui-btn" type="submit">立即注册</button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
                  <span class="iconfont icon-qq" title="QQ登入"></span>
                  <span class="iconfont icon-weibo" title="微博登入"></span>
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
  /* eslint-disable vue/no-v-html */
  import { defineComponent, onMounted } from 'vue'
  import { Form, Field } from 'vee-validate'
  import { LoginService } from '@/services/login'
  import type { SubmissionHandler, LoginInfo, HttpResponse } from '@/common/interface'

  export default defineComponent({
    name: 'RegPage',
    components: {
      Form,
      Field
    },
    setup() {
      const { state, getCaptcha, regHandle } = LoginService()

      const submit: SubmissionHandler<LoginInfo> = async (value, { form }) => {
        const res = await regHandle()
        const { setErrors, reset } = form
        const { code, msg } = res as HttpResponse
        if (code === 200) {
          requestAnimationFrame(() => {
            reset()
          })
        } else if (typeof msg === 'object') {
          setErrors({
            ...msg
          })
        } else {
          setErrors({
            code: msg
          })
        }
      }

      onMounted(async () => await getCaptcha())

      return {
        state,
        getCaptcha,
        submit
      }
    }
  })
</script>

<style scoped></style>
