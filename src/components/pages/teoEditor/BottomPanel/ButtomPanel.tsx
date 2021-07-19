import React from 'react';

import { Button } from '~/components/shared/Button';

import s from './styles.module.scss';

interface IBottomPanel {
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onPrev: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const BottomPanel: React.FC<IBottomPanel> = ({ isFirstStep, isLastStep, onCancel, onNext, onPrev, onSave }) => {
  return (
    <div className={s.root}>
      {!isFirstStep && (
        <Button className={s.button} type="outline" onClick={onPrev}>
          К предыдущему шагу
        </Button>
      )}
      <Button className={s.button} onClick={isLastStep ? onSave : onNext}>
        {isLastStep ? 'Сохранить' : 'Дальше'}
      </Button>
      <Button className={s.button} type="outline" onClick={onCancel}>
        Отменить
      </Button>
    </div>
  );
};
