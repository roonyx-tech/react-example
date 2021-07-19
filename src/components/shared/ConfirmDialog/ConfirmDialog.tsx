import React from 'react';
import Popup from 'reactjs-popup';

import { Button } from '../Button';
import s from './styles.module.scss';

interface IConfirmDialog {
  title?: string;
  open: boolean;
  alignTitle?: 'center' | 'left' | 'right';
  confirmButtonText?: string;
  cancelButtonText?: string;
  className?: string;
  onClose?: (confirm: boolean) => void;
  children?: React.ReactNode;
  contentStyle?: React.CSSProperties;
}

export const ConfirmDialog: React.FC<IConfirmDialog> = (props): JSX.Element => {
  const { open, title, confirmButtonText, cancelButtonText, onClose, children, className, contentStyle } = props;

  function closeConfirm(close: () => any, confirm?: boolean) {
    close();
    if (onClose) onClose(Boolean(confirm));
  }

  const alignTitle = props.alignTitle || 'left';

  return (
    <Popup open={open} onClose={() => onClose && onClose(false)} contentStyle={contentStyle}>
      {(close: () => any) => {
        return (
          <div className={className}>
            {title && (
              <h2 className={s.confirmDialogTitle} style={{ textAlign: alignTitle }}>
                {title}
              </h2>
            )}
            <div>{children}</div>
            <div className={s.confirmDialogButtons}>
              <Button onClick={closeConfirm.bind(null, close, true)} type="primary">
                {confirmButtonText || 'Продолжить'}
              </Button>
              <Button onClick={closeConfirm.bind(null, close, false)} type="outline">
                {cancelButtonText || 'Отмена'}
              </Button>
            </div>
          </div>
        );
      }}
    </Popup>
  );
};
