import React from 'react';
import store from './store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { decrement, increment, reset } from './actions';

function Counter(props) {
  const counter = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <>
      {/* <h1>redux toolkit</h1> */}
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
          dispatch(increment(3));
        }}
      >
        +3
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -1
      </button>
      <button
        onClick={() => {
          dispatch(reset());
        }}
      >
        Reset
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
