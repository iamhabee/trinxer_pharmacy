import { all } from 'redux-saga/effects';
import Auth from './auth/sagas';
import User from './user/sagas';
import Admin from './admin/sagas';
import Blog from './blog/sagas';

export default function* rootSaga() {
    yield all([
        Auth(),
        User(),
        Admin(),
        Blog()
    ]);
}
