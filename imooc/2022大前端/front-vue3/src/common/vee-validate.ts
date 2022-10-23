/* eslint-disable @typescript-eslint/camelcase */
import { configure, defineRule } from 'vee-validate'
// import { required, email, min, length, confirmed, max, is_not } from '@vee-validate/rules'
import rules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import zh from '@vee-validate/i18n/dist/locale/zh_CN.json'

Object.keys(rules).forEach(rule => {
  defineRule(rule, rules[rule])
})
// defineRule('required', required)
// defineRule('email', email)
// defineRule('min', min)
// defineRule('length', length)
// defineRule('confirmed', confirmed)
// defineRule('max', max)
// defineRule('is_not', is_not)

const config = {
  // 使用扩展运算符，扩展中文包
  messages: {
    ...zh.messages,
    // 全局定义message
    required: '请输入{field}',
    min: '请在{field}输入至少0:{length}个字符',
    confirmed: '两次输入的内容不一致'
  },
  // 与validation-provider中的name对应
  // key为name, value为对应的中文field名称
  names: {
    email: '邮箱',
    password: '密码',
    repassword: '确认密码',
    oldpassword: '旧密码',
    name: '昵称',
    username: '账号',
    code: '验证码',
    title: '标题',
    catalog: '分类'
  },
  // 针对不同的name，定义不同的message消息
  fields: {
    catalog: {
      is_not: '请选择{_field_}'
    },
    email: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}'
    }
  }
}

configure({
  generateMessage: localize('zh_CN', config)
})
