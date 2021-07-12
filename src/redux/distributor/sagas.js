import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwt from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

export function* ALL_DISTRIBUTORS() {
  yield put({
    type: 'distributor/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.getDistributors)
  if (success.status) {
    yield put({
      type: 'distributor/SET_STATE',
      payload: {
        distributors:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'distributor/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_DISTRIBUTOR({payload}) {
  yield put({
    type: 'distributor/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateDistributor, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'distributor/ALL_DISTRIBUTORS'
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
      type: 'distributor/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CREATE_DISTRIBUTOR({payload}) {
  yield put({
    type: 'distributor/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.createDistributor, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'distributor/ALL_DISTRIBUTORS'
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
      type: 'distributor/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ALL_DISTRIBUTORS, ALL_DISTRIBUTORS),
    takeEvery(actions.UPDATE_DISTRIBUTOR, UPDATE_DISTRIBUTOR),
    takeEvery(actions.CREATE_DISTRIBUTOR, CREATE_DISTRIBUTOR),
  ])
}
