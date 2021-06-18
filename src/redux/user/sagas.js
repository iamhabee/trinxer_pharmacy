import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { history } from 'index'
import actions from './actions'

const jwt = {
    currentUser: jwts.currentUser,
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

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CURRENT_USER, CURRENT_USER),
  ])
}
