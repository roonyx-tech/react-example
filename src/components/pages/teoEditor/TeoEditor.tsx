import React, { useState, useMemo, useEffect } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

import { teoErrors } from '../../../errors';

import { Layout } from '~/components/shared/Layout';
import { Stepper, Step } from './Stepper';
import { ISettings, Settings } from './steps/Settings';
import { Verification } from './steps/Verification';
import {
  teo,
  teoIndicatorsQuery,
  teoExpensesQuery,
  teoImpactPnLByMonths,
  teoProjectExpensesCashflowItems,
  teoImpactPnLItems,
} from '~/qraphql/queries';
import {
  updateProjectTeoParametersMutation,
  updateTeoCashflowItemsMutation,
  switchTeoViewMutation,
  deleteTeoMutation,
  updateTeoFromCopyMutation,
  saveTeoExpensesMutation,
  saveTeoImpactPnL,
} from '~/qraphql/mutations';

import { pages as routes } from '~/const';
import {
  ITeoResult,
  TeoSteps,
  ITeoExpensesResult,
  GroupedTeoCashflowItems,
  IEffectExpenses,
  IEffectItems,
  TeoImpactPnLValue,
  TeoExpensesValue,
} from './types';
import { TeoTable, ArticleVisibility, DoubleCellValue } from '~/components/shared/TeoTable';
import { toPeriodString } from '~/components/shared/TeoTable/functions';
import { articlesValues, selectedArticles, EEArticlesValues, EESelectedArticles } from './functions';
import s from './index.module.scss';

export const pages = [];

let unblock: any;
let removeWhenLeavePage = true;
let teoIdToRemove = 0;

export const NewTeoEditor: React.FC = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<keyof typeof TeoSteps>('Settings');
  const [teoId, setTeoId] = useState<number>();
  const [projectId, setProjectId] = useState<number>();

  const [teoSettings, setTeoSettings] = useState<ISettings>({ investmentPeriodMonths: 0, usefulLifeMonths: 0 });

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  // Блокировка истории чтобы сохранить перед уходом со страницы
  // Вызвать после сохранения
  // https://github.com/ReactTraining/history/blob/master/docs/blocking-transitions.md
  const unblockHistory = () => {
    unblock && unblock();
  };

  useEffect(() => {
    unblock = history.block('При отмене все изменения будут утеряны. Вы действительно хотите продолжить?');
    return () => {
      unblockHistory();
      removeWhenLeavePage && deleteTeo({ variables: { id: teoIdToRemove } });
    };
  }, []);

  useEffect(() => {
    const newTeoId = parseInt(id);
    if (typeof newTeoId === 'number') {
      setTeoId(newTeoId);
      teoIdToRemove = newTeoId;
    }
  }, [id]);

  /**
   * Queries and data
   */

  const { data, refetch } = useQuery<ITeoResult>(teo, {
    variables: {
      id: teoId,
    },
    skip: !teoId,
    onCompleted(data) {
      setProjectId(data.teo?.project?.id);
      setTeoSettings({
        investmentPeriodMonths: data?.teo?.parameters?.investmentPeriodMonths || 0,
        usefulLifeMonths: data?.teo?.parameters?.usefulLifeMonths || 0,
      });
    },
  });

  const isNewView = data?.teo?.newView;

  // TEO periods

  const [startDate, finishDate] = useMemo(() => {
    if (data?.teo?.project) {
      return [new Date(data.teo.project.startDate), new Date(data.teo.project.finishDate)];
    }
    return [null, null];
  }, [data]);

  const investmentPeriodFinishDate = useMemo(() => {
    return startDate && data?.teo?.parameters?.investmentPeriodMonths
      ? new Date(new Date(startDate).setMonth(startDate.getMonth() + data.teo.parameters.investmentPeriodMonths - 1))
      : startDate;
  }, [startDate, data]);

  // Indicators above stepper

  const { data: teoIndicators, refetch: refetchTeoIndicators } = useQuery(teoIndicatorsQuery, {
    variables: {
      teoId,
    },
    skip: !teoId,
  });

  // 2nd step

  const { data: projectExpenses, refetch: refetchProjectExpenses } = useQuery<ITeoExpensesResult>(teoExpensesQuery, {
    variables: {
      postProject: false,
      teoId,
    },
    skip: !teoId || !startDate || !finishDate,
    fetchPolicy: 'network-only',
  });

  const { data: projectCashflowItems, refetch: refetchProjectCashflowItems } = useQuery<GroupedTeoCashflowItems>(
    teoProjectExpensesCashflowItems,
    {
      variables: { teoId, capexGroup: 'Capex', opexGroup: 'Opex' },
      skip: !teoId,
    }
  );

  const selectedArticles2ndStep = useMemo(() => selectedArticles(projectExpenses), [projectExpenses]);
  const articlesValues2ndStep = useMemo(() => articlesValues(projectExpenses), [projectExpenses]);

  // 3rd step

  const { data: postProjectExpenses, refetch: refetchPostProjectExpenses } = useQuery<ITeoExpensesResult>(
    teoExpensesQuery,
    {
      variables: {
        postProject: true,
        teoId,
      },
      skip: !teoId || !startDate || !finishDate,
      fetchPolicy: 'network-only',
    }
  );

  const {
    data: postProjectCashflowItems,
    refetch: refetchPostProjectCashflowItems,
  } = useQuery<GroupedTeoCashflowItems>(teoProjectExpensesCashflowItems, {
    variables: { teoId, capexGroup: 'PostProjectCapex', opexGroup: 'PostProjectOpex' },
    skip: !teoId,
  });

  const selectedArticles3rdStep = useMemo(() => selectedArticles(postProjectExpenses), [postProjectExpenses]);
  const articlesValues3rdStep = useMemo(() => articlesValues(postProjectExpenses), [postProjectExpenses]);
  const startDate3rdStep = finishDate
    ? new Date(new Date(finishDate).setMonth(new Date(finishDate).getMonth() + 1))
    : new Date();
  const finishDate3rdStep = investmentPeriodFinishDate || new Date();
  const dontShowTable3rdStep =
    startDate3rdStep.getFullYear() > finishDate3rdStep.getFullYear() ||
    (startDate3rdStep.getFullYear() === finishDate3rdStep.getFullYear() &&
      startDate3rdStep.getMonth() >= finishDate3rdStep.getMonth());

  // 4th step

  const { data: effectExpenses, refetch: refetchEffectExpenses } = useQuery<IEffectExpenses>(teoImpactPnLByMonths, {
    variables: { teoId },
    skip: !teoId || !startDate || !finishDate,
    fetchPolicy: 'network-only',
  });

  const { data: effectItems, refetch: refetchEffectItems } = useQuery<{ data: IEffectItems }>(teoImpactPnLItems, {
    variables: { teoId },
    skip: !teoId || !startDate || !finishDate,
    fetchPolicy: 'network-only',
  });

  const selectedArticles4thStep = useMemo(() => EESelectedArticles(effectExpenses), [effectExpenses]);
  const articlesValues4thStep = useMemo(() => EEArticlesValues(effectExpenses), [effectExpenses]);

  /**
   * Mutations and funcs to save data
   */

  const [deleteTeo] = useMutation(deleteTeoMutation);
  const [updateTeo] = useMutation(updateTeoFromCopyMutation);
  const [switchTeoView] = useMutation(switchTeoViewMutation);
  const [updateProjectTeoParams] = useMutation(updateProjectTeoParametersMutation);
  const [_saveExpenses] = useMutation(saveTeoExpensesMutation);
  const [_saveImpact] = useMutation(saveTeoImpactPnL);
  const [updateTeoCashflowItems] = useMutation(updateTeoCashflowItemsMutation);

  // 2nd and 3rd step save funcs

  const saveExpenses = (values: TeoExpensesValue[]) => {
    _saveExpenses({
      variables: {
        expenses: values.map((value) => ({ ...value, teoId })),
      },
    })
      .then(() => {
        refetchTeoIndicators();
        if (currentStep === 'ProjectExpenses') refetchProjectExpenses();
        else refetchPostProjectExpenses();
      })
      .catch(() => {
        toast(teoErrors.capexSaving, { type: toast.TYPE.ERROR });
      });
  };

  // 4th step save funcs

  const saveImpact = (items: TeoImpactPnLValue[]) => {
    _saveImpact({ variables: { teoImpactPnL: items.map((item) => ({ ...item, teoId })) } })
      .then(() => {
        refetchTeoIndicators();
        refetchEffectExpenses();
      })
      .catch(() => {
        toast(teoErrors.capexSaving, { type: toast.TYPE.ERROR });
      });
  };

  const setIsNewView = async (newView: boolean) => {
    switchTeoView({ variables: { teoId, newView } })
      .then(() => refetch())
      .catch(() => toast(teoErrors.updateTeoView, { type: toast.TYPE.ERROR }));
  };

  const [wasNewView, setWasNewView] = useState<boolean>();

  const clearArticles = () => {
    const teoImpactPnLItems: TeoImpactPnLValue[] = [];
    for (const articleId in articlesValues4thStep) {
      articlesValues4thStep[articleId].forEach((v: DoubleCellValue) => {
        teoImpactPnLItems.push({
          asIs: 0,
          toBe: 0,
          itemId: articleId,
          period: toPeriodString(v.year, v.month),
        });
      });
    }
    saveImpact(teoImpactPnLItems);
  };

  useEffect(() => {
    if (isNewView && wasNewView === false) clearArticles();
    setWasNewView(isNewView);
  }, [isNewView, wasNewView]);

  // Мутации ТЕО

  const prepareForStep = (step: string, index: number) => {
    setCurrentStep(step as keyof typeof TeoSteps);
  };

  const save = () => {
    removeWhenLeavePage = false;
    unblockHistory();
    updateTeo({
      variables: {
        id: teoId,
      },
    }).then(() => {
      history.push(generatePath(routes.projectCard, { projectId, tab: 'teo' }));
    });
  };

  const onCancel = () => {
    history.push(generatePath(routes.projectCard, { projectId, tab: 'teo' }));
  };

  const onEditArticles = (items: ArticleVisibility[]) => {
    updateTeoCashflowItems({ variables: { items } }).then(() => {
      if (currentStep === 'ProjectExpenses') {
        refetchProjectExpenses();
        refetchProjectCashflowItems();
      } else if (currentStep === 'PostProjectExpenses') {
        refetchPostProjectExpenses();
        refetchPostProjectCashflowItems();
      } else {
        refetchEffectExpenses();
        refetchEffectItems();
      }
    });
  };

  return (
    <Layout
      pageTitle={
        <div className={s.titleWrapper}>
          <div>
            <div className={s.btnBack} onClick={onCancel}>
              <img src="/img/Arrow-back.png" alt="arrow" />
              <span>Назад</span>
            </div>
          </div>
          {/* <h2>{`${isEdit ? 'Редактирование ТЭО' : 'Создание ТЭО'}`}</h2> */}
        </div>
      }
    >
      <Verification data={teoIndicators} />
      <Stepper
        onSelect={prepareForStep}
        isLoading={!teoId || !teoSettings}
        withButtons={[
          {
            name: 'Отменить',
            action: onCancel,
          },
          { name: 'Сохранить', action: save },
        ]}
      >
        <Step
          selectorKey={TeoSteps.Settings}
          title="Настройки ТЭО"
          beforeLeave={() =>
            data?.teo?.parameters?.investmentPeriodMonths !== teoSettings.investmentPeriodMonths ||
            data?.teo?.parameters?.usefulLifeMonths !== teoSettings.usefulLifeMonths
              ? updateProjectTeoParams({
                  variables: {
                    usefulLifeMonths: teoSettings.usefulLifeMonths,
                    investmentPeriodMonths: teoSettings.investmentPeriodMonths,
                    teoId,
                  },
                })
                  .then(() => {
                    refetch();
                  })
                  .catch(() => {
                    toast(teoErrors.updateTeoParams, {
                      type: toast.TYPE.ERROR,
                    });
                  })
              : Promise.resolve()
          }
        >
          <Settings settings={teoSettings} onSettingChange={setTeoSettings} />
        </Step>

        <Step
          selectorKey={TeoSteps.ProjectExpenses}
          title="Проектные расходы"
          isLoading={!projectExpenses || !projectCashflowItems}
        >
          {articlesValues2ndStep && selectedArticles2ndStep && startDate && finishDate && projectCashflowItems && (
            <div className={s.wrapper}>
              <TeoTable
                step={TeoSteps.ProjectExpenses}
                selectedArticles={selectedArticles2ndStep}
                articles={projectCashflowItems}
                startDate={startDate}
                finishDate={finishDate}
                articlesValues={articlesValues2ndStep}
                save={saveExpenses}
                onEditArticles={onEditArticles}
              />
            </div>
          )}
        </Step>

        <Step
          selectorKey={TeoSteps.PostProjectExpenses}
          title="Постпроектные расходы"
          isLoading={!postProjectCashflowItems || !postProjectExpenses || !finishDate}
        >
          {articlesValues3rdStep &&
            selectedArticles3rdStep &&
            startDate3rdStep &&
            finishDate3rdStep &&
            postProjectCashflowItems && (
              <div className={s.wrapper}>
                {dontShowTable3rdStep ? (
                  <strong style={{ marginTop: '48px' }}>
                    Период, за который рассчитывается ТЭО меньше либо равен сроку проекта. Поэтому проект не включает в
                    себя Постпроектные расходы.
                  </strong>
                ) : (
                  <TeoTable
                    step={TeoSteps.PostProjectExpenses}
                    selectedArticles={selectedArticles3rdStep}
                    articles={postProjectCashflowItems}
                    startDate={startDate3rdStep}
                    finishDate={finishDate3rdStep}
                    articlesValues={articlesValues3rdStep}
                    save={saveExpenses}
                    onEditArticles={onEditArticles}
                  />
                )}
              </div>
            )}
        </Step>

        <Step
          selectorKey={TeoSteps.EconomicalEffect}
          title="Экономический эффект"
          isLoading={!effectExpenses || !effectItems}
        >
          {startDate && investmentPeriodFinishDate && effectItems && (
            <div className={s.wrapper}>
              <TeoTable
                step={TeoSteps.EconomicalEffect}
                selectedArticles={selectedArticles4thStep}
                articles={effectItems.data}
                startDate={startDate}
                finishDate={investmentPeriodFinishDate}
                articlesValues={articlesValues4thStep}
                save={saveImpact}
                onEditArticles={onEditArticles}
                isNewView={isNewView}
                setIsNewView={setIsNewView}
              />
            </div>
          )}
        </Step>
      </Stepper>
    </Layout>
  );
};
