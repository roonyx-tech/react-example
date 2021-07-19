import React, { useMemo, useState, useEffect } from 'react';

import { IColumnInfo, DoubleCellValue } from '../types';
import { YearBadges } from '../../YearBadges';
import { months, KeyCodes } from '~/const';
import { NewCell } from '../NewCell';
import { parseValue } from '~/functions';
import { toPeriodString } from '../functions';
import { OptionsSwitch } from '../../OptionsSwitch';
import { ConfirmDialog } from '../../ConfirmDialog';
import { useYearSelector } from './useYearSelector';
import s from '../index.module.scss';

type DoubleValue = {
  asIs: number;
  toBe: number;
};

interface IValuesEditor {
  articlesValues: Record<string, DoubleCellValue[]>;
  startDate: Date;
  finishDate: Date;
  save: (value: { asIs: number; toBe: number }, itemId: string, period: string) => void;
  setAllPeriodValue: (value: number, type: 'asIs' | 'toBe', itemId: string, period: string) => void;
  currentArticleId: string;
  columns: IColumnInfo[];
  isNewView?: boolean;
  setIsNewView?: (isNew: boolean) => void;
  showProposal: boolean;
  setShowProposal?: (show: boolean) => void;
}

export const DoubleValuesEditor: React.FC<IValuesEditor> = ({
  articlesValues,
  startDate,
  finishDate,
  currentArticleId,
  save,
  setAllPeriodValue,
  columns,
  isNewView,
  setIsNewView,
  showProposal,
  setShowProposal,
}: IValuesEditor): JSX.Element => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [activeCell, setActiveCell] = useState<IColumnInfo>();
  const [lastActiveCell, setLastActiveCell] = useState<IColumnInfo>();
  const [mlnMode, setMlnMode] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  useEffect(() => {
    activeCell && setLastActiveCell(activeCell);
  }, [activeCell]);

  useYearSelector(startDate, finishDate, setYear);

  const onKeyDown = (
    keyCode: number,
    ctrlPressed: boolean,
    inputElement: HTMLInputElement,
    type: 'asIs' | 'toBe',
    secondValue: number
  ) => {
    if (!activeCell) return;

    const { month = 0 } = activeCell;
    let newCell: IColumnInfo | any = {};

    switch (keyCode) {
      case KeyCodes.enter:
        if (month < 11) {
          newCell = { ...activeCell, month: month + 1 };
        }
        break;
      case KeyCodes.right:
        if ((inputElement.selectionEnd === inputElement.value.length || ctrlPressed) && month < 11) {
          newCell = { ...activeCell, month: month + 1 };
        }
        break;
      case KeyCodes.left:
        if ((inputElement.selectionStart === 0 || ctrlPressed) && month > 0) {
          newCell = { ...activeCell, month: month - 1 };
        }
        break;
      case KeyCodes.up:
        break;
      case KeyCodes.down:
        break;
    }

    if (Object.keys(newCell).length && columns.find((ci) => ci.month === newCell?.month && ci.year === newCell?.year)) {
      setActiveCell(newCell);
      if (ctrlPressed) {
        let asIs: number, toBe: number;
        if (type === 'asIs') {
          asIs = parseValue(inputElement.value, mlnMode);
          toBe = secondValue;
        } else {
          asIs = secondValue;
          toBe = parseValue(inputElement.value, mlnMode);
        }
        currentArticleId && save({ asIs, toBe }, currentArticleId, toPeriodString(newCell.year, newCell.month));
      }
    }
  };

  const yearSum: DoubleValue = useMemo(() => {
    if (!currentArticleId || !articlesValues[currentArticleId]) return { asIs: 0, toBe: 0 };

    const sumValues = (sum: DoubleValue, elem: DoubleCellValue): DoubleValue => {
      sum.asIs += elem.asIs;
      sum.toBe += elem.toBe;
      return sum;
    };

    return articlesValues[currentArticleId]
      .filter((cell) => cell.year === year)
      .reduce((sum, elem) => sumValues(sum, elem), { asIs: 0, toBe: 0 });
  }, [articlesValues, currentArticleId, year]);

  const value = (month: number, type: 'asIs' | 'toBe'): number => {
    if (!currentArticleId || !articlesValues[currentArticleId]) return 0;
    const cell = articlesValues[currentArticleId].find(
      (cellValue: DoubleCellValue) => cellValue.year === year && cellValue.month === month
    );
    return cell ? cell[type] : 0;
  };

  return (
    <>
      <div className={s.flex}>
        <YearBadges
          selectedYear={year}
          onClick={setYear}
          finishYear={finishDate.getFullYear()}
          startYear={startDate.getFullYear()}
          extraYears={0}
        />
        <div className={s.flex}>
          {isNewView !== undefined && setIsNewView && (
            <div style={{ marginRight: '20px' }} className={s.flex}>
              <OptionsSwitch
                isRight={isNewView}
                onChange={(switchToNew) => {
                  if (switchToNew) setShowWarning(true);
                  else setIsNewView(false);
                }}
                leftOption={<span>As Is - To Be</span>}
                rightOption={<span>ЭЭ</span>}
              />
            </div>
          )}
          <div className={s.flex}>
            <OptionsSwitch
              isRight={mlnMode}
              onChange={setMlnMode}
              leftOption={<span>Тыс</span>}
              rightOption={<span>Млн</span>}
            />
          </div>
        </div>
      </div>
      <div className={s.yearRow} style={{ gridTemplateColumns: isNewView ? '6fr 1fr' : '1fr 12fr 2fr' }}>
        {!isNewView && (
          <div>
            <div className={s.sub}>
              <span>AS IS</span>
              <span>TO BE</span>
            </div>
            {columns.length > 6 && (
              <div className={s.sub}>
                <span>AS IS</span>
                <span>TO BE</span>
              </div>
            )}
          </div>
        )}
        <div className={s.months}>
          {columns
            .filter((ci: IColumnInfo) => ci.year === year)
            .map((ci) => {
              const asIs = value(Number(ci.month), 'asIs');
              const toBe = value(Number(ci.month), 'toBe');
              return (
                <div key={`${currentArticleId}-${year}-${ci.month}`} className={s.month}>
                  <p>{months[Number(ci.month)]}</p>
                  <NewCell
                    value={asIs}
                    save={(v: number) => {
                      currentArticleId &&
                        save({ asIs: v, toBe }, currentArticleId, toPeriodString(year, ci.month || 0));
                    }}
                    mlnMode={mlnMode}
                    isActive={
                      activeCell?.month === ci.month && activeCell?.year === ci.year && activeCell?.extraInfo === 'up'
                    }
                    isLastActive={
                      lastActiveCell?.month === ci.month &&
                      lastActiveCell?.year === ci.year &&
                      lastActiveCell?.extraInfo === 'up'
                    }
                    setActive={(activate: boolean) => {
                      if (activate) {
                        setActiveCell({ ...ci, extraInfo: 'up' });
                      } else if (activeCell?.month === ci.month && activeCell?.year === ci.year) {
                        setActiveCell(undefined);
                      }
                    }}
                    onKeyDown={(k, c, i) => onKeyDown(k, c, i, 'asIs', toBe)}
                    showProposal={showProposal}
                    setShowProposal={setShowProposal}
                    setAllPeriodValue={(value: number) => {
                      setAllPeriodValue &&
                        setAllPeriodValue(value, 'asIs', currentArticleId, toPeriodString(year, ci.month || 0));
                    }}
                  />
                  {!isNewView && (
                    <NewCell
                      value={toBe}
                      save={(v: number) => {
                        currentArticleId &&
                          save({ asIs, toBe: v }, currentArticleId, toPeriodString(year, ci.month || 0));
                      }}
                      mlnMode={mlnMode}
                      isActive={
                        activeCell?.month === ci.month &&
                        activeCell?.year === ci.year &&
                        activeCell?.extraInfo === 'down'
                      }
                      isLastActive={
                        lastActiveCell?.month === ci.month &&
                        lastActiveCell?.year === ci.year &&
                        lastActiveCell?.extraInfo === 'down'
                      }
                      setActive={(activate: boolean) => {
                        if (activate) {
                          setActiveCell({ ...ci, extraInfo: 'down' });
                        } else if (activeCell?.month === ci.month && activeCell?.year === ci.year) {
                          setActiveCell(undefined);
                        }
                      }}
                      onKeyDown={(k, c, i) => onKeyDown(k, c, i, 'toBe', asIs)}
                      showProposal={showProposal}
                      setShowProposal={setShowProposal}
                      setAllPeriodValue={(value: number) => {
                        setAllPeriodValue &&
                          setAllPeriodValue(value, 'toBe', currentArticleId, toPeriodString(year, ci.month || 0));
                      }}
                    />
                  )}
                </div>
              );
            })}
        </div>
        <div className={s.month}>
          <p>За год</p>
          <NewCell value={yearSum.asIs} mlnMode={mlnMode} disabled />
          {!isNewView && <NewCell value={yearSum.toBe} mlnMode={mlnMode} disabled />}
        </div>
      </div>
      <ConfirmDialog
        title=""
        open={showWarning}
        onClose={(confirmed) => {
          confirmed && setIsNewView && setIsNewView(true);
          setShowWarning(false);
        }}
        contentStyle={{ width: 'fit-content' }}
      >
        <p>При переключении на ЭЭ все введенные значения во всех статьях будут очищены</p>
      </ConfirmDialog>
    </>
  );
};
