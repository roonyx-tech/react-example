const prefix = 'x5Fin_';

export const fields: Record<string, string> = {
  dates: 'filter_dates',
  projects: 'filter_projects_new',
  managers: 'filter_managers_new',
  tags: 'filter_tags',
  directorates: 'filter_directorates',
  budget: 'filter_budget',
  status: 'filter_status',
  year: 'filter_year',
  kinds: 'filter_kinds',
  statuses: 'filter_statuses',
  portfolios: 'filter_portfolios',
  directoratesBK: 'filter_directorates_bk',
  sapCodes: 'sap_codes',
  capexGroups: 'capex_groups',
};

export default {
  load: (field: string, isSet = false): any => {
    const str = window.sessionStorage.getItem(`${prefix}${field}`);
    if (str) {
      if (isSet) return new Set(JSON.parse(str));
      return JSON.parse(str);
    }
  },
  save: (field: string, obj: unknown): void => {
    if (obj instanceof Set) {
      window.sessionStorage.setItem(`${prefix}${field}`, JSON.stringify([...obj]));
    } else {
      window.sessionStorage.setItem(`${prefix}${field}`, JSON.stringify(obj));
    }
  },
  clear: (): void => {
    Object.keys(fields).forEach((key: string) => {
      window.sessionStorage.removeItem(`${prefix}${fields[key]}`);
    });
  },
};
