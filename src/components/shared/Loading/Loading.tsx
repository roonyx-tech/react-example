import React from 'react';
import cn from 'classnames';

import s from './styles.module.scss';

interface ILoading {
  size?: number;
  width?: number;
  strokeColor?: string;
  className?: string;
}

export const Loading: React.FC<ILoading> = ({ size, width, strokeColor, className }): JSX.Element => {
  const progress = 0.3;

  const viewBox = `0 0 ${size} ${size}`;
  const center = size ? size / 2 : 15;
  const radius = width ? center - width : center - 3;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * (1 - progress);

  return (
    <div className={cn(s.loadingContainer, className)}>
      <svg
        className={s.spinner}
        style={{ width: size, height: size }}
        width={size}
        height={size}
        viewBox={viewBox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={center} cy={center} r={radius} strokeWidth={width} fill="none" stroke="#ebeff2" />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={width}
          stroke={strokeColor}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          fill="none"
        />
      </svg>
    </div>
  );
};

Loading.defaultProps = {
  size: 60,
  width: 5,
  strokeColor: '#2196F3',
};
