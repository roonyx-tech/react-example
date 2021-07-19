import React from 'react';
import { Switch, Redirect, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as Sentry from '@sentry/react';

import { NewTeoEditor } from './pages/teoEditor';
import { Home } from './pages/about';
import { pages } from '../const';
import { PrivateRoute } from './shared/PrivateRoute';
import { Auth } from './shared/AuthContext';

const App: React.FC = (): JSX.Element => {
  return (
    <Sentry.ErrorBoundary fallback="Произошла непредвиденная ошибка">
      <>
        <Auth>
          <Switch>
            <PrivateRoute exact path={pages.home} component={Home} />
            <PrivateRoute path={pages.teoEditor} component={NewTeoEditor} />
            <PrivateRoute path={pages.teoCreator} component={NewTeoEditor} />
            <Redirect to={pages.home} />
          </Switch>
        </Auth>

        <ToastContainer />
      </>
    </Sentry.ErrorBoundary>
  );
};

export default withRouter(App);
