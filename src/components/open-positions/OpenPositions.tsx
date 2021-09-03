import React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router';

import PrivateRoutes from '../../routers/PrivateRoutes';
import AddNewRole from './AddNewRole';
import AllPositions from './AllPositions';

function OpenPositions() {
  const { url } = useRouteMatch();
  return (
    <div>
      <Switch>

        <PrivateRoutes path={`${url}/add-new-position`}
                       component={AddNewRole} />
        <PrivateRoutes path={`${url}/add-new-role`}
                       component={AddNewRole} />
        <PrivateRoutes path={`${url}/:team`}
                       component={AllPositions} />

        <Route
          render={() => <Redirect to={`${url}/all-teams`} />}
        />
      </Switch>
    </div>
  );
}

export default OpenPositions;
