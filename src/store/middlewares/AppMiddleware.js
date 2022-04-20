import {AppAction} from '../actions';
import {Alert} from 'react-native';
import Store from '..';
import {NavigationService, ApiCaller, Constants} from '../../config';
import {put} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class AppMiddleware {
  static *SignIn({payload}) {
    const {email, password} = payload;
    const {replace} = NavigationService;
    try {
      let response = yield auth().signInWithEmailAndPassword(email, password);
      console.log(response);
      if (response.user) {
        yield put(AppAction.SignInSuccess(response.user));
        AsyncStorage.setItem('user', JSON.stringify(response.user));
        replace('Home');
      } else {
        yield put(AppAction.SignInFailure());
        Alert.alert('', 'Error: incorrect credentials');
        yield put(AppAction.SignInFailure());
      }
    } catch (e) {
      Alert.alert('hi', e.message);
      yield put(AppAction.SignInFailure());
    }
  }

  static *signUp({payload}) {
    const {goBack} = NavigationService;
    const {email, username, password} = payload;
    try {
      let response = yield auth().createUserWithEmailAndPassword(
        email,
        password,
        username,
      );
      if (response.user) {
        yield put(AppAction.SignUpSuccess());
        auth().signOut();
        Alert.alert('Account Created Successfully');
        console.log('response ?', response);
        goBack();
      } else {
        Alert.alert('', 'Some Error Occured');
        yield put(AppAction.SignUpFailure());
      }
    } catch (e) {
      console.error(e.code);
    }
  }
  static *Logout() {
    const {reset_0} = NavigationService;
    try {
      auth().signOut();
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
        console.log('%cGetPosts Response', 'color: green', ' => ', res);
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
  static *GetInfo() {
    try {
      const user = yield AsyncStorage.getItem('user');
      const uid = JSON.parse(user).uid;
      const docRef = yield firestore().collection('Users').doc(uid);
      const userData = yield docRef.get();
      console.log('saga', userData._data);
      yield put(AppAction.GetInfoSuccess(userData._data));
    } catch (e) {
      console.log('Not Inserted due to Error', e);
    }
  }
  static *SaveInfo({payload}) {
    const {name, email, address, phone, state, country, image} = payload;
    console.log(payload);
    try {
      const user = yield AsyncStorage.getItem('user');
      const uid = JSON.parse(user).uid;
      console.log(uid);
      const docRef = yield firestore().collection('Users').doc(uid);
      yield docRef.set({
        name: name,
        email: email,
        address: address,
        phoneno: phone,
        state: state,
        country: country,
        image: null,
      });
      yield put(AppAction.SaveInfoSuccess());
    } catch (e) {
      yield put(AppAction.SaveInfoSuccess());
      console.log('Not Inserted due to Error', e);
    }
  }
}
