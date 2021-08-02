import actions from './actions'

const initialState = {
  loading: false,
  blogs:[],
  public_blogs:[],
  single_blog:{},
  recent_blogs:[],
  replyLoading:false,
  totalBlog:0
}

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
