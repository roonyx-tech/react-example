const projectsLoading = 'Произошла ошибка загрузки проектов. [01]';
const indicatorsLoading = 'Произошла ошибка загрузки проектов. [02]';
const indicatorsByDirectoratesLoading = 'Произошла ошибка загрузки проектов. [03]';
const metricsLoading = 'Произошла ошибка загрузки проектов. [04]';
const projectCreation = 'Произошла ошибка при редактировании проекта. Пожалуйста, повторите попытку позже [05]';
const projectUpdating = 'Произошла ошибка при редактировании проекта. Пожалуйста, повторите попытку позже [06]';
const forecastUpdating = 'Произошла ошибка при редактировании прогноза. Пожалуйста, повторите попытку позже [07]';
const userCreation = 'Произошла ошибка при создании пользователя. Пожалуйста, повторите попытку позже [08]';
const userDeleting = 'Произошла ошибка при редактировании пользователя. Пожалуйста, повторите попытку позже [09]';
const fileLoading = 'Произошла ошибка при загрузке файла. Пожалуйста, повторите попытку позже [10]';
const dashboardFilterLoading = 'Произошла ошибка фильтра [11]';
const projectFilterLoading = 'Произошла ошибка фильтра [12]';
const managerFilterLoading = 'Произошла ошибка фильтра [13]';
const tagCreation = 'Произошла ошибка при создании тэга [14]';
const pnlUpdating = 'Произошла ошибка при обновлении дерева записей [15]';
const teoParamsUpdating = 'Произошла ошибка при обновлении параметров ТЭО [16]';
const waccParamsUpdating = 'Произошла ошибка при обновлении параметров WACC [17]';
const commentCreation = 'Произошла ошибка при добавлении комментария. Пожалуйста, повторите попытку позже [18]';
const portfolioCreation = 'Произошла ошибка при создании портфеля [19]';
const deleteInitiative = 'Произошла ошибка при удалении инициативы [20]';
const updateTeoParams = 'Произошла ошибка при сохранении параметров ТЭО [21]';
const downloadTeoPPTX = 'Произошла ошибка при выгрузке ТЭО свода [22]';
const capexSaving = 'Произошла ошибка при сохранении данных Capex [23]';
const opexSaving = 'Произошла ошибка при сохранении данных Opex [24]';
const emptyNameInTeo = 'Остались незаполненные имена в ТЭО [25]';
const emptyTeoGroup = 'Остались незаполненные групы ТЭО [26]';
const downloadKPI = 'Произошла ошибка при выгрузке КПЭ[27]';
const updateTeoView = 'Произошла ошибка при изменении отображения ТЭО [28]';

export const dashboardErrors: Record<string, string> = {
  projectsLoading,
  indicatorsLoading,
  indicatorsByDirectoratesLoading,
  metricsLoading,
  dashboardFilterLoading,
  projectFilterLoading,
  managerFilterLoading,
};

export const projectCardErrors: Record<string, string> = {
  projectCreation,
  projectUpdating,
  forecastUpdating,
  tagCreation,
  commentCreation,
  portfolioCreation,
  deleteInitiative,
};

export const userErrors: Record<string, string> = {
  userCreation,
  userDeleting,
};

export const analyticsErrors: Record<string, string> = {
  fileLoading,
};

export const teoSettingsErrors: Record<string, string> = {
  pnlUpdating,
  teoParamsUpdating,
  waccParamsUpdating,
  emptyNameInTeo,
  emptyTeoGroup,
};

export const teoErrors: Record<string, string> = {
  updateTeoParams,
  downloadTeoPPTX,
  capexSaving,
  opexSaving,
  updateTeoView,
};

export const kpiErrors: Record<string, string> = {
  downloadKPI,
};

export const opexErrors: Record<string, string> = {
  fileLoading,
};
