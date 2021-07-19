import React, { useMemo, useState, useEffect } from 'react';

import { IColumnInfo, CellValue } from '../types';
import { YearBadges } from '../../YearBadges';
import { months, KeyCodes } from '~/const';
import { NewCell } from '../NewCell';
import { parseValue } from '~/functions';
import { toPeriodString } from '../functions';
import { OptionsSwitch } from '../../OptionsSwitch';
import { useYearSelector } from './useYearSelector';
import s from '../index.module.scss';

interface IValuesEditor {
  articlesValues: Record<string, CellValue[]>;
  startDate: Date;
  finishDate: Date;
  save: (value: number, itemId: string, period: string) => void;
  setAllPeriodValue?: (value: number, itemId: string, period: string) => void;
  currentArticleId: string;
  columns: IColumnInfo[];
  showProposal: boolean;
  setShowProposal?: (show: boolean) => void;
}

export const ValuesEditor: React.FC<IValuesEditor> = ({
  articlesValues,
  startDate,
  finishDate,
  currentArticleId,
  save,
  columns,
  showProposal,
  setShowProposal,
  setAllPeriodValue,
}: IValuesEditor): JSX.Element => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [activeCell, setActiveCell] = useState<IColumnInfo>();
  const [lastActiveCell, setLastActiveCell] = useState<IColumnInfo>();
  const [mlnMode, setMlnMode] = useState<boolean>(false);

  useEffect(() => {
    activeCell && setLastActiveCell(activeCell);
  }, [activeCell]);

  useYearSelector(startDate, finishDate, setYear);

  const onKeyDown = (keyCode: number, ctrlPressed: boolean, inputElement: HTMLInputElement) => {
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
    }

    if (Object.keys(newCell).length && columns.find((ci) => ci.month === newCell?.month && ci.year === newCell?.year)) {
      setActiveCell(newCell);
      if (ctrlPressed) {
        const value = parseValue(inputElement.value, mlnMode);
        value && currentArticleId && save(value, currentArticleId, toPeriodString(newCell.year, newCell.month));
      }
    }
  };

  const yearSum: number = useMemo(() => {
    if (!currentArticleId || !articlesValues[currentArticleId]) return 0;

    return articlesValues[currentArticleId]
      .filter((cell) => cell.year === year)
      .reduce((sum, elem) => (sum += elem.value), 0);
  }, [articlesValues, currentArticleId, year]);

  const value = (month: number): number => {
    if (!currentArticleId || !articlesValues[currentArticleId]) return 0;
    return (
      articlesValues[currentArticleId].find(
        (cellValue: CellValue) => cellValue.year === year && cellValue.month === month
      )?.value || 0
    );
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
          <OptionsSwitch
            isRight={mlnMode}
            onChange={setMlnMode}
            leftOption={<span>Тыс</span>}
            rightOption={<span>Млн</span>}
          />
        </div>
      </div>
      <div className={s.yearRow} style={{ gridTemplateColumns: '6fr 1fr' }}>
        <div className={s.months}>
          {columns
            .filter((ci: IColumnInfo) => ci.year === year)
            .map((ci) => (
              <div key={`${currentArticleId}-${year}-${ci.month}`} className={s.month}>
                <p>{months[Number(ci.month)]}</p>
                <NewCell
                  value={value(Number(ci.month))}
                  save={(v: number) => {
                    currentArticleId && save(v, currentArticleId, toPeriodString(year, ci.month || 0));
                  }}
                  mlnMode={mlnMode}
                  isActive={activeCell?.month === ci.month && activeCell?.year === ci.year}
                  isLastActive={lastActiveCell?.month === ci.month && lastActiveCell?.year === ci.year}
                  setActive={(activate: boolean) => {
                    if (activate) {
                      setActiveCell({ ...ci });
                    } else if (activeCell?.month === ci.month && activeCell?.year === ci.year) {
                      setActiveCell(undefined);
                    }
                  }}
                  onKeyDown={onKeyDown}
                  showProposal={showProposal}
                  setShowProposal={setShowProposal}
                  setAllPeriodValue={(value: number) => {
                    setAllPeriodValue &&
                      setAllPeriodValue(value, currentArticleId, toPeriodString(year, ci.month || 0));
                  }}
                />
              </div>
            ))}
        </div>
        <div className={s.month}>
          <p>За год</p>
          <NewCell value={yearSum} mlnMode={mlnMode} disabled />
        </div>
      </div>
    </>
  );
};
