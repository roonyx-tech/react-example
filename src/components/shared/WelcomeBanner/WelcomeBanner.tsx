import React from 'react';

import { Button } from '../Button';

import styles from './WelcomeBanner.module.scss';

const instructionLink = 'https://wiki.x5.ru/display/BDPP/Finportal+Help';

const bannerTitle = 'Посмотрите инструкции по функционалу системы';
const firstParagraph =
  'Мы постоянно совершенствуем свой продукт, добавляем новый функционал, поддерживаем его стабильность и соответствие вашим потребностям.';
const secondParagraph =
  'Что бы вам было проще начать работать с системой, мы написали инструкцию и сделали обучающие видео';

export const WelcomeBanner = React.memo(() => {
  return (
    <div className={styles.main}>
      <div className={styles.bannerInfo}>
        <h3 className={styles.title}>{bannerTitle}</h3>
        <p className={styles.muted}>{firstParagraph}</p>
        <p className={styles.muted}>
          {secondParagraph}
          <i>(будут добавлены позднее).</i>
        </p>
        <Button type="outline" className={styles.bannerAppButton}>
          <a className={styles.link} href={instructionLink} target="_blank">
            Посмотреть инструкции
          </a>
        </Button>
      </div>
      <img src="/img/welcomePageImages/welcome.svg" alt="Добро пожаловать" />
    </div>
  );
});
