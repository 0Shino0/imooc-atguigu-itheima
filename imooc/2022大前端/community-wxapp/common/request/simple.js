export const simpleHttp = (options, { header = {}, callback }) => {
  const result = new Promise((resolve, reject) => {
    uni.request(Object.assign({
      timeout: 10 * 1000
    }, options, {
      header,
      success: (res) => {
        // 请求成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        callback && callback()
      }
    }))
  })
  return result
}
