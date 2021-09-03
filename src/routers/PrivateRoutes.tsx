import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { AppState } from '../redux/reducers/RootReducer';

const PrivateRoutes = ({ component: Component, ...rest }: any) => {
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        }

        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default PrivateRoutes;
