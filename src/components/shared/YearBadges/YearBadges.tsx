import React, { useMemo } from 'react';

import s from './styles.module.scss';

interface IYearData {
  value: number;
  belongsToMainPeriod: boolean;
}

interface IYearBadges {
  onClick: (year: number) => void;
  startYear: number | undefined;
  finishYear: number | undefined;
  selectedYear: number;
  extraYears?: number;
  showSubs?: boolean;
}

export const YearBadges: React.FC<IYearBadges> = (props: IYearBadges): JSX.Element => {
  const { startYear, finishYear, selectedYear, onClick, extraYears = 3, showSubs = false } = props;
  const currentYear = new Date().getFullYear();

  const years: IYearData[] = useMemo(() => {
    if (startYear && finishYear) {
      return new Array(finishYear - startYear + 1 + extraYears).fill(0).map((_, i) => {
        const value = startYear + i;
        return {
          value,
          belongsToMainPeriod: value >= startYear && value <= finishYear,
        };
      });
    }
    return new Array(1 + extraYears).fill(0).map((_, i) => {
      const value = currentYear + i;
      return {
        value,
        belongsToMainPeriod: value === currentYear,
      };
    });
  }, [startYear, finishYear]);

  return (
    <div className={s.yearsRow}>
      {years.map((year: IYearData) => (
        <div
          key={year.value}
          className={`${year.belongsToMainPeriod ? s.previousYear : s.nextYear} ${s.singleYear} ${
            year.value === selectedYear && s.activeYear
          }`}
          onClick={() => onClick(year.value)}
        >
          {showSubs ? `${year.value} год` : year.value}
        </div>
      ))}
    </div>
  );
};
