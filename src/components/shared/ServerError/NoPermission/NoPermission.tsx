import React, { useContext } from 'react';

import { AuthContext } from '../../AuthContext';
import keycloak from '../../../../services/keycloak';
import s from './styles.module.scss';

interface INoPermission {
  message: string;
}

export const NoPermission: React.FC<INoPermission> = ({ message }: INoPermission): JSX.Element => {
  const { account } = useContext(AuthContext);

  const goToLogin = () => {
    if (account?.id) {
      keycloak.logout();
    } else {
      keycloak.goToLogin();
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.formWrapper}>
        <img src="/img/forbidden.svg" />
        <h2>{message}</h2>
        <div className={s.backLink}>
          <img src="/img/back.svg" alt="arrow back" />
          <span onClick={goToLogin}>Вернуться к логину</span>
        </div>
      </div>
      <div className={s.imgWrapper}>
        <img src="/img/no-permission-logo.svg" alt="X5 Fin Portal" />
        <img className={s.picture} src="/img/no-permission-image.svg" alt="X5" />
      </div>
    </div>
  );
};
