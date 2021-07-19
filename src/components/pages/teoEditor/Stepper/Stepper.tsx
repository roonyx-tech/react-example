import React, { useState } from 'react';

import { Loading } from '~/components/shared/Loading';
import { StepActions, IStepAction } from './StepActions';

import s from './styles.module.scss';

function map<P = any>(children: React.ReactElement<P>[], func: (el: React.ReactElement<P>, index: number) => any) {
  let index = 0;

  return React.Children.map(children, (child) => (React.isValidElement<P>(child) ? func(child, index++) : child));
}

/**
 * АПИ компонента
 *
 * при переходе по шагам проверяется, есть ли шага функции запросов при активации
 * или покидании шага
 * Чтобы не возникало проблем со стейтом при загрузке клик по шагу блокируется с помощью pointerEvents
 *
 * Шаги развития
 * 1. Кастомные компоненты для Шага или соединителя шагов (сейчас линия)
 */
interface IStepper {
  /** Ключ текущего шага */
  currentStep?: string;
  /** Индикатор загрузки */
  isLoading?: boolean;
  /**
   * Добавляет возможнось управлять шагами с кнопок
   *
   * !!! ПОЯДОК ВАЖЕН !!!
   */
  withButtons?: IStepAction[];
  children: React.ReactElement<IStep>[];
  onSelect: (step: string, index: number) => void;
}

export const Stepper: React.FC<IStepper> = ({ isLoading, withButtons, children, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [content, setContent] = useState<React.ReactNode>(children.length ? children[0] : null);

  const selectStep = async (stepKey: string, index: number) => {
    const stepIndex = map<IStep>(children, (child) => child.props.selectorKey).indexOf(stepKey);
    const component = children[stepIndex];
    const prevComponent = children[currentIndex];
    onSelect(map<IStep>(children, (child) => child.props.selectorKey)[stepIndex], stepIndex);

    const { beforeActive } = component.props as IStep;
    const { beforeLeave } = prevComponent.props as IStep;

    if (beforeLeave) {
      await beforeLeave();
    }
    if (beforeActive) {
      setCurrentIndex(stepIndex);
      await beforeActive();
      // setContent(component);
    } else {
      setCurrentIndex(stepIndex);
      // setContent(component);
    }
  };

  // useEffect(() => {
  //   const component = children[currentIndex];
  //   setContent(component);
  // }, [currentIndex]);

  return (
    <div className={s.root}>
      <div className={s.steps}>
        {map<IStep>(children, (child, index) => {
          const step = child.props;
          // console.log(index, step);
          return (
            <React.Fragment key={`step-${index}`}>
              <div className={currentIndex > index ? s.line_prev : currentIndex < index ? s.line_next : s.step__line} />
              <div
                className={currentIndex > index ? s.step_prev : currentIndex < index ? s.step_next : s.step}
                style={{ pointerEvents: isLoading ? 'none' : 'all' }}
                onClick={() => selectStep(step.selectorKey, index)}
              >
                {index + 1}
                <div className={s.title}>{step.title}</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* <StepContentContainer>{isLoading ? <Loading /> : content}</StepContentContainer> */}
      {children[currentIndex]}

      {withButtons && (
        <StepActions
          isLastStep={React.Children.count(children) - 1 === currentIndex}
          isFirstStep={currentIndex === 0}
          onNext={() =>
            selectStep(map<IStep>(children, (child) => child.props.selectorKey)[currentIndex + 1], currentIndex + 1)
          }
          onPrev={() =>
            selectStep(map<IStep>(children, (child) => child.props.selectorKey)[currentIndex - 1], currentIndex - 1)
          }
          withActions={withButtons}
        ></StepActions>
      )}
    </div>
  );
};

// interface IStepContentContainer {
//   children?: React.ReactNode;
// }
// const StepContentContainer: React.FC<IStepContentContainer> = ({ children }) => {
//   return <div className={s.content}>{children}</div>;
// };

// interface IStepContent {}
// const StepContent: React.FC<IStepContent> = () => {
//   return <div></div>;
// };

/**
 *
 * ПРИМЕР:
 * <Step
 *   selectorKey={TeoSteps.EconomicalEffect}
 *   title="Экономический эффект"
 *   isLoading={isLoading}
 *   beforeActive={() => {
 *     setIsLoading(true);
 *     return new Promise((resolve, reject) => {
 *       setTimeout(() => {
 *         setIsLoading(false);
 *         resolve()
 *       }, 5000);
 *     });
 *   }}
 * >
 */
interface IStep {
  selectorKey: string;
  title: string;
  isLoading?: boolean;
  /**
   * Метод, выполняемый перед тем как отрендерить компонент
   */
  beforeActive?: () => Promise<void>; //void;
  /**
   * Метод, выполняемый перед тем как перейти на другой шаг
   * TODO решить как
   */
  beforeLeave?: () => Promise<void>; //void;
}
export const Step: React.FC<IStep> = ({ isLoading, children }) => {
  // Возможно стоит стиль для загрузки (затемнить например)
  return <>{isLoading ? <Loading /> : children}</>;
};
