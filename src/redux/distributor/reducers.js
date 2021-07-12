import actions from './actions'

const initialState = {
  distributors: [],
  loading: false,
}

export default function distributorReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
