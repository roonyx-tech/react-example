import React from 'react';

import { Button } from '~/components/shared/Button';

import { IStepAction } from './types';

import s from './styles.module.scss';

interface IStepActions {
  isFirstStep: boolean;
  isLastStep: boolean;
  withActions: IStepAction[];
  onNext: () => void;
  onPrev: () => void;
}

export const StepActions: React.FC<IStepActions> = ({ isFirstStep, isLastStep, withActions, onNext, onPrev }) => {
  const actionForLastStep = withActions.find((action) => action.forLastStep);
  const NextButton = !isLastStep ? (
    <Button className={s.button} onClick={onNext}>
      Дальше
    </Button>
  ) : actionForLastStep ? (
    <Button className={s.button} onClick={actionForLastStep.action}>
      {actionForLastStep.name}
    </Button>
  ) : null;

  return (
    <div className={s.root}>
      {!isFirstStep && (
        <Button className={s.button} type="outline" onClick={onPrev}>
          К предыдущему шагу
        </Button>
      )}

      {withActions
        .filter((action) => !action.forLastStep)
        .map((action) => (
          <Button key={action.name} className={s.button} type="outline" onClick={action.action}>
            {action.name}
          </Button>
        ))}

      {NextButton}
    </div>
  );
};
