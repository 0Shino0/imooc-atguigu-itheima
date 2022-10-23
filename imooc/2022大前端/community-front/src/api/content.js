import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'

/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
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
const uploadImg = (formData) => axios.post('/content/upload', formData)

// 发贴接口
const addPost = (data) => axios.post('/content/add', { ...data })

// 获取文章详情
const getDetail = (tid) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/content/detail?tid=' + tid, headers)
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
