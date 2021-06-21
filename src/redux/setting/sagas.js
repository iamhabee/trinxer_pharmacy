import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    getHeader: jwts.getHeader,
    getContact: jwts.getContact,
    getAbout: jwts.getAbout,
    updateAbout: jwts.updateAbout,
    updateContact: jwts.updateContact,
    updateHeader: jwts.updateHeader,
}

export function* GET_ABOUT() {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.getAbout)
  if (success.status) {
    yield put({
      type: 'setting/SET_STATE',
      payload: {
        about:success.data[0],
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'setting/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_CONTACT() {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.getContact)
  if (success.status) {
    yield put({
      type: 'setting/SET_STATE',
      payload: {
        contact:success.data[0],
        loading: false,
      },
    })
  }
  if (!success.status) {
    yield put({
      type: 'setting/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* GET_HEADER() {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.getHeader)
  if (success.status) {
    yield put({
      type: 'setting/SET_STATE',
      payload: {
        header:success.data[0],
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'setting/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_HEADER({payload}) {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateHeader, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'setting/GET_HEADER'
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
      type: 'setting/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_ABOUT({payload}) {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateAbout, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'setting/GET_ABOUT'
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
      type: 'setting/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_CONTACT({payload}) {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateContact, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'setting/GET_CONTACT'
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
      type: 'setting/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_ABOUT, GET_ABOUT),
    takeEvery(actions.GET_CONTACT, GET_CONTACT),
    takeEvery(actions.GET_HEADER, GET_HEADER),
    takeEvery(actions.UPDATE_ABOUT, UPDATE_ABOUT),
    takeEvery(actions.UPDATE_CONTACT, UPDATE_CONTACT),
    takeEvery(actions.UPDATE_HEADER, UPDATE_HEADER),
  ])
}
