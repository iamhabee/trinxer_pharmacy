import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    currentUser: jwts.currentUser,
    getStats: jwts.getStats,
    updateProfile: jwts.updateProfile
}

export function* CURRENT_USER() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  let user = localStorage.getItem("admin_profile")
  if(!user){
   const success = yield call(jwt.currentUser)
    if (success.status) {
      yield put({
        type: 'user/SET_STATE',
        payload: {
          profile:success.data,
          loading: false,
        },
      })
      localStorage.setItem("admin_profile", JSON.stringify(success.data))
    }
    if (!success.status) {
      yield put({
        type: 'user/SET_STATE',
        payload: {
          loading: false,
        },
      })
    }
  }else{
    yield put({
      type: 'user/SET_STATE',
      payload: {
        profile:JSON.parse(user),
        loading: false,
      },
    })
  }
}

export function* GET_STATS() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.getStats)
  if (success.status) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        stats:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_PROFILE({payload}) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateProfile, payload)
  if (success.status) {
    localStorage.setItem("admin_profile", JSON.stringify(success.data))
    yield reduxStore.dispatch({
      type: 'user/CURRENT_USER'
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
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CURRENT_USER, CURRENT_USER),
    takeEvery(actions.UPDATE_PROFILE, UPDATE_PROFILE),
    takeEvery(actions.GET_STATS, GET_STATS),
  ])
}
