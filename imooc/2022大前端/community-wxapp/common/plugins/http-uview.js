import http from '@/common/request'
const install = (Vue) => {
  const $u = Object.assign({}, Vue.prototype.$u, {
    http: http,
    get: http.get,
    post: http.post,
    delete: http.delete,
    put: http.put
  })
  Vue.prototype.$u = $u
  // Vue.prototype.$u.http = http
  // Vue.prototype.$u.get = http.get
  // Vue.prototype.$u.post = http.post
  // Vue.prototype.$u.delete = http.delete
  // Vue.prototype.$u.put = http.put
}

export default { install }
