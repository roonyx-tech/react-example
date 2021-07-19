import React, { useRef, useEffect, FC } from 'react';

import s from './index.module.scss';

interface IProposalHint {
  text: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export const ProposalHint: FC<IProposalHint> = ({ text, onApprove, onReject }) => {
  const hintEl = useRef<HTMLDivElement | null>(null);

  const escFunc = (e: KeyboardEvent) => e.keyCode === 27 && onReject && onReject();

  useEffect(() => {
    document.addEventListener('click', handleClickOutSideHint);
    document.addEventListener('keydown', escFunc, false);
    return () => {
      document.removeEventListener('click', handleClickOutSideHint);
      document.removeEventListener('keydown', escFunc, false);
    };
  }, []);

  const handleClickOutSideHint = (e: MouseEvent) => {
    if (hintEl.current && e.target) {
      if (!hintEl.current.contains(e.target as HTMLElement)) {
        onReject && onReject();
      }
    }
  };

  return (
    <div className={s.popup} ref={hintEl}>
      <p>{text}</p>
      <div className={s.btns}>
        <button className="appButton appButtonXSmall appButtonStroked" onClick={onApprove}>
          Проставить
        </button>
        <button className="appButton appButtonXSmall" onClick={onReject} style={{ marginLeft: '8px' }}>
          Отмена
        </button>
      </div>
    </div>
  );
};
