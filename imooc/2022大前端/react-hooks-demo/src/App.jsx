import './App.css';
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import React from 'react';

// 使用localStorage来缓存数据 -> string, object, function
// 利用localStorage来进行缓存数据
const useLocalStorage = (key, initialValue) => {
  // key -> 命名空间 -> 区别不同的storage
  const [stateValue, setStateValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setStorage = (newVal) => {
    let valueToStore;
    if (newVal instanceof Function) {
      valueToStore = newVal(stateValue);
    } else {
      valueToStore = newVal;
    }
    setStateValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [stateValue, setStorage];
};

const ColorContext = createContext();

const initialState = {
  count: 0,
  color: 'blue',
  // ....
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'set':
      return { ...state, color: action.payload };
    default:
      return state;
  }
};

function App() {
  // console.log(useState(1));
  // const [count, setCount] = useState(2);
  const [count, setCount] = useLocalStorage('count', 2);
  // const [color, setColor] = useState('blue');

  const doubleCount = useMemo(() => {
    // console.log('in memo');
    return count * 2;
  }, [count]);

  const [obj, setObj] = useState({
    p1: 'p1value',
    p2: 'p2value',
  });

  useEffect(() => {
    // console.log('in useEffect');
    return () => {
      // console.log('clean work');
    };
  }, [obj]);

  const [appState, dispatch] = useReducer(AppReducer, initialState);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    // console.log(
    //   '🚀 ~ file: App.jsx ~ line 55 ~ useEffect ~ inputRef',
    //   inputRef
    // );
  }, []);

  const logCountValue = useCallback(() => {
    console.log('logCountValue');
  }, [count]);

  return (
    <div>
      hello react
      <p>counter:</p>
      <div>count: {count}</div>
      <div>double: {doubleCount}</div>
      {/* <button
        onClick={() => {
          const newCount = count + 1;
          setCount(newCount);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          const newCount = count - 1;
          setCount(newCount);
        }}
      >
        -
      </button> */}
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount((prev) => prev - 1);
        }}
      >
        -
      </button>
      <p>reducer buttons</p>
      <div>reducer count: {appState.count}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <p>Object useState Demo</p>
      <div>{obj.p1}</div>
      <div>{obj.p2}</div>
      <button
        onClick={() =>
          setObj((prev) => ({
            ...prev,
            p2: 'new Value',
          }))
        }
      >
        set P2 Value
      </button>
      <button
        onClick={() =>
          dispatch({
            type: 'set',
            payload: appState.color === 'blue' ? 'red' : 'blue',
          })
        }
      >
        switch
      </button>
      <ColorContext.Provider value={{ color: appState.color, dispatch }}>
        <ChildComponent></ChildComponent>
      </ColorContext.Provider>
      <div>
        <input type="text" ref={inputRef} />
      </div>
      <button
        onClick={() =>
          dispatch({
            type: 'set',
            payload: inputRef.current.value || '',
          })
        }
      >
        set Color
      </button>
      <NestPureComponent logCountValue={logCountValue}></NestPureComponent>
    </div>
  );
}

class NestPureComponent extends React.PureComponent {
  render() {
    const { logCountValue } = this.props;
    console.log('nestpureComponent rendered');
    logCountValue && logCountValue();
    return <div>NestPureComponent</div>;
  }
}

function ChildComponent() {
  const { color, dispatch } = useContext(ColorContext);
  return (
    <div style={{ color }}>
      <h3>Child Component</h3>
      <button
        onClick={() =>
          dispatch({
            type: 'set',
            payload: color === 'blue' ? 'red' : 'blue',
          })
        }
      >
        switch in child
      </button>
    </div>
  );
}

export default App;
