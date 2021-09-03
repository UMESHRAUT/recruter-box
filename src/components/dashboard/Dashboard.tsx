import React from 'react';
import Sidebar from './sidebar/Sidebar';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router';
import TopBar from './top-bar/TopBar';
import PrivateRoutes from '../../routers/PrivateRoutes';
import Candidates from '../candidates/Candidates';
import OpenPositions from '../open-positions/OpenPositions';

function Dashboard() {
  const { path, url } = useRouteMatch();
  console.log(path);
  console.log(url);
  return (
    <div className="dashboard-container color-mode-light">
      <Sidebar />

      <div className="app-body">
        <TopBar />

        <div className="main-content-wrapper overflow-auto">
          <Switch>
            <PrivateRoutes
              path={`${path}/candidates`}
              component={Candidates}
            />

            <PrivateRoutes
              path={`${path}/open-positions`}
              component={OpenPositions}
            />

            <Route
              render={() => <Redirect to={`${path}/candidates`} />}
            />
          </Switch>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
