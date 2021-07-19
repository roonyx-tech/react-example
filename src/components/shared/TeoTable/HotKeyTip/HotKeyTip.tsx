import React from 'react';
import cn from 'classnames';

import s from './index.module.scss';

export const HotKeyTip: React.FC = (): JSX.Element => (
  <div className={s.infoWrapper}>
    <div className={s.info}>
      <p>
        Для копирования значения из текущей ячейки в соседнюю используйте комбинацию с клавишей Ctrl, например:
        <span className={cn(s.key, s.ctrl)}>Ctrl</span> + <span className={s.key}>&rarr;</span>
        <span>&nbsp;(Windows)</span>
        <br />
        <br />
        <span className={cn(s.key, s.ctrl)}>Control</span> + <span className={cn(s.key, s.ctrl)}>Shift</span> +{' '}
        <span className={s.key}>&rarr;</span>
        <span>&nbsp;(MacOS)</span>
      </p>
      <p>
        Для перемещения по ячейкам используйте: <span className={s.key}>&rarr;</span>{' '}
        <span className={s.key}>&larr;</span> <span className={s.key}>&darr;</span>{' '}
        <span className={s.key}>&uarr;</span> <span className={s.key}>&crarr;</span>{' '}
      </p>
    </div>
  </div>
);
