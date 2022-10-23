import { createAction } from '@reduxjs/toolkit';

export const increment = createAction('todos/INCREMENT');
export const decrement = createAction('todos/DECREMENT');
export const reset = createAction('RESET');

// export const increment = () => ({ type: 'INCREMENT' });

// export const incrementAsync = () => {
//   return (dispach) => {
//     setTimeout(() => {
//       dispach(increment());
//     }, 2000);
//   };
// };

// export const decrement = () => ({ type: 'DECREMENT' });
