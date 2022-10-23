import React, { useContext } from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';

const MyContext = React.createContext();

const Counter = observer(() => {
  const store = useContext(MyContext);
  return (
    <>
      <h1>count: {store.count}</h1>
      <h1>double count: {store.double}</h1>
      <button onClick={() => store.increment()}>+1</button>
      <button onClick={() => store.decrement()}>-1</button>
    </>
  );
});

export default function App() {
  const store = useLocalStore(() => ({
    count: 0,
    get double() {
      return store.count * 2;
    },
    increment() {
      store.count++;
    },
    decrement() {
      store.count--;
    },
  }));
  return (
    <MyContext.Provider value={store}>
      <Counter></Counter>
    </MyContext.Provider>
  );
}
