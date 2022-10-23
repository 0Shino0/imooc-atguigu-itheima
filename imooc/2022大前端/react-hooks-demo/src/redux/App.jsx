import React from 'react';
import store from './store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './actions';

function Counter(props) {
  const counter = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <>
      <h3>{counter}</h3>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -1
      </button>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <h1>Counter app</h1>
      <Counter></Counter>
    </Provider>
  );
}

export default App;
