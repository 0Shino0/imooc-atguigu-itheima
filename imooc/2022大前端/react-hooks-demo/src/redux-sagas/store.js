import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

// const logger = (store) => (next) => (action) => {}
function logger(store) {
  return function (next) {
    return function (action) {
      console.log('当前state', store.getState());
      console.log('触发的action', action);
      next(action);
      console.log('next之后的state', store.getState());
    };
  };
}

// export default createStore(reducer, applyMiddleware(thunk, logger));
export default createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);
