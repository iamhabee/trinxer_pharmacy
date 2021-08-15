import { all, takeEvery, put, call } from 'redux-saga/effects'
import * as jwt from 'services/jwt/siteApi'
import actions from './actions'
import {notification} from 'antd'

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

export function* PRODUCTS({payload}) {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.fetchProducts, payload)
  
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
        products:success.data.rows,
        totalProducts:success.data.count
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

export function* SINGLE_PRODUCT({payload}) {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.fetchSingleProduct, payload)
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
        singleProduct:success.data
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

export function* CATEGORIES_PRODUCT({payload}) {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      loading: true,
      categoriesProduct:[],
      categoryName:"",
      categoryDescription:""
    },
  })
  const success = yield call(jwt.fetchCatProduct, payload)
  
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
        categoriesProduct:success.data && success.data.Products,
        categoryName:success.data.name,
        categoryDescription:success.data.description
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

export function* CATEGORIES() {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.fetchCategories)
  
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
        categories:success.data
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

export function* OFFICES() {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.fetchOffices)
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
        offices:success.data
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

export function* DISTRIBUTORS() {
  yield put({
    type: 'site/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(jwt.fetchDistributor)
  
  if (success && success.status) {
    yield put({
      type: 'site/SET_STATE',
      payload: {
        loading: false,
        distributors:success.data
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
    takeEvery(actions.PRODUCTS, PRODUCTS),
    takeEvery(actions.SINGLE_PRODUCT, SINGLE_PRODUCT),
    takeEvery(actions.OFFICES, OFFICES),
    takeEvery(actions.DISTRIBUTORS, DISTRIBUTORS),
    takeEvery(actions.CATEGORIES_PRODUCT, CATEGORIES_PRODUCT),
    takeEvery(actions.CATEGORIES, CATEGORIES),
  ])
}
