import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { AppState } from '../redux/reducers/RootReducer';

function PublicRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated, user } = useSelector(
    (state: AppState) => state.auth
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: JSON.parse(user).next,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

export default PublicRoute;
