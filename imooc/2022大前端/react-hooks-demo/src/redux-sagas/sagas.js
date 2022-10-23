import { delay, put, takeEvery } from 'redux-saga/effects';

function* incrementAsync(action) {
  try {
    yield delay(2000);
    yield put({ type: 'INCREMENT' });
  } catch (error) {}
}

function* decrementAsync(action) {
  try {
    yield delay(2000);
    yield put({ type: 'DECREMENT' });
  } catch (error) {}
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
  yield takeEvery('DECREMENT_ASYNC', decrementAsync);
}
