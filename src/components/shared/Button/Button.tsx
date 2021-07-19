import React, { CSSProperties, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { IIconProps } from '../../../interfaces';

import styles from './Button.module.scss';

type ButtonType = 'primary' | 'outline';
type ButtonSize = 'big' | 'small';

export type ButtonProps = PropsWithChildren<{
  className?: string;
  type?: ButtonType;
  size?: ButtonSize;
  isDisable?: boolean;
  Icon?: React.FC<IIconProps>;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
}>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref: any) => {
  const {
    children,
    className,
    type = 'primary',
    size = 'big',
    isDisable = false,
    Icon,
    style,
    onClick = () => undefined,
  } = props;

  const isActive = (key: ButtonType) => type === key;
  const isSmall = (key: ButtonSize) => size === key;

  const buttonStyle = classNames(
    // FIX: .appButton style already exists inside _general.scss so I had to come up with a different name
    styles.buttonElement,
    {
      [styles.buttonElement_big]: isSmall('big'),
      [styles.buttonElement_small]: isSmall('small'),
      [styles.buttonElement_primary]: isActive('primary'),
      [styles.buttonElement_outline]: isActive('outline'),
    },
    className
  );

  return (
    <button disabled={isDisable} onClick={onClick} className={buttonStyle} ref={ref} style={style}>
      {Icon && <Icon className={styles.buttonIcon} />}
      {children}
    </button>
  );
});
