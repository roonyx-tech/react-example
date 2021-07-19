import React, { useContext, useState, useMemo } from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { projectsFilterQuery } from '~/qraphql/queries';

import { Layout } from '~/components/shared/Layout';
import { WelcomeCards } from '~/components/shared/WelcomeCards';
import { WelcomeBanner } from '~/components/shared/WelcomeBanner';
import { PopupWithSelect } from '~/components/shared/PopupWithSelect';
import { AuthContext, Account } from '~/components/shared/AuthContext';

import { Roles } from '~/interfaces';
import { pages } from '~/const';
import { commonCards, planningManagerCards, investAnalystCards, adminCards, ICardsInfo, FAQcard } from './consts';
import { Project, SelectOptions, ActiveCard } from './typings';

import styles from './About.module.scss';

const getAccountRole = (roles: string[]): Roles => {
  // TODO: вынести в глобальную константу
  const isPlanningManager = roles.includes(Roles.PLANNING_MANAGER);
  const isInvestAnalyst = roles.includes(Roles.INVESTMENT_ANALYST);
  const isAdmin = roles.includes(Roles.ADMIN);
  const isProductManager = roles.includes(Roles.PRODUCT_MANAGER);

  // Order is important
  switch (true) {
    case isAdmin:
      return Roles.ADMIN;
    case isInvestAnalyst:
      return Roles.INVESTMENT_ANALYST;
    case isPlanningManager:
      return Roles.PLANNING_MANAGER;
    case isProductManager:
      return Roles.PRODUCT_MANAGER;
    default:
      return Roles.head_Office;
  }
};

// TODO: add to eslint rule to return function type
const getCardsInfo = (account: Account | null): ICardsInfo[] => {
  const roleCardsInfo: Record<string, ICardsInfo[]> = {
    // TODO: remove the particular of the faq-card
    head_Office: [...commonCards, FAQcard],
    PRODUCT_MANAGER: [...commonCards, FAQcard],
    PLANNING_MANAGER: [...commonCards, ...planningManagerCards, FAQcard],
    INVESTMENT_ANALYST: [...commonCards, ...planningManagerCards, ...investAnalystCards, FAQcard],
    ADMIN: [...commonCards, ...planningManagerCards, ...investAnalystCards, ...adminCards, FAQcard],
  };

  const accountRole = getAccountRole(account?.roles || []);

  return roleCardsInfo[accountRole];
};

export const Home: React.FC = () => {
  const { account } = useContext(AuthContext);
  const accountId = account?.id;

  const history = useHistory();

  const [choosenProjectId, setChoosenProjectId] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<ActiveCard>(null);

  const query = useQuery(projectsFilterQuery, {
    variables: {
      managerIds: [accountId],
    },
    fetchPolicy: 'network-only',
  });
  const projectsQueryResult = query.data;

  const { list: projectsList } = projectsQueryResult?.projects || [];
  const projectsListLength = projectsList?.length;

  const selectPopupTitle = activeCard === 'forecast' ? 'Обновить прогноз инициативы' : 'Создать ТЭО';
  const pathTab = activeCard === 'forecast' ? 'costs' : 'teo';

  const dropActiveCard = () => setActiveCard(null);

  const onPopupOpen = (tag: ActiveCard) => {
    setActiveCard(tag);
  };

  const onSendPopupHandler = () => {
    if (!choosenProjectId) {
      return;
    }

    const generatedPath = generatePath(pages.projectCard, { projectId: `${choosenProjectId}`, tab: pathTab });
    history.push(generatedPath);
  };

  const isSelectPopupOpen = !!activeCard && projectsListLength > 1;

  const selectOptions: SelectOptions[] = useMemo(() => {
    return projectsList?.map((project: Project) => {
      const sapProjectCode = project?.sapProject?.code;
      const projectName = sapProjectCode ? `${sapProjectCode} — ${project.name}` : project.name;

      return { value: project.id, label: projectName };
    });
  }, [projectsList]);

  return (
    <Layout pageTitle="Добро пожаловать на Финансовый портал">
      <div className={styles.welcomePageWrapper}>
        <WelcomeCards
          cardsInfo={getCardsInfo(account)}
          projectsList={projectsList}
          onPopupOpen={(tag) => onPopupOpen(tag as ActiveCard)}
        />
        <WelcomeBanner />
      </div>
      <PopupWithSelect<number>
        isPopupOpen={isSelectPopupOpen}
        title={selectPopupTitle}
        description="Выберите проект"
        options={selectOptions}
        sendButtonTitle="Перейти"
        onSelectChange={(optionValues) => {
          if (!optionValues?.value) {
            return;
          }

          setChoosenProjectId(optionValues.value);
        }}
        onClose={dropActiveCard}
        onSend={onSendPopupHandler}
      />
    </Layout>
  );
};
