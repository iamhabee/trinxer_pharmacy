import actions from './actions'

const initialState = {
  roles: [],
  loading: false,
}

export default function roleReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
