import React, { useEffect, useRef } from 'react';

import { Switch } from '../htmlElements/Switch';
import s from './styles.module.scss';

interface IOptionsSwitch {
  isRight: boolean;
  onChange: (state: boolean) => void;
  leftOption?: JSX.Element;
  rightOption?: JSX.Element;
  disabled?: boolean;
}

const colors = Object.freeze({
  blue: '#2196F3',
  gray: '#B4BBC6',
});

export const OptionsSwitch: React.FC<IOptionsSwitch> = (props: IOptionsSwitch): JSX.Element => {
  const { isRight, onChange, leftOption, rightOption, disabled } = props;
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftNode = left.current as any;
    const svgLeft = leftNode.getElementsByTagName('svg')[0];
    if (svgLeft) {
      svgLeft.style.fill = isRight ? colors.gray : colors.blue;
    }
    const rightNode = right.current as any;
    const svgRight = rightNode.getElementsByTagName('svg')[0];
    if (svgRight) {
      svgRight.style.fill = isRight ? colors.blue : colors.gray;
    }
  }, [isRight]);

  return (
    <div className={s.wrapper}>
      <div ref={left} style={{ color: isRight ? colors.gray : colors.blue }}>
        {leftOption}
      </div>
      <div className={s.switch}>
        <Switch checked={isRight} disabled={disabled} onChange={onChange} />
      </div>
      <div ref={right} style={{ color: isRight ? colors.blue : colors.gray }}>
        {rightOption}
      </div>
    </div>
  );
};
