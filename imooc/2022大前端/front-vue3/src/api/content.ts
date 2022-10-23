import axios from '@/common/request'
import qs from 'qs'
import store from '@/store'
import { SortOptions, PostInfo } from '../common/interface'

/**
 * 读取文章列表
 * @param {Object} options 读取文章列表接口参数
 */
export const getList = (options: SortOptions) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

// 温馨提醒
export const getTips = () => {
  return axios.get('/public/tips')
}

// 本周热议
export const getTop = () => {
  return axios.get('/public/topWeek')
}

// 友情链接
export const getLinks = () => {
  return axios.get('/public/links')
}

// 图片上传接口
export const uploadImg = (formData: FormData) => axios.post('/content/upload', formData)

// 发贴接口
export const addPost = (data: PostInfo) => axios.post('/content/add', { ...data })

// 获取文章详情
export const getDetail = (tid: string) => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/content/detail?tid=' + tid, headers)
}

// 更新文章，编辑帖子
export const updatePost = (data: PostInfo) => axios.post('/content/update', { ...data })
