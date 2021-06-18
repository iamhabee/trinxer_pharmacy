import { combineReducers } from 'redux';
// import setting from './setting/reducers';
import user from './user/reducers';
import auth from './auth/reducers';
import admin from './admin/reducers';
import blog from './blog/reducers';

export default combineReducers({
    auth,
    user,
    admin,
    blog,
});
