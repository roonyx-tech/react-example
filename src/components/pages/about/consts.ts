import { pages } from '../../../const';

export const commonCards = [
  {
    title: 'Cоздать новую инициативу',
    path: pages.newProject,
    imageUrl: '/img/welcomePageImages/new-initiative-card.svg',
  },
  {
    title: 'Обновить прогноз инициативы',
    path: pages.projectCard,
    imageUrl: '/img/welcomePageImages/initiative-forecast-card.svg',
    tag: 'forecast',
    tab: 'costs',
  },
  {
    title: 'Создать ТЭО',
    path: pages.projectCard,
    imageUrl: '/img/welcomePageImages/teo-card.svg',
    tag: 'teo',
    tab: 'teo',
  },
  {
    title: 'Посмотреть сводный бюджет',
    path: pages.dashboard,
    imageUrl: '/img/welcomePageImages/consolidated-budget-card.svg',
  },
];

export const planningManagerCards = [
  {
    title: 'Посмотреть аналитику',
    path: pages.analytics,
    imageUrl: '/img/welcomePageImages/analytics-card.svg',
  },
];

export const investAnalystCards = [
  {
    title: 'Настроить ТЭО',
    path: pages.teoSettings,
    imageUrl: '/img/welcomePageImages/teo-settings.svg',
  },
];

export const adminCards = [
  {
    title: 'Список пользователей',
    path: pages.users,
    imageUrl: '/img/welcomePageImages/users-list-card.svg',
  },
];

export const FAQcard = {
  title: 'FAQ',
  path: pages.faq,
  imageUrl: '/img/welcomePageImages/faq-card.svg',
};

export interface ICardsInfo {
  title: string;
  path: string;
  imageUrl: string;
  tag?: string;
  tab?: string;
}
