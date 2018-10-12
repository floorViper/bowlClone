import { createAction, handleActions } from 'redux-actions';

import { pender } from 'redux-pender';
import * as api from 'api/auth';
const namespaces = 'auth';

const CHANGE_INPUT = `${namespaces}/CHANGE_INPUT`;
const LOCAL_LOGIN = `${namespaces}/LOCAL_LOGIN`;
const LOCAL_LOGOUT = `${namespaces}/LOCAL_LOGOUT`;
const CHECK_LOGIN = `${namespaces}/CHECK_LOGIN`;
const TEMP_LOGIN = `${namespaces}/TEMP_LOGIN`;
const USER_PERMISSION_LIST = `${namespaces}/USER_PERMISSION_LIST`;
const USER_PERMISSION_REQ = `${namespaces}/USER_PERMISSION_REQ`;

export const changeInput = createAction(CHANGE_INPUT);
export const localLogin = createAction(LOCAL_LOGIN, api.localLogin); // ({email, password})
export const localLogout = createAction(LOCAL_LOGOUT, api.localLogout);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const tempLogin = createAction(TEMP_LOGIN);
export const userPermissionList = createAction(
  USER_PERMISSION_LIST,
  api.userPermissionList
);

export const userPermissionReq = createAction(
  USER_PERMISSION_REQ,
  api.userPermissionReq
);

//initailState
const initialState = {
  userName: '',
  passWord: '',
  error: null,
  loginResult: {
    id: '',
    authorized: false
  },
  userPermissionList: []
};

export default handleActions(
  {
    //[INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    },
    [TEMP_LOGIN]: (state, action) => {
      return {
        ...state,
        loginResult: { ...state.loginResult, authorized: true }
      };
    },
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state, action) => {
        const loginResult = action.payload.data.user;

        return { ...state, loginResult };
      },
      onFailure: (state, action) => {
        return { ...state, error: { ...action.payload.response } };
      }
    }),
    ...pender({
      type: LOCAL_LOGOUT,
      onSuccess: (state, action) => {
        console.log('auth:', action.payload);

        return {
          ...state,
          loginResult: { id: '', authorized: false }
        };
      },
      onFailure: (state, action) => {
        return { ...state, error: [...action.payload] };
      }
    }),
    ...pender({
      type: CHECK_LOGIN,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        return {
          ...state,
          loginResult: data
        };
      },
      onFailure: (state, action) => {
        return { ...state, error: [...action.payload] };
      }
    }),
    ...pender({
      type: USER_PERMISSION_LIST,
      onSuccess: (state, action) => {
        console.log('why::::', action);
        return {
          ...state,
          userPermissionList: action.payload.data.result
        };
      },
      onFailure: (state, action) => {
        return { ...state, error: [...action.payload] };
      }
    }),
    ...pender({
      type: USER_PERMISSION_REQ,
      onSuccess: (state, action) => {
        console.log('req::::', action);
        return {
          ...state
          //userPermissionList: action.payload.data.result
        };
      },
      onFailure: (state, action) => {
        return { ...state, error: [...action.payload] };
      }
    })
  },

  initialState
);
