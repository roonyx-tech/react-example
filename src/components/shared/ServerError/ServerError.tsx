import React from 'react';

import { NoPermission } from './NoPermission';

interface IServerError {
  status: number;
}

export const ServerError: React.FC<IServerError> = ({ status }): JSX.Element => {
  const messages: Record<number, string> = {
    500: 'Внутренняя ошибка сервера',
    400: 'Нет доступа в систему',
    401: 'Вы не авторизованы',
    403: 'Нет доступа в систему',
  };

  return <NoPermission message={messages[status] || messages[500]} />;
  // return (
  //   <div className={styles.serverErrorContainer}>
  //     <h1>{messages[status] || messages[500]}</h1>
  //   </div>
  // );
};
