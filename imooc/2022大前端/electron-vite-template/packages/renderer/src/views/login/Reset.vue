<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link to="/login">登录</router-link>
          </li>
          <li class="layui-this">
            <router-link to="/forget">重置密码</router-link>
          </li>
        </ul>
        <div id="LAY_ucm" class="layui-form layui-tab-content" style="padding: 20px 0">
          <Form ref="observer" v-slot="{ validate, errors }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_phone" class="layui-form-label">新密码</label>
                    <div class="layui-input-inline">
                      <Field
                        id="L_phone"
                        v-model="state.password"
                        as="input"
                        type="password"
                        name="phone"
                        class="layui-input"
                        rules="required|min:6|max:16"
                      />
                    </div>
                    <div class="layui-form-mid layui-word-aux"> 6到16个字符 </div>
                  </div>
                  <div class="layui-row">
                    <span style="color: #c00">{{ errors.password }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_imagecode1" class="layui-form-label">确认密码</label>
                    <div class="layui-input-inline">
                      <Field
                        v-model="state.repassword"
                        as="input"
                        type="password"
                        name="repassword"
                        class="layui-input"
                        rules="required|min:6|max:16|confirmed:@password"
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
                    <div class="layui-input-inline"></div>
                    <Field
                      as="input"
                      rules="required|length:4"
                      type="text"
                      name="code"
                      placeholder="请输入验证码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                  <div
                    id="img"
                    class="layui-form-mid"
                    style="padding: 0 !important; width: 150px"
                    @click="getCaptcha()"
                  ></div>
                </div>
                <div class="layui-row">
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.code }}</span>
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <button class="layui-btn" type="button" @click="validate().then(resetHandle)">
                  提交
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { LoginService } from '@/services/login'
  import { Form, Field } from 'vee-validate'
  import { defineComponent, onMounted } from 'vue'
  const { state, resetHandle, getCaptcha } = LoginService()

  export default defineComponent({
    name: 'ResetPage',
    components: {
      Form,
      Field
    },
    setup() {
      onMounted(async () => await getCaptcha())
      return {
        state,
        resetHandle,
        getCaptcha
      }
    }
  })
</script>

<style lang="scss" scoped></style>
