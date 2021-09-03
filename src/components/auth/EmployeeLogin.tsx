import { parse } from 'query-string';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import google from '../../assets/images/google-icon.png';
import alfredLogo from '../../assets/images/brand-image.png';
import { AppState } from '../../redux/reducers/RootReducer';
import FormError from '../form-error/FormError';

function EmployeeLogin() {
  const history: any = useHistory();
  const urlSearchParams: any = parse(history.location.search);

  const cameFrom = history.location.state?.from?.pathname;
  const { next } = urlSearchParams;
  const { loginError } = useSelector((state: AppState) => state.auth);
  const loginErrorRedirectPath = '/login';
  const loginURL = `api/v1.0/auth/authenticate?error_path=${encodeURIComponent(
    loginErrorRedirectPath,
  )}&type=LOGIN&next=${next}`;

  useEffect(() => {
    if (cameFrom) {
      history.push({
        pathname: history.location.pathname,
        search: `next=${cameFrom}`,
      });
    }
  }, [history, cameFrom]);

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

        <a
          className="btn btn-secondary btn-lg btn-thumbnail-left"
          href={loginURL}
        >
          <img className="thumb" src={google} alt="Continue with Google" />
          Continue with Google
        </a>

        {loginError && <FormError className="mt-5">{loginError}</FormError>}
      </div>
    </div>
  );
}

export default EmployeeLogin;
