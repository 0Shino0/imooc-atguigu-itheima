import axios from '@/common/request'
import qs from 'qs'
import store from '@/store'
import type { CommentsInfo } from '../common/interface'

// 获取文章中的评论列表
export const getComents = (params: { tid: string; page: number; limit: number }) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/comments?' + qs.stringify(params), headers)
}

// 添加评论
export const addComment = (data: CommentsInfo) => axios.post('/comments/reply', { ...data })

// 更新评论
export const updateComment = (data: CommentsInfo) => axios.post('/comments/update', { ...data })

// 采纳最佳评论
export const setCommentBest = (params: { cid: string; tid: string }) =>
  axios.get('/comments/accept?' + qs.stringify(params))

// 设置点赞
export const setHands = (params: { cid: string }) =>
  axios.get('/comments/hands?' + qs.stringify(params))
