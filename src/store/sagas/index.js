import {AppMiddleware} from '../middlewares';
import {takeLatest, all} from 'redux-saga/effects';
import {
  ADD_POST,
  GET_POSTS,
  LOGOUT,
  SIGNUP,
  SIGNIN,
  SAVE_INFO,
} from '../constants';

export function* Sagas() {
  yield all([
    yield takeLatest(SIGNIN, AppMiddleware.SignIn),
    yield takeLatest(SIGNUP, AppMiddleware.signUp),
    yield takeLatest(ADD_POST, AppMiddleware.AddPost),
    yield takeLatest(GET_POSTS, AppMiddleware.GetPosts),
    yield takeLatest(LOGOUT, AppMiddleware.Logout),
    yield takeLatest(SAVE_INFO, AppMiddleware.SaveInfo),
  ]);
}
