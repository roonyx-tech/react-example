import React from 'react';
import { useQuery, ApolloError } from '@apollo/client';

import { accountQuery } from '../../../qraphql/queries';
import { Permission, IDirectorateInfo, IDomainInfo, IPortfolioInfo } from '../../../interfaces';
import * as Sentry from '@sentry/browser';

export type Account = {
  id: number;
  displayName: string;
  firstName: string;
  lastName: string;
  login: string;
  permissions: Permission[];
  roles: string[];
  directorates?: IDirectorateInfo[];
  domains?: IDomainInfo[];
  portfolios?: IPortfolioInfo[];
  opexActivitiesAmount: number;
  opexDepartment: { id: number; name: string };
};

interface IAuthContext {
  loading: boolean;
  error: ApolloError | undefined;
  account: Account | null;
}

export const AuthContext: React.Context<IAuthContext> = React.createContext({
  loading: false,
  error: undefined,
  account: null,
} as IAuthContext);

export const Auth: React.FC = ({ children }) => {
  const { loading, error, data } = useQuery(accountQuery);
  const account = data?.account;

  if (!loading && account && process.env.REACT_APP_SENTRY_DSN && process.env.NODE_ENV === 'production') {
    Sentry.configureScope(function (scope) {
      scope.setUser({ id: account.id, username: account.login, email: account.email });
    });
  }

  return <AuthContext.Provider value={{ loading, error, account }}>{children}</AuthContext.Provider>;
};
