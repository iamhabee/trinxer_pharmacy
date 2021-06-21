import actions from './actions'

const initialState = {
  header: {},
  about: {},
  contact: {},
  loading: false,
}

export default function settingReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
