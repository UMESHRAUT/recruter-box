import React from 'react';
import { Switch, Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import './styles/app.scss';
import Toaster from './components/toaster/Toaster';
import PrivateRoutes from './routers/PrivateRoutes';
import PublicRoutes from './routers/PublicRoutes';
import EmployeeLogin from './components/auth/EmployeeLogin';
import GoogleLoginProgress from './components/auth/GoogleLoginProgress';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <>
      <Toaster />
      <Switch>
        <PrivateRoutes path="/dashboard" component={Dashboard} />

        <PublicRoutes exact path="/login" component={EmployeeLogin} />

        <PublicRoutes path="/google-login" component={GoogleLoginProgress} />

        <Route render={() => <Redirect to='/dashboard' />} />
      </Switch>
    </>
  );
}


export default App;
