import React from 'react';

import { useLocation } from 'react-router-dom';
import { pages } from '../../../const';
import s from './styles.module.scss';

interface IBadge {
  titles: string[];
  children: React.ReactNode;
}

export const Badge: React.FC<IBadge> = ({ children, titles }: IBadge): JSX.Element => {
  const location = useLocation();

  return (
    <div className={s.wrapper} style={location.pathname === pages.projectCard ? { margin: '0 24px 24px 0' } : {}}>
      {React.Children.map(children, (child, idx) => {
        return (
          <div className={s.column}>
            <p className={s.title}>{titles[idx]}</p>
            <p className={s.metric}>{child}</p>
          </div>
        );
      })}
    </div>
  );
};
