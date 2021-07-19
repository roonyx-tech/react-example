interface SapProject {
  code: string;
}

export interface Project {
  id: number;
  name: string;
  sapProject?: SapProject;
}

export interface SelectOptions {
  value: number;
  label: string;
}

export enum Roles {
  Other = 'other',
  PlanningManager = 'planningManager',
  InvestAnalyst = 'investAnalyst',
  Admin = 'admin',
}

export type ActiveCard = 'forecast' | 'teo' | null;
