/* eslint-disable handle-callback-err */
import axios from 'axios'
import store from '@/store'
import config from '@/config'
import request from './request'
import router from '@/router'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 10000
})

const errorHandle = async (err) => {
  // ('errorHandle -> err', err)
  if (err.response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken')
    // token已经过期
    // 需要请求refreshToken接口
    try {
      const result = await instance.post('/login/refresh', null, {
        headers: {
          'Authorization': 'Bearer ' + refreshToken
        }
      })
      if (result) {
        store.commit('setToken', result.data.token)
        // 1. 成功 -> 重新发起请求 -> 参数
        return request.request(err.config)
      }
    } catch (error) {
      // 2. 失败 -> token全失效需要用户重新登录
      localStorage.clear()
      store.commit('setToken', '')
      store.commit('setUserInfo', {})
      store.commit('setIsLogin', false)
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
          // router.currentRoute -> $route
        }
      })
      return false
    }
  }
}

export default errorHandle
