import { Dispatch } from 'redux';
import {
  LOGIN_FAIL,
  CHECK_AUTHORIZATION_REQUEST,
  CHECK_AUTHORIZATION_SUCCESS,
  CHECK_AUTHORIZATION_FAIL,
  LOGOUT,
} from '../constants/AuthConstants';
import { AppState } from '../reducers/RootReducer';

export interface UserDetailsI {
  restricted_token_type: string;
  next: string;
  email: string;
  name: string;
  user_id:any;
}

export const GoogleLogin = (state: string, code: string) => async (
  dispatch: Dispatch,
  getState: AppState
) => {
  dispatch({ type: CHECK_AUTHORIZATION_REQUEST });
  const googleLoginUrl = `/api/v1.0/auth/callback?code=${code}&state=${state}`;

  try {
    const googleLoginResponse = await fetch(googleLoginUrl);

    if (googleLoginResponse.status === 500) {
      throw new Error('Internal Server Error');
    }

    const responseBody = await googleLoginResponse.json();

    if (responseBody.success === false) {
      throw new Error(responseBody.error_message);
    }

    dispatch({ type: CHECK_AUTHORIZATION_SUCCESS, payload: responseBody.data });
  } catch (error) {
    dispatch({
      type: CHECK_AUTHORIZATION_FAIL,
      payload: error.message,
    });
  }
};

export const logOut = () => (dispatch: Dispatch) => {
  dispatch({ type: LOGOUT });
};

export const loginFail = (error: string) => (
  dispatch: any,
  getState: AppState
) => {
  dispatch({ type: LOGIN_FAIL });
};
