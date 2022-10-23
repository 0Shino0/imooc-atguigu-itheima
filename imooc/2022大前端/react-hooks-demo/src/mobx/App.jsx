import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

const store = makeAutoObservable({
  count: 0,
  increment() {
    this.count += 1;
  },
  decrement() {
    this.count -= 1;
  },
});

const Counter = observer(() => {
  return (
    <>
      <h3>{store.count}</h3>
      <button onClick={() => store.increment()}>+1</button>
      <button onClick={() => store.decrement()}>-1</button>
    </>
  );
});

export default function App() {
  return (
    <>
      <Counter></Counter>
    </>
  );
}
