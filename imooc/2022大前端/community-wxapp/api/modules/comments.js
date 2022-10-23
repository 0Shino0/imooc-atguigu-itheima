import Vue from 'vue'
import store from '@/store'

const axios = Vue.prototype.$u

// 获取文章中的评论列表
const getComents = (params) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/comments', params, headers)
}

// 添加评论
const addComment = (data) => axios.post('/comments/reply', { ...data })

// 更新评论
const updateComment = (data) => axios.post('/comments/update', { ...data })

// 采纳最佳评论
const setCommentBest = (params) => axios.get('/comments/accept', params)

// 设置点赞
const setHands = (params) => axios.get('/comments/hands', params)

export {
  getComents,
  addComment,
  updateComment,
  setCommentBest,
  setHands
}
