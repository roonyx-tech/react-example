import React from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import classNames from 'classnames';

import { Project } from '../../pages/about/typings';

import styles from './CardLink.module.scss';

interface ICardLinkProps {
  title: string;
  path: string;
  imageUrl?: string;
  projectsList?: Project[];
  tag?: string;
  tab?: string;

  onPopupOpen?: (tag: string) => void;
}

const warningMessage = 'Вы не привязаны ни к одному из проектов / продуктов, как участник';

export const CardLink: React.FC<ICardLinkProps> = React.memo((props) => {
  const {
    title,
    path,
    imageUrl,
    projectsList,
    tag,
    tab = '',

    onPopupOpen = () => undefined,
  } = props;

  const history = useHistory();

  const projectListLength = projectsList?.length;
  const isCardDisable = projectListLength === 0 && tag;

  const handleClick = () => {
    // !tag means card has just path without select
    if (!tag || projectListLength === 1) {
      const projectId = tag && projectsList ? `${projectsList[0].id}` : '';
      const pathname = generatePath(path, { projectId, tab });

      history.push({ pathname });

      return;
    }

    onPopupOpen(tag);
  };

  const cardLinkStyle = classNames(styles.cardLink, {
    [styles.cardLink_abled]: !isCardDisable,
    [styles.cardLink_disabled]: isCardDisable,
  });

  return (
    <div className={cardLinkStyle} onClick={handleClick}>
      <div className={styles.cardLinkContent} style={{ backgroundImage: `url(${imageUrl}` }}>
        <img
          className={styles.disabledImage}
          style={{ display: isCardDisable ? 'block' : 'none' }}
          src="/img/welcomePageImages/disabled-card.svg"
        />
        <p className={styles.title}>{title}</p>
        <div style={{ display: isCardDisable ? 'block' : 'none' }} className={styles.warningMessage}>
          <span className={styles.title}>Внимание</span>
          <p className={styles.message}>{warningMessage}</p>
        </div>
      </div>
    </div>
  );
});
