import React from 'react';

interface IChevron {
  down?: boolean;
}

// eslint-disable-next-line
const downSource = "M3.71446 0.581311L0.118095 4.17887C-0.039365 4.33673 -0.039365 4.59249 0.118095 4.75075C0.275555 4.90861 0.531311 4.90861 0.688771 4.75075L3.99978 1.43854L7.3108 4.75035C7.46826 4.90821 7.72401 4.90821 7.88187 4.75035C8.03933 4.59249 8.03933 4.33633 7.88187 4.17848L4.2855 0.580911C4.12967 0.425445 3.8699 0.425445 3.71446 0.581311Z";
// eslint-disable-next-line
const upSource = "M3.71446 0.581311L0.118095 4.17887C-0.039365 4.33673 -0.039365 4.59249 0.118095 4.75075C0.275555 4.90861 0.531311 4.90861 0.688771 4.75075L3.99978 1.43854L7.3108 4.75035C7.46826 4.90821 7.72401 4.90821 7.88187 4.75035C8.03933 4.59249 8.03933 4.33633 7.88187 4.17848L4.2855 0.580911C4.12967 0.425445 3.8699 0.425445 3.71446 0.581311Z";

export const Chevron: React.FC<IChevron> = ({ down = false }: IChevron) => (
  <div style={{ width: '12px', height: '8px', position: 'relative' }}>
    <svg width="12" height="8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute' }}>
      <path d={down ? downSource : upSource} fill="#B4BBC6" />
    </svg>
  </div>
);
