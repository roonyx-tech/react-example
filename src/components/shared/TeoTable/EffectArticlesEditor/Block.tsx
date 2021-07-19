import React from 'react';

import s from './index.module.scss';

interface IBlockProps {
  isOpen: boolean;
  title: string;
  type: string;
  children?: React.ReactNode;
  onOpen(): void;
}

export const Block: React.FC<IBlockProps> = ({ isOpen, title, type, children, onOpen }): JSX.Element => {
  return (
    <div className={s.block} key={type}>
      <div className={s.blockTitle} onClick={onOpen}>
        <img src={isOpen ? '/img/chevron-up.svg' : '/img/chevron-down.svg'} alt="open/close" />
        <h3>{title}</h3>
      </div>
      <div className={s.article}>{isOpen && children}</div>
    </div>
  );
};
