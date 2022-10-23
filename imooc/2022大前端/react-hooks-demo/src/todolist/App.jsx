import 'reset.css';
// import './index.scss';
import { useState } from 'react';
// import styles from './index.module.scss';
import styled from 'styled-components';

export default function App() {
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');
  const [item, setItem] = useState();
  const Wrapper = styled.div`
    background-color: red;
  `;

  const styleInline = {
    width: '200px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <Wrapper>
      <h1>todolist</h1>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              if (item) {
                const newList = [...lists];
                newList[item.index] = value;
                setLists(newList);
                setItem(null);
              } else {
                setLists([...lists, value]);
              }
              setValue('');
            }
          }}
        />
      </div>
      <ul>
        {lists.map((list, index) => (
          <li key={index} style={styleInline}>
            <span>{list}</span>
            <span>
              <span
                style={{ paddingRight: '15px' }}
                onClick={() => {
                  setValue(list);
                  setItem({
                    list,
                    index,
                  });
                }}
              >
                edit
              </span>
              <span
                onClick={() => {
                  setLists(lists.filter((_, i) => i !== index));
                }}
              >
                X
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
