import { escapeHtml } from '@/utils/escapeHtml'
import store from '@/store'
export default {
  'richtext': {
    bind: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  },
  'hasRole': {
    inserted: function (el, binding, vnode) {
      let roles = store.state.userInfo.roles || ['user']
      if (!roles.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  },
  'hasPermission': {
    inserted: function (el, binding, vnode) {
      let types = vnode.context.$route.meta.types
      let values = binding.value
      let flag = true
      for (let v of values) {
        if (!types.includes(v)) {
          flag = false
        }
      }
      if (!flag) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
