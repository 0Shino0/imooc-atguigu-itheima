import store from '@/store'

export const authNav = (title = '登录已失效', duration = 2000) => {
  global.ctrl && clearTimeout(global.ctrl)
  // 1.给用户一个轻提示
  uni.showToast({
    icon: 'none',
    title,
    duration
  })
  // 2.2s之后跳转到登录页面
  global.ctrl = setTimeout(() => {
    uni.navigateTo({
      url: '/subcom-pkg/auth/auth'
    })
  }, 2000)
}

export const checkSession = async () => {
  try {
    await uni.checkSession()
    return true
  } catch (error) {
    return false
  }
}

export const checkToken = async () => {
  let flag = true
  const token = uni.getStorageSync('token')
  const checked = await checkSession()
  if (!store.state.token || !token || !checked) {
    flag = false
    uni.showModal({
      title: '您未登录',
      content: '需要登录才能操作，确定登录吗？',
      success: function (res) {
        if (res.confirm) {
          uni.navigateTo({
            url: '/subcom-pkg/auth/auth'
          })
        }
      }
    })
  }
  return flag
}

export const checkAuth = async () => {
  let flag = true
  const token = uni.getStorageSync('token')
  const checked = await checkSession()
  if (!store.state.token || !token || !checked) {
    flag = false
  }
  return flag
}

export const gotoGuard = async (path) => {
  const flag = await checkAuth()
  if (!flag) {
    await authNav()
  } else {
    uni.navigateTo({
      url: path
    })
  }
}
