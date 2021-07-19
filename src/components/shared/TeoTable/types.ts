export type OnCellChangeFunc = (value: any, id: any, year: number, month?: number) => void;

export type TeoEditorArticle = {
  id: string;
  name: string;
  tooltip?: string;
  type?: string;
};

export type CellValue = {
  value: number;
  year: number;
  month: number;
};

export type DoubleCellValue = {
  asIs: number;
  toBe: number;
  year: number;
  month: number;
};

export type ActiveCell = {
  year: number;
  month: number;
  extraInfo?: any;
};

export type ArticleVisibility = {
  id: number;
  visible: boolean;
};

export interface IColumnInfo {
  year: number;
  month?: number;
  print?: string | JSX.Element;
  extraInfo?: any;
  disabled?: boolean;
}

export type TeoImpactPnLItemVisibility = {
  id: number;
  item: {
    id: number;
    name: string;
    type: 'SPP' | 'PNL';
    cashflowType: 'COST' | 'INCOME';
  };
  nameInTeo: string;
  visible: true;
  tooltip?: string;
  children?: TeoImpactPnLItemVisibility[];
};
