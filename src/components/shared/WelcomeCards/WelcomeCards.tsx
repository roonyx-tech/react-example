import React from 'react';

import { CardLink } from '../CardLink';

import { ICardsInfo } from '../../pages/about/consts';

import { Project } from '../../pages/about/typings';

import styles from './WelcomeCards.module.scss';

interface IWelcomeCardsProps {
  cardsInfo: ICardsInfo[];
  projectsList?: Project[];

  onPopupOpen?: (tag: string) => void;
}

export const WelcomeCards: React.FC<IWelcomeCardsProps> = React.memo((props) => {
  const { cardsInfo, projectsList, onPopupOpen } = props;

  return (
    <div className={styles.welcomeCards}>
      {cardsInfo.map((card, index) => (
        <CardLink
          key={index}
          title={card.title}
          path={card.path}
          imageUrl={card.imageUrl}
          projectsList={projectsList}
          onPopupOpen={onPopupOpen}
          tag={card.tag}
          tab={card.tab}
        />
      ))}
    </div>
  );
});
