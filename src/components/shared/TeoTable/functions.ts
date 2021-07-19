import { GroupedTeoCashflowItems, IEffectItems } from '~/components/pages/teoEditor/types';
import { prettyNum } from '../../../functions';

export const handleValue = (value: string | number, mlnMode: boolean): string =>
  typeof value === 'string' ? value : prettyNum(value, mlnMode);

export const toPeriodString = (year: number, month: number): string => `${year}-${month + 1}`;

type Period = {
  year: number;
  month: number;
};

export const parsePeriod = (period: string): Period => {
  const [year, month] = period.split('-').map((x) => +x);
  return { year, month: month - 1 };
};

export const isEffectItems = (data: IEffectItems | GroupedTeoCashflowItems | any): data is IEffectItems => {
  return data?.capex && data?.costPrice && data?.grossIncome && data?.operatingCosts && data?.single && !data?.opex;
};
