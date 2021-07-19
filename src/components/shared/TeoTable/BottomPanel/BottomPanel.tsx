import React from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import cn from 'classnames';

import { pages } from '../../../../const';
import s from './index.module.scss';

interface IBottomPanel {
  isLastStep: boolean;
  onGoNext: () => void;
  onCancel: () => void;
  onGoPrev?: () => void;
  projectId?: number;
  save?: () => void;
}

export const BottomPanel: React.FC<IBottomPanel> = ({
  onGoNext,
  onCancel,
  onGoPrev,
  isLastStep,
  projectId,
  save,
}: IBottomPanel) => {
  const history = useHistory();

  return (
    <div className={s.btns}>
      {onGoPrev && (
        <div className={cn(s.appButton, s.appButtonPrev)} onClick={onGoPrev}>
          <span>К предыдущему шагу</span>
        </div>
      )}
      <div
        className={cn(s.appButton, s.appButtonNext)}
        onClick={() => {
          if (isLastStep) {
            if (save) {
              save();
            } else {
              history.push(generatePath(pages.projectCard, { projectId }));
            }
          } else onGoNext();
        }}
      >
        <span>{isLastStep ? 'Сохранить' : 'Дальше'}</span>
      </div>
      <div className={cn(s.appButton, s.appButtonCancel)} onClick={onCancel}>
        <span>Отменить</span>
      </div>
    </div>
  );
};
