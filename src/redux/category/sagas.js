import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    allCategories: jwts.allCategories,
    updateCategory: jwts.updateCategory,
    createCategory: jwts.createCategory,
    allParentCategories: jwts.allParentCategories,
}

export function* PARENT_CATEGORIES() {
  yield put({
    type: 'category/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.allParentCategories)
  if (success.status) {
    yield put({
      type: 'category/SET_STATE',
      payload: {
        parentCategories:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'category/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* ALL_CATEGORIES() {
  yield put({
    type: 'category/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.allCategories)
  if (success.status) {
    yield put({
      type: 'category/SET_STATE',
      payload: {
        categories:success.data,
        loading: false,
      },
    })

  }
  if (!success.status) {
    yield put({
      type: 'category/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_CATEGORY({payload}) {
  yield put({
    type: 'category/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateCategory, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'category/ALL_CATEGORIES'
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
      type: 'category/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* CREATE_CATEGORY({payload}) {
  yield put({
    type: 'category/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.createCategory, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'category/ALL_CATEGORIES'
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
      type: 'category/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.PARENT_CATEGORIES, PARENT_CATEGORIES),
    takeEvery(actions.ALL_CATEGORIES, ALL_CATEGORIES),
    takeEvery(actions.UPDATE_CATEGORY, UPDATE_CATEGORY),
    takeEvery(actions.CREATE_CATEGORY, CREATE_CATEGORY),
  ])
}
