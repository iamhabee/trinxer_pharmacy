import actions from './actions'

const initialState = {
  categories: [],
  parentCategories:[],
  loading: false,
}

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
