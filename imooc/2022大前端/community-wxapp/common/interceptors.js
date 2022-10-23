import { simpleHttp } from './request/simple'
import { baseUrl } from '../config'
import store from '@/store'
import { authNav } from '@/common/checkAuth'
// 1.请求拦截器
// 2.在响应的时候，处理data数据
// 3.统一的错误处理
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
  // 此为自定义配置参数，具体参数见上方说明
  Vue.prototype.$u.http.setConfig({
    baseUrl,
    dataType: 'json',
    showLoading: true, // 是否显示请求中的loading
    loadingText: '请求中...', // 请求loading中的文字提示
    loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
    originalData: false, // 是否在拦截器中返回服务端的原始数据
    loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    // 配置请求头信息
    header: {
      'content-type': 'application/json;charset=UTF-8'
    },
    // options - 即为上一次请求的所有的config配置
    // instance - 即为原先的request实例 -> token已经被更新回来了，所以可以继续使用
    errorHandle: async (err, { options, instance }) => {
      if (err.statusCode === 401) {
        // todo 4.业务 —> refreshToken -> 请求响应401 -> 刷新token
        try {
          const { code, token } = await simpleHttp({
            method: 'POST',
            url: baseUrl + '/login/refresh'
          }, {
            header: {
              Authorization: 'Bearer ' + uni.getStorageSync('refreshToken')
            }
          })
          // console.log('🚀 ~ file: interceptors.js ~ line 30 ~ errorHandle: ~ token', token)
          if (code === 200) {
            // refreshToken请求成功
            // 1.设置全局的token
            store.commit('setToken', token)
            // 2.重新发起请求
            const newResult = await instance.request(options)
            return newResult
          }
        } catch (error) {
          // 代表refreshToken已经失效
          // 清除本地的token
          store.dispatch('logout')
          // 导航到用户的登录页面
          authNav()
        }
        uni.showToast({
          icon: 'none',
          title: '鉴权失败，请重新登录',
          duration: 2000
        })
      } else {
        // 其他的错误
        // showToast提示用户
        // 3.对错误进行统一的处理 -> showToast
        const { data: { msg } } = err
        uni.showToast({
          icon: 'none',
          title: msg || '请求异常，请重试',
          duration: 2000
        })
      }
    }
  })

  // 请求拦截，配置Token等参数
  Vue.prototype.$u.http.interceptor.request = (config) => {
  // 引用token
  // 1.在头部请求的时候，token带上 -> 请求拦截器
    const publicArr = [/\/public/, /\/login/]
    // local store -> uni.getStorageSync('token')
    let isPublic = false
    publicArr.forEach(path => {
      isPublic = isPublic || path.test(config.url)
    })
    const token = uni.getStorageSync('token')
    if (!isPublic && token) {
      config.header.Authorization = 'Bearer ' + token
    }
    // 最后需要将config进行return
    return config
  // 如果return一个false值，则会取消本次请求
  // if(config.url === '/user/rest') return false; // 取消某次请求
  }

  // 响应拦截，判断状态码是否通过
  Vue.prototype.$u.http.interceptor.response = (res) => {
    // console.log('🚀 ~ file: request.js ~ line 46 ~ install ~ res', res)
    return res
  }
}

export default {
  install
}
