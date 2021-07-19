import React from 'react';

import s from './styles.module.scss';

interface ISwitch {
  checked: boolean;
  onChange: (state: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<ISwitch> = ({ checked, onChange, disabled }: ISwitch): JSX.Element => (
  <label className={s.switch}>
    <input type="checkbox" checked={checked} onChange={() => onChange(!checked)} disabled={disabled} />
    <span className={`${s.slider} ${disabled && s.disabled}`} />
  </label>
);
