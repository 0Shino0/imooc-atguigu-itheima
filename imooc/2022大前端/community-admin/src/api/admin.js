import { axios } from '@/libs/request'
import Dispatch from '../libs/dispatch'

// 获取用户列表
// const getUserList = (params) => axios.get('/admin/users?' + qs.stringify(params))
// const updateUserById = (data) => axios.post('/admin/update-user', data)
// const updateUserBatchById = (data) => axios.post('/admin/update-user-settings', data)
// const deleteUserById = (ids) => axios.post('/admin/delete-user', { ids })
// const checkUsername = (username) => axios.get('/admin/checkname?username=' + username)
// const addUser = (data) => axios.post('/admin/add-user', data)
export const userDispatch = new Dispatch({
  get: ['/admin/users', 'get'],
  update: ['/admin/updateUser', 'post'],
  batch: ['/admin/updateUserSettings', 'post'],
  delete: ['/admin/deleteUser', 'post'],
  check: ['/admin/checkname', 'get'],
  add: ['/admin/addUser', 'post']
})

// const addMenu = (data) => axios.post('/admin/add-menu', data)
// const getMenu = () => axios.get('/admin/get-menu')
// const updateMenu = (data) => axios.post('/admin/update-menu', data)
// const deleteMenu = (data) => axios.post('/admin/delete-menu', data)
export const menuDispatch = new Dispatch({
  add: ['/admin/addMenu', 'post'],
  get: ['/admin/getMenu', 'get'],
  update: ['/admin/updateMenu', 'post'],
  delete: ['/admin/deleteMenu', 'post'],
  route: ['/admin/getRoutes', 'get']
})

// const addRole = (data) => axios.post('/admin/add-role', data)
// const getRoles = () => axios.get('/admin/get-roles')
// const getRoleNames = () => axios.get('/admin/get-roles-names')
// const updateRole = (data) => axios.post('/admin/update-role', data)
// const deleteRole = (data) => axios.post('/admin/delete-role', data)
export const roleDispatch = new Dispatch({
  add: ['/admin/addRole', 'post'],
  get: ['/admin/getRoles', 'get'],
  roles: ['/admin/getRolesNames', 'get'],
  update: ['/admin/updateRole', 'post'],
  delete: ['/admin/deleteRole', 'post']
})

// const getErrorList = (params) =>
//   axios.get('/admin/get-error?' + qs.stringify(params))
// const deleteErrors = (data) => axios.post('/admin/delete-error', data)
export const errorDispatch = new Dispatch({
  get: ['/admin/getError', 'get'],
  delete: ['/admin/deleteError', 'post']
})

// 封装一层，更加简练
export const commentsDispatch = new Dispatch({
  get: ['/admin/getComments', 'get'],
  // update: ['/admin/updateComments', 'post'],
  batch: ['/admin/updateCommentsBatch', 'post'],
  delete: ['/admin/deleteComments', 'post']
})

export const getStatData = () => axios.get('/admin/getstat')
