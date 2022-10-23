import axios from '@/common/request'
import qs from 'qs'
import type { UserInfo, PageCommon, PostPageCommon } from '@/common/interface'

// 用户签到
export const userSign = () => axios.get('/user/fav')

// 更新用户基本资料
export const updateUserInfo = (data: UserInfo) => axios.post('/user/basic', data)

// 确认修改用户名
export const updateUsername = (data: { username: string }) =>
  axios.get('/public/resetEmail?' + qs.stringify(data))

// 修改用户密码
export const changePasswd = (data: { oldpwd: string; newpwd: string }) =>
  axios.post('/user/changePassword', {
    ...data
  })

// 设置收藏 & 取消收藏
export const addCollect = (data: { tid: string; title: string; isFav: number }) =>
  axios.get('/user/setCollect?' + qs.stringify(data))

// 获取收藏列表
export const getCollect = (data: PageCommon) => axios.get('/user/collect?' + qs.stringify(data))

// 获取发表的文章列表
export const getPostListByUid = (data: PageCommon) => axios.get('/user/post?' + qs.stringify(data))

// 获取用户最近的发表文章列表
export const getPostPublic = (data: PostPageCommon) =>
  axios.get('/public/latestPost?' + qs.stringify(data))

// 删除指定文章列表
export const deletePostByUid = (data: { tid: string }) =>
  axios.get('/user/deletePost?' + qs.stringify(data))

// 获取用户的基本信息
export const getInfo = (data: { uid: string }) => axios.get('/public/info?' + qs.stringify(data))

// 获取用户最近评论列表
export const getCommentList = (data: PostPageCommon) =>
  axios.get('/public/latestComment?' + qs.stringify(data))

// 获取用户未读消息
export const getMsg = (data: PageCommon) => axios.get('/user/getmsg?' + qs.stringify(data))

// 设置用户未读消息
export const setMsg = (data: { id: string }) => axios.get('/user/setmsg?' + qs.stringify(data))
