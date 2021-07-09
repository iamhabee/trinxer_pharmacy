import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    allProducts: jwts.allProducts,
    updateProduct: jwts.updateProduct,
    createProduct: jwts.createProduct,
}

export function* ALL_PRODUCTS() {
  yield put({
    type: 'product/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.allProducts)
  if (success.status) {
    yield put({
      type: 'product/SET_STATE',
      payload: {
        products:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'product/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_PRODUCT({payload}) {
  yield put({
    type: 'product/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateProduct, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'product/ALL_PRODUCTS'
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
      type: 'product/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CREATE_PRODUCT({payload}) {
  yield put({
    type: 'product/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.createProduct, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'product/ALL_PRODUCTS'
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
      type: 'product/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ALL_PRODUCTS, ALL_PRODUCTS),
    takeEvery(actions.UPDATE_PRODUCT, UPDATE_PRODUCT),
    takeEvery(actions.CREATE_PRODUCT, CREATE_PRODUCT),
  ])
}
