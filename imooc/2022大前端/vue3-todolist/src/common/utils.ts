import { TodoItemState } from '@/common/const'
import store from '@/store'

export const utils = () => {
  const clear = (type: TodoItemState) => {
    store.commit('clear', type)
  }
  return {
    clear,
    TodoItemState
  }
}

export const storage = {
  get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
  set: (value: any) => localStorage.setItem('latest_todos', JSON.stringify(value))
}
