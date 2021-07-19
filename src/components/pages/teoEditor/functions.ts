import { ITeoExpensesResult, IEffectExpenses } from './types';
import { CellValue, TeoEditorArticle, DoubleCellValue } from '~/components/shared/TeoTable';

export const selectedArticles = (data?: ITeoExpensesResult): Record<string, TeoEditorArticle[]> => {
  if (data?.capex) {
    const capexArticles = data.capex
      .map((x: any) => {
        return {
          id: x.item.id,
          name: x.item.name,
        };
      })
      .sort((elem: any) =>
        elem.name.toLowerCase() === 'капитализируемый фот' ||
        elem.name.toLowerCase() === 'оборудование' ||
        elem.name.toLowerCase() === 'консалтинг'
          ? -1
          : 1
      );
    const opexArticles = data.opex
      .map((x: any) => ({
        id: x.item.id,
        name: x.item.name,
      }))
      .sort((elem: any) => (elem.name.toLowerCase() === 'расходы на персонал' ? -1 : 1));
    return {
      'Капитализируемые расходы': capexArticles,
      'Операционные расходы': opexArticles,
    };
  }
  return {};
};

export const articlesValues = (data?: ITeoExpensesResult): Record<string, CellValue[]> => {
  if (data?.capex) {
    const res: Record<string, CellValue[]> = {};
    data.capex.concat(data.opex).forEach((x: any) => {
      res[x.item.id] = x.months.map((m: any) => {
        const date = new Date(m.period);
        return {
          value: m.value,
          month: date.getMonth(),
          year: date.getFullYear(),
        };
      });
    });
    return res;
  }
  return {};
};

type Field = 'SINGLE' | 'COST_PRICE' | 'GROSS_INCOME' | 'OPERATING_COSTS' | 'CAPEX';
const impactTypeTexts: Record<Field, string> = {
  SINGLE: ' ',
  COST_PRICE: 'Себестоимость',
  GROSS_INCOME: 'Валовый доход',
  OPERATING_COSTS: 'Операционные расходы',
  CAPEX: 'Капитализируемые расходы',
};

export const EESelectedArticles = (data?: IEffectExpenses): Record<string, TeoEditorArticle[]> => {
  if (data?.expenses) {
    const articles = data.expenses
      .filter((x: any) => x.item.impactPnLType !== null)
      .sort((x: any, y: any) => (x.item.impactPnLType > y.item.impactPnLType ? 1 : -1))
      .sort((x: any) => (x.item.impactPnLType === 'SINGLE' ? -1 : 1));
    const res: Record<string, TeoEditorArticle[]> = {
      ' ': [],
      Себестоимость: [],
      'Валовый доход': [],
      'Операционные расходы': [],
      'Капитализируемые расходы': [],
    };
    articles.forEach((x: any) => {
      const groupName = impactTypeTexts[x.item.impactPnLType as Field];
      groupName && res[groupName].push(x.item);
    });
    return res;
  }
  return {};
};

export const EEArticlesValues = (data?: IEffectExpenses): Record<string, DoubleCellValue[]> => {
  if (data?.expenses) {
    const res: Record<string, DoubleCellValue[]> = {};
    data.expenses.forEach((x: any) => {
      res[x.item.id] = x.months.map((m: any) => {
        return {
          asIs: m.asIs,
          toBe: m.toBe,
          month: m.period - 1,
          year: m.year,
        };
      });
    });
    return res;
  }
  return {};
};
