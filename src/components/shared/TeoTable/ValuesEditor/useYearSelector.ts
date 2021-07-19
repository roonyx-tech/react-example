import { useEffect } from 'react';

export const useYearSelector = (startDate: Date, finishDate: Date, setYear: (year: number) => void) => {
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = startDate.getFullYear();
    const availableYears = new Array(finishDate.getFullYear() - startYear + 1).fill(0).map((_, i) => startYear + i);
    if (!availableYears.includes(currentYear)) {
      if (availableYears[0] > currentYear) setYear(availableYears[0]);
      else setYear(availableYears[availableYears.length - 1]);
    } else setYear(currentYear);
  }, [startDate, finishDate]);
};
