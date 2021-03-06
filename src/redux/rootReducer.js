import { combineReducers } from 'redux';
// import setting from './setting/reducers';
import user from './user/reducers';
import auth from './auth/reducers';
import admin from './admin/reducers';
import blog from './blog/reducers';
import role from './role/reducers';
import service from './services/reducers';
import message from './message/reducers';
import setting from './setting/reducers';
import site from './site/reducers';
import category from './category/reducers';
import product from './product/reducers';
import office from './office/reducers';
import distributor from './distributor/reducers';

export default combineReducers({
    auth,
    user,
    admin,
    blog,
    role,
    service,
    message,
    setting,
    site,
    category,
    product,
    office,
    distributor
});
