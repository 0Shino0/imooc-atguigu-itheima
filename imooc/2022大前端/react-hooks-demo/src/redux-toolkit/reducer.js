import { createReducer } from '@reduxjs/toolkit';
import { increment, decrement } from './actions';

const initialState = {
  count: 0,
};

const todosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.count += action.payload || 1;
    })
    .addCase(decrement, (state, action) => {
      state.count -= 1;
    })
    // .addMatcher(
    //   (action) => action.type.startsWith('todos/'),
    //   (state, action) => {
    //     console.log('1', action);
    //     console.log('1', state);
    //   }
    // )
    .addDefaultCase((state, action) => {
      state.count = 0;
    });
  // .addMatcher(
  //   (action) => action.type.endsWith('INCREMENT'),
  //   (state, action) => {
  //     console.log('1', action);
  //     console.log('1', state);
  //     return state;
  //   }
  // );
});

export default todosReducer;

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
