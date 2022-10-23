import { escapeHtml } from '@/utils/escapeHtml'
import type { DirectiveBinding } from 'vue'

interface DirectiveObject {
  [key: string]: {
    bind: (el: HTMLElement, binding: DirectiveBinding) => void
    componentUpdated: (el: HTMLElement, binding: DirectiveBinding) => void
  }
}

const directives: DirectiveObject = {
  richtext: {
    bind: function (el: Element, binding: DirectiveBinding) {
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el: Element, binding: DirectiveBinding) {
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}

export default directives
