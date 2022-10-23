import { useContext } from 'react';
import { TodoContext } from './store/context';

export default function List() {
  const { lists, dispatch } = useContext(TodoContext);
  return (
    <ul>
      {lists.map((item) => (
        <li
          key={item.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '200px',
          }}
        >
          <span>{item.value}</span>
          <div>
            <span
              style={{ paddingRight: '15px' }}
              onClick={() => {
                dispatch({ type: 'set', payload: item });
              }}
            >
              edit
            </span>
            <span
              onClick={() => {
                dispatch({
                  type: 'delete',
                  payload: item.id,
                });
              }}
            >
              x
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
