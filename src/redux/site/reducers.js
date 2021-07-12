import actions from './actions'

const initialState = {
  about: {},
  contact: {},
  team: [],
  services: [],
  offices: [],
  distributors: [],
  loading: false,
  messageLoading:false,
  title:"About Us",
  products:[],
  categoriesProduct:[],
  categoryName:"",
  categoryDescription:"",
  categories:[]
}

export default function siteReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
