import { escapeHtml } from '@/utils/escapeHtml'
import { DirectiveBinding } from 'vue'

export default {
  richtext: {
    bind: function (el: Element, binding: DirectiveBinding) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el: Element, binding: DirectiveBinding) {
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}
