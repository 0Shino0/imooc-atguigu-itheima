import { getCode, login, reg, forget, reset } from '@/api/login'
import { HttpResponse } from '@/common/interface'
import { v4 as uuidv4 } from 'uuid'
import store from '@/store'
import { reactive } from 'vue'
import { getDecodeParam } from '../utils/common'
import { useRouter } from 'vue-router'
// import router from '@/router'

export const LoginService = () => {
  let sid = ''

  const router = useRouter()

  const state = reactive({
    username: '',
    name: '',
    password: '',
    repassword: '',
    code: '',
    svg: ''
  })

  const getCaptcha = async () => {
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid') || ''
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    store.commit('setSid', sid)
    const { data, code } = await getCode(sid) as HttpResponse
    if (code === 200) {
      state.svg = data
    }
  }

  const loginHandle = async () => {
    const res = await login({
      username: state.username,
      password: state.password,
      code: state.code,
      sid: sid
    })

    const { code, data, token } = res as HttpResponse
    if (code === 200) {
      // 存储用户的登录名
      data.username = state.username
      store.commit('setUserInfo', data)
      store.commit('setIsLogin', true)
      store.commit('setToken', token)
      state.username = ''
      state.password = ''
      state.code = ''
      router.push({ name: 'index' })
    }
    return res
  }

  const regHandle = async () => {
    const res = await reg({
      username: state.username,
      password: state.password,
      name: state.name,
      code: state.code,
      sid: sid
    })

    const { code } = res as HttpResponse
    if (code === 200) {
      state.username = ''
      state.password = ''
      state.repassword = ''
      state.name = ''
      state.code = ''
      // router.push({ name: 'home' })
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }
    return res
  }

  const forgetHandle = async () => {
    const res = await forget({
      username: state.username,
      code: state.code
    })

    const { code } = res as HttpResponse

    if (code === 200) {
      alert('邮件发送成功')
    }

    return res
  }

  const resetHandle = async () => {
    const key = getDecodeParam('key')
    const res = await reset({
      key: key || '',
      password: state.password,
      sid: store.state.sid,
      code: state.code
    })
    const { code } = res as HttpResponse
    if (code === 200) {
      router.push({ name: 'login' })
    }
  }

  return {
    state,
    getCaptcha,
    loginHandle,
    regHandle,
    forgetHandle,
    resetHandle
  }
}
