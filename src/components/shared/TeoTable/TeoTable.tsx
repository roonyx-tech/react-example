import React, { Fragment, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { TeoEditorArticle, CellValue, IColumnInfo, ArticleVisibility, DoubleCellValue } from './types';
import {
  GroupedTeoCashflowItems,
  IEffectItems,
  TeoCashflowItem,
  TeoExpensesValue,
  TeoImpactPnLValue,
  TeoSteps,
} from '~/components/pages/teoEditor/types';
import { EffectArticlesEditor } from './EffectArticlesEditor';
import { ConfirmDialog } from '../ConfirmDialog';
import { ArticlesEditor } from './ArticlesEditor';
import { ValuesEditor, DoubleValuesEditor } from './ValuesEditor';
import { isEffectItems, parsePeriod, toPeriodString } from './functions';
import { ValuesChecker, ValueInfo, DoubleValueInfo } from './ValuesChecker';
import { HotKeyTip } from './HotKeyTip';
import { Tooltip } from '../htmlElements/Tooltip';
import s from './index.module.scss';

let singleValuesChecker: ValuesChecker<ValueInfo>;
let doubleValuesChecker: ValuesChecker<DoubleValueInfo>;
const genetivusStepName: Record<string, string> = {
  [TeoSteps.ProjectExpenses]: 'проектных расходов',
  [TeoSteps.PostProjectExpenses]: 'постпроектных расходов',
  [TeoSteps.EconomicalEffect]: 'экономического эффекта',
};

interface INewTeoTable {
  step: TeoSteps;
  selectedArticles: Record<string, TeoEditorArticle[]>;
  articles: GroupedTeoCashflowItems | IEffectItems;
  articlesValues: Record<string, CellValue[] | DoubleCellValue[]>;
  startDate: Date;
  finishDate: Date;
  save: (values: (TeoExpensesValue | TeoImpactPnLValue | any)[]) => void;
  onEditArticles: (articlesVisibility: ArticleVisibility[]) => void;
  isNewView?: boolean;
  setIsNewView?: (isNew: boolean) => void;
}

export const TeoTable: React.FC<INewTeoTable> = ({
  step,
  selectedArticles,
  articles,
  startDate,
  finishDate,
  articlesValues,
  save,
  onEditArticles,
  isNewView,
  setIsNewView,
}) => {
  const [currentArticleId, setCurrentArticleId] = useState<string>();
  const [articleToDelete, setArticleToDelete] = useState<string>();
  const [showProposal, setShowProposal] = useState<boolean>(false);
  const isEEtable = isEffectItems(articles);

  const firstArticleId = (): string | undefined => {
    for (const groupName in selectedArticles)
      if (selectedArticles[groupName].length) return selectedArticles[groupName][0].id;
  };

  useEffect(() => {
    singleValuesChecker = new ValuesChecker<ValueInfo>();
    doubleValuesChecker = new ValuesChecker<DoubleValueInfo>();
  }, []);

  useEffect(() => {
    if (!currentArticleId) {
      const id = firstArticleId();
      id && setCurrentArticleId(id);
    }
  }, [selectedArticles]);

  useEffect(() => {
    setCurrentArticleId(firstArticleId());
  }, [step]);

  const onDelete = (articleId: string, check = true) => {
    if (check && articlesValues[articleId].length) return setArticleToDelete(articleId);
    let id = 0;
    for (const key in articles) {
      const group = (articles as any)[key];
      if (!group.find) continue;
      id = group.find((art: TeoCashflowItem) => art.item.id === articleId)?.id;
      if (id) break;
    }
    if (id) onEditArticles([{ id, visible: false }]);
    currentArticleId === articleId && setCurrentArticleId(undefined);
  };

  const columns: IColumnInfo[] = useMemo(() => {
    const res: IColumnInfo[] = [];
    const startYear = startDate.getFullYear();
    const finishYear = finishDate.getFullYear();
    for (let year = startYear; year <= finishYear; ++year) {
      for (
        let month = year === startYear ? startDate.getMonth() : 0;
        month <= (year === finishYear ? finishDate.getMonth() : 11);
        ++month
      ) {
        res.push({
          month,
          year,
        });
      }
    }
    return res;
  }, [startDate, finishDate]);

  const saveExpenses = (value: number, itemId: string, period: string) => {
    const item: TeoExpensesValue = { value, itemId, period };
    save([item]);
    const { year, month } = parsePeriod(period);
    const thirdInRow = singleValuesChecker.isThirdInRow({ value, month, year });
    setShowProposal(thirdInRow);
  };

  const saveAllPeriodExpenses = (value: number, itemId: string, period: string) => {
    const { year, month } = parsePeriod(period);
    const index = columns.findIndex((ci) => ci.year === year && ci.month === month);
    if (index !== -1) {
      const items: TeoExpensesValue[] = columns.slice(index + 1, columns.length).map((ci) => ({
        period: toPeriodString(ci.year, ci.month || 0),
        itemId,
        value,
      }));
      save(items);
    }
  };

  const saveImpact = ({ asIs, toBe }: { asIs: number; toBe: number }, itemId: string, period: string) => {
    const item: TeoImpactPnLValue = { asIs, toBe, itemId, period };
    save([item]);
    const { year, month } = parsePeriod(period);
    const thirdInRow = doubleValuesChecker.isThirdInRow({ value: [asIs, toBe], month, year });
    setShowProposal(thirdInRow);
  };

  const saveAllPeriodImpact = (value: number, type: 'asIs' | 'toBe', itemId: string, period: string) => {
    const { year, month } = parsePeriod(period);
    const index = columns.findIndex((ci) => ci.year === year && ci.month === month);
    if (index !== -1) {
      const items: TeoImpactPnLValue[] = columns.slice(index + 1, columns.length).map((ci) => {
        const toSave = (articlesValues[itemId] as DoubleCellValue[]).find(
          (cell) => cell.month === ci.month && cell.year === ci.year
        ) || { asIs: 0, toBe: 0 };
        return {
          period: toPeriodString(ci.year, ci.month || 0),
          itemId,
          asIs: toSave.asIs,
          toBe: toSave.toBe,
          [type]: value,
        };
      });
      save(items);
    }
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.column}>
          <div className={s.title}>
            <span className={s.blue}>1.&nbsp;</span>
            <span>Выберите статьи для указания {genetivusStepName[step]}</span>
          </div>
          <div className={s.scrollContainer}>
            {Object.keys(selectedArticles)
              .filter((groupName) => selectedArticles[groupName]?.length)
              .map((groupName) => (
                <Fragment key={groupName}>
                  <p>
                    <strong>{groupName}</strong>
                  </p>
                  {selectedArticles[groupName].map(({ id, name, tooltip }) => (
                    <TeoTableArticle
                      key={id}
                      title={name}
                      tooltip={tooltip}
                      onSelect={() => setCurrentArticleId(id)}
                      onDelete={() => onDelete(id)}
                      selected={currentArticleId === id}
                    />
                  ))}
                </Fragment>
              ))}
          </div>
          {isEEtable ? (
            <EffectArticlesEditor articles={articles as IEffectItems} onEdit={onEditArticles} />
          ) : (
            <ArticlesEditor articles={articles as GroupedTeoCashflowItems} onEdit={onEditArticles} />
          )}
        </div>
        <div className={s.column}>
          <div className={s.title}>
            <span className={s.blue}>2.&nbsp;</span>
            <span>Укажите расходы по выбранным статьям</span>
          </div>
          <HotKeyTip />
          {currentArticleId ? (
            <>
              {isEEtable ? (
                <DoubleValuesEditor
                  articlesValues={articlesValues as Record<string, DoubleCellValue[]>}
                  currentArticleId={currentArticleId}
                  startDate={startDate}
                  finishDate={finishDate}
                  save={saveImpact}
                  columns={columns}
                  isNewView={isNewView}
                  setIsNewView={setIsNewView}
                  showProposal={showProposal}
                  setShowProposal={setShowProposal}
                  setAllPeriodValue={saveAllPeriodImpact}
                />
              ) : (
                <ValuesEditor
                  articlesValues={articlesValues as Record<string, CellValue[]>}
                  currentArticleId={currentArticleId}
                  startDate={startDate}
                  finishDate={finishDate}
                  save={saveExpenses}
                  columns={columns}
                  showProposal={showProposal}
                  setShowProposal={setShowProposal}
                  setAllPeriodValue={saveAllPeriodExpenses}
                />
              )}
            </>
          ) : (
            <p>Выберите статью для редактирования значений</p>
          )}
        </div>
      </div>
      <ConfirmDialog
        open={Boolean(articleToDelete)}
        title=""
        contentStyle={{ width: 'fit-content' }}
        confirmButtonText="Удалить"
        onClose={(res) => {
          res && articleToDelete && onDelete(articleToDelete, false);
          setArticleToDelete(undefined);
        }}
      >
        <p>Вы уверены, что хотите удалить статью? Введённые значения по статье будут утеряны!</p>
      </ConfirmDialog>
    </>
  );
};

interface ITeoTableArticleProps {
  title: string;
  onSelect: () => void;
  onDelete: () => void;
  selected: boolean;
  tooltip?: string;
}

export const TeoTableArticle: React.FC<ITeoTableArticleProps> = ({
  title,
  onSelect,
  onDelete,
  selected,
  tooltip,
}): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div className={cn(s.article, s.bordered, { [s.active]: selected })} onClick={onSelect}>
      <div>{title}</div>
      <div>
        {tooltip && (
          <>
            <img
              className={s.tooltipIcon}
              src="/img/tooltip.svg"
              alt="tooltip"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            <Tooltip show={showTooltip} blockStyles={{}}>
              <div className={s.tooltip}>
                <span>{tooltip}</span>
              </div>
            </Tooltip>
          </>
        )}
        <img
          src="/img/cross.svg"
          alt="Удалить"
          className={s.cross}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
    </div>
  );
};
