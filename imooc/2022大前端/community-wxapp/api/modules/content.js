import { baseUrl } from '@/config'
import store from '@/store'
import Vue from 'vue'

const axios = Vue.prototype.$u
/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
const getList = (options) => {
  return axios.get('/public/list', options)
}

// 温馨提醒
const getTips = () => {
  return axios.get('/public/tips')
}

// 本周热议
const getTop = () => {
  return axios.get('/public/topWeek')
}

// 友情链接
const getLinks = () => {
  return axios.get('/public/links')
}

// 图片上传接口
const uploadImg = (params, callback) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: baseUrl + '/content/upload', // 仅为示例，非真实的接口地址
      filePath: params,
      name: 'file',
      header: {
        'Content-Type': 'multipart/form-data',
        authorization: 'Bearer ' + store.state.token
      },
      formData: {
        // 'user': 'test'
      },
      success: (uploadFileRes) => {
        resolve(uploadFileRes)
      },
      fail: (err) => {
        reject(err)
      },
      complete: (res) => {
        callback && callback(res)
      }
    })
  })
}

// 发贴接口
const addPost = (data) => axios.post('/content/wxAdd', data)

// 获取文章详情
const getDetail = (data) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/content/detail', data, headers)
}

// 更新文章，编辑帖子
const updatePost = (data) => axios.post('/content/update', { ...data })

export {
  getList,
  getTips,
  getTop,
  getLinks,
  uploadImg,
  addPost,
  getDetail,
  updatePost
}
