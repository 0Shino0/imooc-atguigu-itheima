import { TodoContext } from './store/context';
import { useContext, useState, useEffect } from 'react';

export default function Bar() {
  const { item, dispatch } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState('');
  // console.log('🚀 ~ file: Bar.jsx ~ line 4 ~ Bar ~ context', context);
  useEffect(() => {
    item && setInputValue(item.value);
  }, [item]);

  return (
    <>
      <input
        type="text"
        placeholder="请输入待办项"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            // console.log(inputValue);
            if (item) {
              dispatch({
                type: 'edit',
                payload: { ...item, value: inputValue },
              });
            } else {
              dispatch({
                type: 'add',
                payload: { value: inputValue, id: Date.now() },
              });
            }

            setInputValue('');
          }
        }}
      />
      <button
        onClick={() => {
          dispatch({
            type: 'additem',
            payload: { value: 'xxxx', id: Date.now() },
          });
        }}
      >
        test
      </button>
    </>
  );
}
