import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwts from 'services/jwt'
import { message } from 'antd'
import { store as reduxStore  } from 'index'
import actions from './actions'

const jwt = {
    getHeader: jwts.getHeader,
    getContact: jwts.getContact,
    getAbout: jwts.getAbout,
    getWhoWeAre: jwts.getWhoWeAre,
    getLabelling: jwts.getLabelling,
    getResponsibility: jwts.getResponsibility,
    updateAbout: jwts.updateAbout,
    updateContact: jwts.updateContact,
    updateHeader: jwts.updateHeader,
    updateWhoWeAre: jwts.updateWhoWeAre,
    updateResponsibility: jwts.updateResponsibility,
    updateLabelling: jwts.updateLabelling,
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

export function* GET_WHO_WE_ARE() {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.getWhoWeAre)
  if (success.status) {
    yield put({
      type: 'setting/SET_STATE',
      payload: {
        whoWeAre:success.data[0],
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

export function* GET_LABELLING() {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.getLabelling)
  if (success.status) {
    yield put({
      type: 'setting/SET_STATE',
      payload: {
        privateLabelling:success.data[0],
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

export function* GET_RESPONSIBILITY() {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.getResponsibility)
  if (success.status) {
    yield put({
      type: 'setting/SET_STATE',
      payload: {
        socialResponsibility:success.data[0],
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

export function* UPDATE_WHO_WE_ARE({payload}) {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateWhoWeAre, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'setting/GET_WHO_WE_ARE'
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

export function* UPDATE_LABELLING({payload}) {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateLabelling, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'setting/GET_LABELLING'
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

export function* UPDATE_RESPONSIBILITY({payload}) {
  yield put({
    type: 'setting/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.updateResponsibility, payload)
  if (success.status) {
    yield reduxStore.dispatch({
      type: 'setting/GET_RESPONSIBILITY'
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
    takeEvery(actions.GET_WHO_WE_ARE, GET_WHO_WE_ARE),
    takeEvery(actions.GET_LABELLING, GET_LABELLING),
    takeEvery(actions.GET_RESPONSIBILITY, GET_RESPONSIBILITY),
    takeEvery(actions.UPDATE_ABOUT, UPDATE_ABOUT),
    takeEvery(actions.UPDATE_CONTACT, UPDATE_CONTACT),
    takeEvery(actions.UPDATE_HEADER, UPDATE_HEADER),
    takeEvery(actions.UPDATE_WHO_WE_ARE, UPDATE_WHO_WE_ARE),
    takeEvery(actions.UPDATE_LABELLING, UPDATE_LABELLING),
    takeEvery(actions.UPDATE_RESPONSIBILITY, UPDATE_RESPONSIBILITY),
  ])
}
