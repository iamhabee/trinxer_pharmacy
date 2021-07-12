import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwt from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

export function* ALL_OFFICES() {
  yield put({
    type: 'office/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.getOffices)
  if (success.status) {
    yield put({
      type: 'office/SET_STATE',
      payload: {
        offices:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'office/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_OFFICE({payload}) {
  yield put({
    type: 'office/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateOffice, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'office/ALL_OFFICES'
    })
    message.success({
      content: success.message,
      duration: 5,
      style: {
        marginTop: '50vh',
      },
    })
  }
  if (!success.status) {
    yield put({
      type: 'office/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CREATE_OFFICE({payload}) {
  yield put({
    type: 'office/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.createOffice, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'office/ALL_OFFICES'
    })
    message.success({
      content: success.message,
      duration: 5,
      style: {
        marginTop: '50vh',
      },
    })
  }
  if (!success.status) {
    yield put({
      type: 'office/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ALL_OFFICES, ALL_OFFICES),
    takeEvery(actions.UPDATE_OFFICE, UPDATE_OFFICE),
    takeEvery(actions.CREATE_OFFICE, CREATE_OFFICE),
  ])
}
