import { all } from 'redux-saga/effects';
import Auth from './auth/sagas';
import User from './user/sagas';
import Admin from './admin/sagas';
import Blog from './blog/sagas';
import Role from './role/sagas';
import Service from './services/sagas';
import Message from './message/sagas';
import Setting from './setting/sagas';
import Site from './site/sagas';
import Category from './category/sagas';
import Product from './product/sagas';

export default function* rootSaga() {
    yield all([
        Auth(),
        User(),
        Admin(),
        Blog(),
        Role(),
        Service(),
        Message(),
        Setting(),
        Site(),
        Category(),
        Product()
    ]);
}
