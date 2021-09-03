import Cookie from 'js-cookie';
import {
  CHECK_AUTHORIZATION_FAIL,
  CHECK_AUTHORIZATION_REQUEST,
  CHECK_AUTHORIZATION_SUCCESS, HEVO_TOKEN_COOKIE_KEY,
  LOGOUT,
  USER_INFO_STORAGE_KEY,
} from '../constants/AuthConstants';

export enum AuthRole {
Admin='Admin',
  User='User'
};

interface AuthStateI {
  loading:boolean;
  token:any;
  isAdmin:boolean,
  isAuthenticated: boolean;
  user: any;
  loginError?:string
}

const key = localStorage.getItem('USER_INFO_STORAGE_KEY');

const DEFAULT_STATE :AuthStateI ={
  loading:false,
  token:'',
  isAdmin: key? JSON.parse(key).is_admin : false,
  isAuthenticated: !!Cookie.get(HEVO_TOKEN_COOKIE_KEY),
  loginError:'',
  user: localStorage.getItem(USER_INFO_STORAGE_KEY),
};
const AuthReducer = (
  state:AuthStateI = DEFAULT_STATE,
  action:any ): AuthStateI =>{
  switch (action.type) {
    case CHECK_AUTHORIZATION_REQUEST:
      return { ...state, loading: true };

    case CHECK_AUTHORIZATION_SUCCESS:
      Cookie.set(HEVO_TOKEN_COOKIE_KEY, action.payload.token);

      localStorage.setItem(
        USER_INFO_STORAGE_KEY,
        JSON.stringify(action.payload)
      );
      return {

        ...state,
        token: action.payload.token,
        user: localStorage.getItem(USER_INFO_STORAGE_KEY),
        isAuthenticated: !!Cookie.get(HEVO_TOKEN_COOKIE_KEY),
        loading: false,
        isAdmin:action.payload.is_admin
      };

    case CHECK_AUTHORIZATION_FAIL:
      return {
        ...state,
        loginError: action.payload,
        loading: false,
      };

    case LOGOUT:
      Cookie.remove(HEVO_TOKEN_COOKIE_KEY);
      localStorage.removeItem(USER_INFO_STORAGE_KEY);
      return { loading: false, token: '', isAdmin:false, isAuthenticated: false, user: '' };
    default:
      return state;
  }
};

export default AuthReducer;
