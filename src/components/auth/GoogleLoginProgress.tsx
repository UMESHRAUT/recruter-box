import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import alfredLogo from '../../assets/images/hevo-alfred-black.svg';
import { GoogleLogin } from '../../redux/actions/Authorization';
import { AppState } from '../../redux/reducers/RootReducer';
import Loader from '../loader/Loader';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function GoogleLoginProgress() {
  const query = useQuery();
  const { loginError } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();

  const code: string = query.get('code') || '';
  const loginState: string = query.get('state') || '';

  useEffect(() => {
    dispatch(GoogleLogin(loginState, code));
  }, [loginState, code, dispatch]);

  if (loginError) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img
          className="hevo-logo"
          src={alfredLogo}
          alt="Hevo Alfred logo"
        />

        <h1 className="auth-card-title">
          Login to your Account
          <div className="text-body-1 text-primary mt-4">
            Please login with Hevo account.
          </div>
        </h1>

        <Loader msg="Checking Authorization" />
      </div>
    </div>
  );
}

export default GoogleLoginProgress;
