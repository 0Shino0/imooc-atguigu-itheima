import { axios } from '@/libs/request'
import qs from 'qs'

// 内容管理 -> 文章管理
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}

const deletePostById = (ids) => {
  return axios.post('/admin/content/delete', { ids })
}

const updatePostById = (data) => {
  return axios.post('/admin/content/updateId', data)
}

const updatePostBatchById = (data) => {
  return axios.post('/admin/content/updatePostSettings', data)
}

// 内容管理 -> 标签管理
const getTags = (options) => {
  return axios.get('/admin/getTags?' + qs.stringify(options))
}

const addTag = (data) => {
  return axios.post('/admin/addTag', data)
}

const removeTag = (id) => {
  return axios.get('/admin/removeTag?ptid=' + id)
}

const updateTag = (data) => {
  return axios.post('/admin/editTag?', data)
}

export {
  getList,
  deletePostById,
  updatePostById,
  getTags,
  addTag,
  removeTag,
  updateTag,
  updatePostBatchById
}
