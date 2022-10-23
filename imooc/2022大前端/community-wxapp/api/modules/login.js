import Vue from 'vue'

const axios = Vue.prototype.$u

/**
 * 获取验证码接口
 * @param {*} sid 唯一标识
 */
const getCode = (sid) => {
  // axios.request({
  //  method: 'get',
  //  url: '/getCaptcha'
  // })
  return axios.get('/public/getCaptcha', {
    sid: sid
  })
}

/**
 * 找回密码接口
 * @param {} option 用户信息（邮箱，验证码）
 */
const forget = (option) => {
  return axios.post('/login/forget', {
    ...option
  })
}

/**
 * 登录接口
 * @param {*} loginInfo 用户登录信息
 */
const login = (loginInfo) => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

/**
 * 注册接口
 * @param {*} regInfo 用户注册信息
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}

/**
 * 重置密码接口
 * @param {*} info 重置密码信息
 */
const reset = (info) => axios.post('/login/reset', { ...info })

/**
 * 微信登录接口
 * @param {*} loginInfo 用户登录信息
 */
const wxLogin = (loginInfo) => {
  return axios.post('/login/wxLogin', {
    ...loginInfo
  })
}

/**
 * 手机登录接口
 * @param {*} loginInfo 用户登录信息
 */
const loginByPhone = (loginInfo) => {
  return axios.post('/login/loginByPhone', {
    ...loginInfo
  })
}

// 获取用户手机号
const getMobile = (data) => axios.post('/login/getMobile', data)

// 发送短信
const sendCode = params => axios.get('/public/sendCode', params)

// 获取模板id
const getSubIds = () => axios.get('/public/subids')

export {
  getCode,
  forget,
  login,
  reg,
  reset,
  wxLogin,
  getMobile,
  sendCode,
  loginByPhone,
  getSubIds
}
