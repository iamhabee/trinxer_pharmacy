import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    allBlogs: jwts.allBlogs,
    createBlog: jwts.createBlog,
    updateBlog: jwts.updateBlog,
    publishBlog: jwts.publishBlog,
}

export function* ALL_BLOGS() {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
    },
  })
   const success = yield call(jwt.allBlogs)
  if (success.status) {
    yield put({
      type: 'blog/SET_STATE',
      payload: {
        blogs:success.data,
        loading: false,
      },
    })
  }
  if (!success.status) {
    yield put({
      type: 'blog/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }  
}

export function* CREATE_BLOG({payload}) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.createBlog, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'blog/ALL_BLOGS'
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
      type: 'blog/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* UPDATE_BLOG({payload}) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateBlog, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'blog/ALL_BLOGS'
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
      type: 'blog/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* PUBLISH_BLOG({payload}) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.publishBlog, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'blog/ALL_BLOGS'
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
      type: 'blog/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.ALL_BLOGS, ALL_BLOGS),
    takeEvery(actions.CREATE_BLOG, CREATE_BLOG),
    takeEvery(actions.UPDATE_BLOG, UPDATE_BLOG),
    takeEvery(actions.PUBLISH_BLOG, PUBLISH_BLOG),
  ])
}
