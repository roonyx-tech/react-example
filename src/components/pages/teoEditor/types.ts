export interface ITeoResult {
  teo?: {
    newView: boolean;
    parameters: {
      usefulLifeMonths: number;
      investmentPeriodMonths: number;
    };
    project?: {
      finishDate: string;
      id: number;
      startDate: string;
    };
  };
}

interface ITeoExpensesItemMonth {
  period: string;
  value: number;
}
interface ITeoExpensesItem {
  item: {
    id: string;
    name: string;
  };
  months: ITeoExpensesItemMonth[];
}
export interface ITeoExpensesResult {
  capex: ITeoExpensesItem[];
  opex: ITeoExpensesItem[];
}

export interface IEffectExpenses {
  expenses: {
    item: {
      id: string;
      name: string;
    };
    months: {
      asIs: number;
      toBe: number;
      period: number;
      year: number;
    }[];
  }[];
}

export type EffectItem = {
  id: number;
  item: {
    id: string;
    name: string;
    type: string;
    cashflowType: string;
  };
  nameInTeo: string;
  tooltip: string;
  visible: boolean;
  children?: {
    id: number;
    item: {
      id: string;
      name: string;
      type: string;
      cashflowType: string;
    };
    nameInTeo: string;
    tooltip: string;
    visible: boolean;
  }[];
};

export interface IEffectItems {
  single: EffectItem[];
  costPrice: EffectItem[];
  grossIncome: EffectItem[];
  operatingCosts: EffectItem[];
  capex: EffectItem[];
}

export enum TeoSteps {
  Settings = 'Settings',
  ProjectExpenses = 'ProjectExpenses',
  PostProjectExpenses = 'PostProjectExpenses',
  EconomicalEffect = 'EconomicalEffect',
  Verification = 'Verification',
}

export type TeoExpensesValue = {
  value: number;
  period: string;
  teoId?: number;
  itemId: string;
};

export type TeoImpactPnLValue = {
  asIs: number;
  toBe: number;
  period: string;
  teoId?: number;
  itemId: string;
};

export interface IStep {
  name: keyof typeof TeoSteps;
  title: string;
}

export type TeoCashflowItem = {
  id: number;
  visible: boolean;
  item: {
    id: string;
    name: string;
  };
};

export type GroupedTeoCashflowItems = {
  capex: TeoCashflowItem[];
  opex: TeoCashflowItem[];
};
