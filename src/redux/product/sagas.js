import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwt from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

export function* ALL_PRODUCTS({payload}) {
  yield put({
    type: 'product/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.allProducts, payload)
  if (success.status) {
    yield put({
      type: 'product/SET_STATE',
      payload: {
        products:success.data.rows,
        totalProduct:success.data.count,
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
      type: 'product/ALL_PRODUCTS',
      payload:{limit:20, offset:0}
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

export function* DELETE_PRODUCT({payload}) {
  yield put({
    type: 'product/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.deleteProduct, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'product/ALL_PRODUCTS',
      payload:{limit:20, offset:0}
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
      type: 'product/ALL_PRODUCTS',
      payload:{limit:20, offset:0}
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
    takeEvery(actions.DELETE_PRODUCT, DELETE_PRODUCT),
    takeEvery(actions.CREATE_PRODUCT, CREATE_PRODUCT),
  ])
}
