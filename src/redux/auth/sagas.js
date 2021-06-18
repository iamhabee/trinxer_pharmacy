import { all, takeEvery, put, call } from 'redux-saga/effects'
import { message } from 'antd'
import { history } from 'index'
import * as jwts from 'services/jwt'
import actions from './actions'
import { toast } from 'react-toastify';

const jwt = {
    login: jwts.login,
    logout: jwts.logout,
    // register: jwts.register,
    // forgotPassword: jwts.forgotPassword,
    // resetPassword: jwts.resetPassword,
    // bestSellers: jwts.bestSellers,
}

export function* LOGIN({ payload }) {
  const { email, password } = payload
  yield put({
    type: 'auth/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.login, email, password)
  
  if (success && success.status) {
    yield history.push('/admin')
    toast(success.message)
  }
  if (!success || !success.status) {
    yield put({
      type: 'auth/SET_STATE',
      payload: {
        loading: false,
      },
    })
    toast(success.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
    console.log(success)
  }
}

export function* LOGOUT() {
  const success = yield call(jwt.logout)
  message.success({
    content: "Good Bye Admin",
    duration: 5,
    style: {
      marginTop: '50vh',
    },
  })
}


export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.LOGOUT, LOGOUT),
    // takeEvery(actions.REGISTER, REGISTER),
    // takeEvery(actions.FORGOT_PASSWORD, FORGOT_PASSWORD),
    // takeEvery(actions.RESET_PASSWORD, RESET_PASSWORD)
  ])
}
