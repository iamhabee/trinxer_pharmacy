import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    allServices: jwts.allServices,
    updateService: jwts.updateService,
    createService: jwts.createService,
}

export function* ALL_SERVICES() {
  yield put({
    type: 'service/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.allServices)
  if (success.status) {
    yield put({
      type: 'service/SET_STATE',
      payload: {
        services:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'service/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_SERVICE({payload}) {
  yield put({
    type: 'service/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateService, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'service/ALL_SERVICES'
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
      type: 'service/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CREATE_SERVICE({payload}) {
  yield put({
    type: 'service/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.createService, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'service/ALL_SERVICES'
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
      type: 'service/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ALL_SERVICES, ALL_SERVICES),
    takeEvery(actions.UPDATE_SERVICE, UPDATE_SERVICE),
    takeEvery(actions.CREATE_SERVICE, CREATE_SERVICE),
  ])
}
