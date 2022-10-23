// 这个文件我们使用uni.request进行封装
// 同样适合于原生小程序的request封装 -> Promise API

// 需求分析

const errorHandle = (err) => {
  if (err.statusCode === 401) {
    // todo 4.业务 —> refreshToken -> 请求响应401 -> 刷新token
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

export const request = (options = {}) => {
  const { success, fail } = options
  // 1.在头部请求的时候，token带上 -> 请求拦截器
  const publicArr = [/\/public/, /\/login/]
  // local store -> uni.getStorageSync('token')
  let isPublic = false
  publicArr.forEach(path => {
    isPublic = isPublic || path.test(options.url)
  })
  const token = uni.getStorageSync('token')
  if (!isPublic && token) {
    options.header = Object.assign({},
      {
        Authorization: 'Bearer ' + token
      }, options.header)
  }
  return new Promise((resolve, reject) => {
    uni.request(Object.assign({}, options, {
      success: (res) => {
        // 响应拦截器
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (success && typeof success === 'function') {
            // 2.在响应的时候，处理data数据
            success(res.data)
            return
          }
          // 请求成功
          // 2.在响应的时候，处理data数据
          resolve(res.data)
        } else {
          // 请求失败
          errorHandle(res)
          reject(res)
        }
      },
      fail: (err) => {
        if (fail && typeof fail === 'function') {
          fail(err)
          return
        }
        errorHandle(err)
        reject(err)
      }
    }))
  })
}
