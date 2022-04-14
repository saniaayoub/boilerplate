import {AppAction} from '../actions';
import {Alert} from 'react-native';
import Store from '..';
import {NavigationService, ApiCaller, Constants} from '../../config';
import {put} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AppMiddleware {
  static *SignIn({payload}) {
    const {replace} = NavigationService;
    try {
      let res = yield AsyncStorage.getItem('TempUser');
      if (res) {
        const user = JSON.parse(res);
        const {email, pass} = user;
        if (payload?.email == email && pass == payload?.password) {
          yield put(AppAction.SignInSuccess(user));
          AsyncStorage.setItem('user', res);
          replace('Home');
          // console.log('%cSignIn Response', 'color: green', ' => ', res);
        } else {
          Alert.alert('', 'Error: incorrect credentials');
          yield put(AppAction.SignInFailure());
        }
      }
    } catch (err) {
      yield put(AppAction.SignInFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  static *Logout() {
    const {reset_0} = NavigationService;
    try {
      yield AsyncStorage.removeItem('user');
      yield put(AppAction.LogoutSuccess());
      reset_0('SignIn');
    } catch (err) {
      yield put(AppAction.LogoutFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  static *AddPost({payload}) {
    const {userId} = Store.getState().AppReducer?.user;
    payload['userId'] = userId;
    try {
      let res = yield ApiCaller.Post(Constants.ENDPOINTS.POST, payload);
      if (res.status == 201) {
        // console.log('%cAddPost Response', 'color: green', ' => ', res);
        res.data['id'] = new Date().getTime();
        yield put(AppAction.AddPostSuccess(res.data));
        NavigationService.goBack();
      } else {
        console.log('%cAddPost Response', 'color: red', ' => ', res);
        yield put(AppAction.AddPostFailure());
      }
    } catch (err) {
      yield put(AppAction.AddPostFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  static *GetPosts() {
    try {
      let res = yield ApiCaller.Get(Constants.ENDPOINTS.POST);
      // console.log(res);
      if (res.status == 200) {
        // console.log('%cGetPosts Response', 'color: green', ' => ', res);
        yield put(AppAction.GetPostsSuccess(res.data));
      } else {
        console.log('%cGetPosts Response', 'color: red', ' => ', res);
        yield put(AppAction.GetPostsFailure());
      }
    } catch (err) {
      yield put(AppAction.GetPostsFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
}
