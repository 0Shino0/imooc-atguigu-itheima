import { useReducer } from 'react';

import { TodoContext } from './store/context';
import { TodoReducer } from './store/reducers';
import { initialState } from './store/state';
import List from './List';
import Bar from './Bar';

export default function App() {
  const [appState, dispatch] = useReducer(TodoReducer, initialState);

  return (
    <TodoContext.Provider
      value={{ lists: appState.lists, item: appState.item, dispatch }}
    >
      <h1>todolist</h1>
      <Bar></Bar>
      <List></List>
    </TodoContext.Provider>
  );
}
