import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    allAdmins: jwts.allAdmins,
    deleteAdmin: jwts.deleteAdmin,
    updateAdmin: jwts.updateAdmin,
    createAdmin: jwts.createAdmin,
    activateAdmin: jwts.activateAdmin,
}

export function* ALL_ADMIN() {
  yield put({
    type: 'admin/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.allAdmins)
  if (success.status) {
    yield put({
      type: 'admin/SET_STATE',
      payload: {
        admins:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'admin/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_ADMIN({payload}) {
  yield put({
    type: 'admin/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateAdmin, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'admin/ALL_ADMIN'
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
      type: 'admin/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* DELETE_ADMIN({payload}) {
  yield put({
    type: 'admin/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.deleteAdmin, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'admin/ALL_ADMIN'
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
      type: 'admin/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* ACTIVATE_ADMIN({payload}) {
  yield put({
    type: 'admin/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.activateAdmin, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'admin/ALL_ADMIN'
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
      type: 'admin/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CREATE_ADMIN({payload}) {
  yield put({
    type: 'admin/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.createAdmin, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'admin/ALL_ADMIN'
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
      type: 'admin/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ALL_ADMIN, ALL_ADMIN),
    takeEvery(actions.DELETE_ADMIN, DELETE_ADMIN),
    takeEvery(actions.ACTIVATE_ADMIN, ACTIVATE_ADMIN),
    takeEvery(actions.UPDATE_ADMIN, UPDATE_ADMIN),
    takeEvery(actions.CREATE_ADMIN, CREATE_ADMIN),
  ])
}
