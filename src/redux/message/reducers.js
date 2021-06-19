import actions from './actions'

const initialState = {
  messages: [],
  loading: false,
}

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
