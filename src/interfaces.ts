import { Company } from './const';

export type Id = number | string;

export enum Permission {
  adminWrite = 'admin.write',
  adminRead = 'admin.read',
  forecastAnalytics = 'reports.forecast-analytics',
  dashboard = 'dashboard',
  teoAgreed = 'teo.agreed',
  teoSettings = 'teo-settings',
  indicatorsAgreed = 'indicators.agreed',
  rollUpCorpus = 'teo.roll-up-corpus',
  extendedIndicators = 'projects.extended-indicators',
  directoratesBK = 'directorates-bk',
  projectAllStatuses = 'projects.all-statuses',
}

export enum Size {
  sm,
  md,
  lg,
  mdCardProject,
}

export interface IEditable {
  [id: string]: number;
}

export interface IFormErrors {
  [field: string]: string;
}

export interface IOption {
  label: string;
  value: number;
}

export interface IProject {
  id: number;
  name: string;
  managers: IUser[];
  tags: ITag[];
  directorates: IDirectorate[];
  files: IFile[];
  sapProject: ISapProject;
  startDate: Date;
  finishDate: Date;
  createdDate?: Date;
  budget: number;
  fact: number;
  obligo: number;
  balance: number;
  forecast: number;
  economy: number;
  company?: Company;
  kind?: IKind;
  status?: IStatus;
  portfolio?: IPortfolio;
  permissions: {
    canEdit: boolean;
  };
  domain: IDomains[];
  approvalLevel: IDomains[];
  approvalDate: Date;
  effect: IDomains[];
  customerCategory: IDomains[];
  capexSubgroup: IDomains[];
  hasForecasts?: boolean;
}

export interface IKind {
  id: number;
  name: string;
}

export interface IStatus {
  id: number;
  name: string;
}

export interface IPortfolio {
  id: number;
  name: string;
}

export interface IDomains {
  id: number;
  name: string;
}

export interface ICustomerCategory {
  id: number;
  name: string;
  customer: {
    id: number;
    name: string;
  };
}

export interface ICapexSubgroups {
  id: number;
  name: string;
  capexGroup: {
    id: number;
    name: string;
  };
}

export interface IProjectMetrics {
  projectId: number;
  projectName?: string;
  budget: number;
  balance: number;
  fact: number;
  obligo: number;
  economy: number;
  forecast: number;
  outOfBudget: boolean;
}

export interface IProjectsMetrics {
  budget: number;
  balance: number;
  fact: number;
  obligo: number;
  economy: number;
  forecast: number;
  outOfBudget: number;
}

export interface IProjectWithMetrics {
  project: IProject;
  metrics: IProjectMetrics;
}

export interface IConsumptionChartInfo {
  month: string;
  fact: number;
  forecast: number;
  previousYearValue: number;
}

export interface ITagCardInfo {
  tag: number;
  tag_name: number | string;
  projects_count: number | string;
  out_of_budget: number | string;
  budget: number;
  fact: number;
  obligo: number;
  balance: number;
  economy: number;
  forecast: number;
}

export interface ISppChartInfo {
  project_id?: number;
  spp_id?: string;
  spp_group_id?: string | number;
  spp_group_name: string | number;
  spp_name?: string;
  spps?: any[];
  budget: number;
  fact: number;
  obligo: number;
  balance: number;
  forecast: number;
  economy: number;
}

export interface ISppChartItem {
  budget: {
    data: IEditable;
    sum: number;
  };
  fact: {
    data: IEditable;
    sum: number;
  };
}

export enum Roles {
  ADMIN = 'ADMIN',
  INVESTMENT_ANALYST = 'INVESTMENT_ANALYST',
  PLANNING_MANAGER = 'PLANNING_MANAGER',
  PRODUCT_MANAGER = 'PRODUCT_MANAGER',
  head_Office = 'head_Office',
}

export interface IUser {
  id: number;
  displayName: string;
  // roles: Array<keyof typeof Roles>;
  roles: string[];
  directorates: IDirectorateInfo[];
  portfolios: IPortfolioInfo[];
  domains: IDomainInfo[];
  login?: string;
  email?: string;
  position?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  staffId?: number;
}

export interface ITag {
  id: number;
  name: string;
}

export enum VisibilityType {
  ALL = 'ALL',
  OWNED = 'OWNED',
}
export interface IDirectorate {
  id: number;
  name: string;
  shortName?: string;
}

export interface IVisibilityItem {
  id: number;
  name: string;
  shortName?: string;
}
export interface IDirectorateInfo {
  directorateId: number;
  visibilityType: keyof typeof VisibilityType;
  canEdit: boolean;
  directorate: IVisibilityItem;
}

export interface IDomainInfo {
  domainId: number;
  visibilityType: keyof typeof VisibilityType;
  canEdit: boolean;
  domain: IVisibilityItem;
}

export interface IPortfolioInfo {
  portfolioId: number;
  visibilityType: keyof typeof VisibilityType;
  canEdit: boolean;
  portfolio: IVisibilityItem;
}

export interface ISapProject {
  code: string;
  name: string;
  planStart: number;
  planFinish: number;
}

export interface IForecastMonthData {
  forecastId?: number;
  forecast: number;
  fact: number;
  obligo?: number;
}

export interface IForecastYearData {
  year: number;
  directorateId?: number | null;
  months: IForecastMonthData[];
  forecastSum?: number;
  factSum?: number;
  obligoSum?: number;
}

export interface ISPP {
  id?: number | string;
  name: string;
  data?: IForecastYearData[];
}

export interface IForecastData {
  id?: string;
  forecastSPPGroupId?: number;
  name: string;
  countByArticles?: boolean;
  visible?: boolean;
  subtype?: 'CAPEX' | 'OPEX';
  data?: IForecastYearData[];
  SPP?: ISPP[];
}

export interface ISppVisualisationInfo {
  [id: string]: {
    visible: boolean;
    countByArticles: boolean;
  };
}

export interface IFile {
  uid: string;
  originalName: string;
  mimeType: string;
}

export interface IHistoryChange {
  id: number;
  message: string;
  code: string;
  fromValue: number | string | null;
  toValue: number | string | null;
}

export interface IHistoryItem {
  id: number;
  message: string;
  timestamp: string | Date;
  author: string;
  changes: IHistoryChange[];
}

export interface IForecastAnalyticsMonth {
  year: number;
  month: number;
  value: number;
}

export interface IForecastAnalytics {
  projectId: number;
  name: string;
  code: string;
  managers: IUser[];
  startDate: Date;
  finishDate: Date;
  directorateName: string;
  directorateId: number;
  months: IForecastAnalyticsMonth[];
  total: number;
  lastMonthForecast: number;
  updatedAt: Date | null;
  updatedBy: IUser;
}

export interface ICashflowItemForecastAnalytics {
  id: string;
  name: string;
  directorateName: string;
  months: IForecastAnalyticsMonth[];
  total: number;
  lastMonthForecast: number;
  updatedAt: Date;
  updatedBy: IUser;
  children: ICashflowItemForecastAnalytics[];
}

export type PnLItem = {
  id: string;
  name: string;
  cashflowType: string;
  active: boolean;
  visibleInTeoTotal: boolean;
  children: PnLItem[];
  parentId?: string;
  nameInTeo?: string;
  teoImpactPnLGroup?: 'SINGLE' | 'COST_PRICE' | 'GROSS_INCOME' | 'OPERATING_COSTS';
};

export enum CashFlowTranslation {
  INCOME = 'Доход',
  COST = 'Расход',
}

export type TeoParams = {
  defaultUsefulLifeMonths: number;
  defaultInvestmentPeriodMonths: number;
  taxRate?: number;
};

export type WaccParams = {
  year: number;
  wacc?: number;
};

export type Theme = {
  id: number;
  name: string;
  color: string;
};

export interface IComment {
  id: number;
  text: string;
  createdDate: Date;
  editingDate: Date;
  author: IUser;
  topic: Theme;
}

export interface IPeriod {
  start: Date | null;
  finish: Date | null;
}

export enum TeoItemTypeTranslation {
  SPP_GROUP = 'Capex',
  PNL = 'PnL',
}

export type ProjectTeoParams = {
  usefulLifeMonths: number;
  investmentPeriodMonths: number;
};

export interface IDirectorateProject {
  budget: number;
  forecast: number;
  id: number;
  name: string;
}

export interface IDirectorateBKIndicator {
  budget: number;
  dashboard_bk_id?: number;
  fact: number;
  forecast_initiatives: number;
  forecast_projects: number;
  name?: string;
  projects: IDirectorateProject[];
}

export interface ICardSvgProps {
  width?: number;
  height?: number;
  className?: string;
}

export interface IIconProps {
  className?: string;
}
