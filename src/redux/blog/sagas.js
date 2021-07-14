import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import * as sites from 'services/jwt/siteApi'
import { message } from 'antd'
import {notification} from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    allBlogs: jwts.allBlogs,
    createBlog: jwts.createBlog,
    updateBlog: jwts.updateBlog,
    publishBlog: jwts.publishBlog,
    deleteBlog: jwts.deleteBlog,
    publicBlogs: sites.publicBlogs,
    fetchSingleBlog: sites.fetchSingleBlog,
    fetchPopularBlog: sites.fetchPopularBlog,
    increaseBlogView: sites.increaseBlogView,
    sendReply: sites.sendReply
}

export function* PUBLIC_BLOGS({payload}) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { public_blogs: publicBlogs } = yield select(state => state.blog)
   const success = yield call(jwt.publicBlogs, payload)
  if (success.status) {
    const more = publicBlogs.concat(success.data)
    yield put({
      type: 'blog/SET_STATE',
      payload: {
        public_blogs:more,
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

export function* PUBLIC_SINGLE_BLOG({payload}) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
      single_blog:{}
    },
  })
   const success = yield call(jwt.fetchSingleBlog, payload)
  if (success.status) {
    yield put({
      type: 'blog/SET_STATE',
      payload: {
        single_blog:success.data,
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

export function* RECENT_BLOGS() {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
      single_blog:{}
    },
  })
   const success = yield call(jwt.fetchPopularBlog)
  if (success.status) {
    yield put({
      type: 'blog/SET_STATE',
      payload: {
        recent_blogs:success.data,
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

export function* REPLY_BLOG({payload}) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      replyLoading: true,
    },
  })
  const success = yield call(jwt.sendReply, payload)
  
  if (success && success.status) {
    yield reduxStore.dispatch({
      type: 'blog/PUBLIC_SINGLE_BLOG',
      payload:payload.commentId
    })
    notification.success({
      message: 'Reply sent',
      description:success.message,
    });
  }
  if (!success || !success.status) {
    yield put({
      type: 'blog/SET_STATE',
      payload: {
        replyLoading: false,
      },
    })
    notification.warning({
      message: 'Reply failed',
      description:success.message,
    });
  }
}

export function* VIEW_BLOG({payload}) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.increaseBlogView, payload)
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: false,
    },
  })
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

export function* DELETE_BLOG({payload}) {
  yield put({
    type: 'blog/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.deleteBlog, payload)
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
    takeEvery(actions.PUBLIC_SINGLE_BLOG, PUBLIC_SINGLE_BLOG),
    takeEvery(actions.REPLY_BLOG, REPLY_BLOG),
    takeEvery(actions.VIEW_BLOG, VIEW_BLOG),
    takeEvery(actions.RECENT_BLOGS, RECENT_BLOGS),
    takeEvery(actions.PUBLIC_BLOGS, PUBLIC_BLOGS),
    takeEvery(actions.CREATE_BLOG, CREATE_BLOG),
    takeEvery(actions.UPDATE_BLOG, UPDATE_BLOG),
    takeEvery(actions.PUBLISH_BLOG, PUBLISH_BLOG),
    takeEvery(actions.DELETE_BLOG, DELETE_BLOG),
  ])
}
