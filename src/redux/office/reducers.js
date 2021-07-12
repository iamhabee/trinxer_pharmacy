import actions from './actions'

const initialState = {
  offices: [],
  loading: false,
}

export default function officeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
