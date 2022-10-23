import produce from 'immer';

export const TodoReducer = produce((state, action) => {
  switch (action.type) {
    case 'add':
      state.lists.push(action.payload);
      // return {
      //   ...state,
      //   lists: [...state.lists, action.payload],
      // };
      break;
    case 'delete':
      // state.lists.push(action.payload);
      state.lists = state.lists.filter((item) => item.id !== action.payload);
      // return {
      //   ...state,
      //   lists: [...state.lists.filter((item) => item.id !== action.payload)],
      // };
      break;
    case 'additem':
      state.lists[1] = action.payload;
      break;
    default:
      return state;
  }
});
