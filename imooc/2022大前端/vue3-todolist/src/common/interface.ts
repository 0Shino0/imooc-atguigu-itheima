import { TodoItemState } from './const'

export interface TodoItem {
  id: string;
  text: string;
  state: TodoItemState;
}
