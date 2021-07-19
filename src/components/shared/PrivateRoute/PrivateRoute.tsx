import React, { useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { ServerError } from '@apollo/client';

import { ServerError as ServerErrorComponent } from '../ServerError';
import { AuthContext } from '../AuthContext';
import { Loading } from '../Loading';
import { Permission } from '../../../interfaces';
import { pages } from '../../../const';
import keycloak from '../../../services/keycloak';

interface IPrivateRoute extends RouteProps {
  permissions?: Permission[];
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ component, permissions, ...rest }): JSX.Element => {
  const { error, loading, account } = useContext(AuthContext);

  const render = (props: RouteProps): JSX.Element => {
    if (error) {
      const statusCode = (error.networkError as ServerError).statusCode;

      if (statusCode === 303 || error.message.toLowerCase().includes('failed to fetch')) {
        keycloak.goToLogin();
        return <Loading />;
      }

      return <ServerErrorComponent status={(error.networkError as ServerError).statusCode} />;
    }

    if (loading) {
      return <Loading />;
    }

    if (!component) {
      return <></>;
    }

    if (permissions?.length && !account?.permissions.some((permission) => permissions.includes(permission))) {
      const redirectPage = account?.permissions?.some((permission) => permission === Permission.dashboard)
        ? pages.dashboard
        : pages.myProjects;
      return <Redirect to={redirectPage} />;
    }

    return React.createElement(component as React.FC, props as React.Attributes);
  };

  return <Route {...rest} render={render} />;
};
