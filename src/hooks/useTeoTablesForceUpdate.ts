import { useState, useEffect } from 'react';

//** Возвращает функцию, которая устанавливает года, для которых нужно обновить данные */
export default (refetch: () => void, currentYearState: number) => {
  const [yearsToUpdate, setYearsToUpdate] = useState<Set<number>>();
  // console.log(yearsToUpdate);

  useEffect(() => {
    if (yearsToUpdate?.has(currentYearState)) {
      refetch();
      const years = new Set(yearsToUpdate);
      years.delete(currentYearState);
      setYearsToUpdate(years);
    }
  }, [currentYearState, yearsToUpdate]);

  const _setYearsToUpdate = (years: number[]) => {
    const newYears = new Set(yearsToUpdate?.size ? yearsToUpdate : []);
    years.forEach((y) => newYears.add(y));
    setYearsToUpdate(newYears);
  };

  return _setYearsToUpdate;
};
