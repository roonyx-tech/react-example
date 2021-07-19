import classNames from 'classnames';
import React, { CSSProperties } from 'react';

import s from './styles.module.scss';

interface ITooltip {
  show: boolean;
  blockStyles: CSSProperties;
  children: React.ReactNode;
  withArrow?: boolean;
}

export const Tooltip: React.FC<ITooltip> = ({ show, children, blockStyles, withArrow }: ITooltip) => {
  const className = classNames(s.wrapper, { [s.withArrow]: withArrow });

  return (
    <div style={{ display: `${show ? 'block' : 'none'}`, ...blockStyles }} className={className}>
      {children}
    </div>
  );
};

Tooltip.defaultProps = {
  withArrow: false,
};
