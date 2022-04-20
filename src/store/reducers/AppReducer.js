import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SAVE_INFO,
  SAVE_INFO_SUCCESS,
  SAVE_INFO_FAILURE,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_INFO,
  GET_INFO_SUCCESS,
  GET_INFO_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOADER_TRUE,
  LOADER_FALSE,
} from '../constants';

const initialState = {
  user: {},
  userInfo: {},
  loader: false,
  posts: [],
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SIGNIN_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        loader: false,
      };
      break;
    case SIGNIN_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SIGNUP:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SIGNUP_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SIGNUP_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case LOGOUT:
      state = {
        ...state,
        loader: true,
      };
      break;
    case LOGOUT_SUCCESS:
      state = {
        user: {},
        posts: [],
        loader: false,
      };
      break;
    case LOGOUT_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case ADD_POST:
      state = {
        ...state,
        loader: true,
      };
      break;

    case SAVE_INFO:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SAVE_INFO_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SAVE_INFO_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_POSTS:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_POSTS_SUCCESS:
      state = {
        ...state,
        posts: action.payload,
        loader: false,
      };
      break;
    case GET_POSTS_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case ADD_POST_SUCCESS:
      // state.posts.unshift(action.payload)
      state = {
        ...state,
        posts: [action.payload, ...state.posts],
        loader: false,
      };
      break;
    case ADD_POST_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case GET_INFO:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_INFO_SUCCESS:
      state = {
        ...state,
        userInfo: action.payload,
        loader: false,
      };
      break;
    case GET_INFO_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case LOADER_TRUE:
      state = {
        ...state,
        loader: true,
      };
      break;

    case LOADER_FALSE:
      state = {
        ...state,
        loader: false,
      };
      break;

    default:
      break;
  }

  return state;
}
