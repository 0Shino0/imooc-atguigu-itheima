import { createSlice } from '@reduxjs/toolkit';
// import { increment, decrement } from './actions';

const initialState = {
  count: 0,
};

const todosReducer = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
});

export default todosReducer.reducer;
export const { increment, decrement } = todosReducer.actions;

// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         count: state.count + 1,
//       };
//     case 'DECREMENT':
//       return {
//         count: state.count - 1,
//       };
//     default:
//       return state;
//   }
// }
