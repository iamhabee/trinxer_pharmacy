import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as sites from 'services/jwt/siteApi'
import actions from './actions'
import {notification} from 'antd'

const jwt = {
    fetchSetting: sites.fetchSetting,
    fetchTeam: sites.fetchTeam,
    sendMessage: sites.sendMessage,
    fetchService: sites.fetchService
}

export function* ABOUT() {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.fetchSetting)
  
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
        about:success.data[0]
      },
    })
  }
  if (!success || !success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* TEAM() {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.fetchTeam)
  
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
        team:success.data
      },
    })
  }
  if (!success || !success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* SERVICES() {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.fetchService)
  
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
        services:success.data
      },
    })
  }
  if (!success || !success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* SEND_MESSAGE({payload}) {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      messageLoading: true,
    },
  })
  const success = yield call(jwt.sendMessage, payload)
  
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        messageLoading: false,
      },
    })
    notification.success({
      message: 'Message sent',
      description:success.message,
    });
  }
  if (!success || !success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        messageLoading: false,
      },
    })
  }
}


export default function* rootSaga() {
  yield all([
    takeEvery(actions.ABOUT, ABOUT),
    takeEvery(actions.SEND_MESSAGE, SEND_MESSAGE),
    takeEvery(actions.TEAM, TEAM),
    takeEvery(actions.SERVICES, SERVICES),
  ])
}
