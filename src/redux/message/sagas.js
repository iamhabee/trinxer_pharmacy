import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import actions from './actions'

const jwt = {
    allMessages: jwts.allMessages,
}

export function* ALL_MESSAGES({payload}) {
  yield put({
    type: 'message/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.allMessages, payload)
  if (success.status) {
    yield put({
      type: 'message/SET_STATE',
      payload: {
        messages:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'message/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ALL_MESSAGES, ALL_MESSAGES),
  ])
}
