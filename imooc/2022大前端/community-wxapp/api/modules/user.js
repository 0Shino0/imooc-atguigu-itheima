import Vue from 'vue'

const axios = Vue.prototype.$u

// 用户签到
const userSign = () => axios.get('/user/fav')

// 更新用户基本资料
const updateUserInfo = (data) => axios.post('/user/basic', data)

// 确认修改用户名
const updateUsername = (data) => axios.get('/public/resetEmail', data)

// 修改用户密码
const changePasswd = (data) => axios.post('/user/changePassword', {
  ...data
})

// 设置收藏 & 取消收藏
const addCollect = (data) => axios.get('/user/setCollect', data)

// 获取收藏列表
const getCollect = (data) => axios.get('/user/collect', data)

// 获取发表的文章列表
const getPostListByUid = (data) => axios.get('/user/post', data)

// 获取用户最近的发表文章列表
const getPostPublic = (data) => axios.get('/public/latestPost', data)

// 删除指定文章列表
const deletePostByUid = (data) => axios.get('/user/deletePost', data)

// 获取用户的基本信息
const getBasic = (data) => axios.get('/public/info', data)

// 获取用户最近评论列表
const getCommentList = (data) => axios.get('/public/latestComment', data)

// 获取用户未读消息
const getMsg = (data) => axios.get('/user/getmsg', data)

// 设置用户未读消息
const setMsg = (data) => axios.get('/user/setmsg', data)

// 个人中心的统计数字
const wxUserCount = params => axios.get('/user/wxUserCount', params)

// 获取点赞数据
const getHands = params => axios.get('/user/getHands', params)

// 微信下单接口
const orderGoods = params => axios.post('/user/wxOrder', params)

export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePasswd,
  addCollect,
  getCollect,
  getPostListByUid,
  deletePostByUid,
  getBasic,
  getCommentList,
  getPostPublic,
  getMsg,
  setMsg,
  wxUserCount,
  getHands,
  orderGoods
}
