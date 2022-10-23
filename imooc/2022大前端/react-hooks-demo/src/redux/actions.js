export const increment = () => ({ type: 'INCREMENT' });

export const incrementAsync = () => {
  return (dispach) => {
    setTimeout(() => {
      dispach(increment());
    }, 2000);
  };
};

export const decrement = () => ({ type: 'DECREMENT' });
