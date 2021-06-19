import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    allRoles: jwts.allRoles,
    updateRole: jwts.updateRole,
    createRole: jwts.createRole,
}

export function* ALL_ROLES() {
  yield put({
    type: 'role/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.allRoles)
  if (success.status) {
    yield put({
      type: 'role/SET_STATE',
      payload: {
        roles:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'role/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_ROLE({payload}) {
  yield put({
    type: 'role/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateRole, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'role/ALL_ROLES'
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
      type: 'role/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CREATE_ROLE({payload}) {
  yield put({
    type: 'role/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.createRole, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'role/ALL_ROLES'
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
      type: 'role/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ALL_ROLES, ALL_ROLES),
    takeEvery(actions.UPDATE_ROLE, UPDATE_ROLE),
    takeEvery(actions.CREATE_ROLE, CREATE_ROLE),
  ])
}
