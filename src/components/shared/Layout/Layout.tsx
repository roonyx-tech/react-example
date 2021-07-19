import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';

import { Chevron } from '../svg/Chevron';
import { Switch } from '../htmlElements/Switch';
import { pages } from '../../../const';
import { AuthContext } from '../AuthContext/AuthContext';
import { Permission } from '../../../interfaces';
import sessionStorage from '../../../sessionStorage';
import usePreviousLocationHook from '../../../hooks/usePreviousLocationHook';
import keycloak from '../../../services/keycloak';
import s from './index.module.scss';

interface ILayout {
  children: React.ReactNode;
  pageTitle: string | React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children, pageTitle }: ILayout): JSX.Element => {
  const location = useLocation();
  const match = useRouteMatch();

  const prevLocation = usePreviousLocationHook(location.pathname);
  const dashboardIsActive =
    location.pathname === pages.dashboard ||
    ([pages.newProject, pages.projectCard].includes(location.pathname) && prevLocation === pages.dashboard);

  const [menuIsOpen, setMenuState] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [whiteTheme, setThemeState] = useState(true);

  const { account } = useContext(AuthContext);

  const logout = () => {
    keycloak.logout();
    sessionStorage.clear();
  };

  useEffect(() => {
    if (match.path === pages.projectCard) {
      const pageTitle = window.document.getElementById('page-title')!;
      const pageLayout = window.document.getElementById('layout-wrapper')!;
      pageTitle.style.paddingTop = '84px';
      pageLayout.style.paddingRight = '24px';
    } else {
      const pageTitle = window.document.getElementById('page-title')!;
      pageTitle.style.paddingTop = '36px';
    }
  }, [location]);

  const hasAdminPermissions = account?.permissions.some((permission) =>
    [Permission.adminRead, Permission.adminWrite].includes(permission)
  );

  return (
    <div className={`${whiteTheme ? s.lightTheme : s.darkTheme} ${s.wrapper}`}>
      <div className={s.menu}>
        <div className={s.group}>
          <img src="/img/vector.png" alt="vector" className={s.logo} />

          <NavLink to={pages.home} activeClassName={s.activeNavLink} className={s.item}>
            <img
              src={`${whiteTheme ? '/img/welcome-page-icon.svg' : '/img/welcome-page-icon.svg'}`}
              alt="Стартовая страница"
            />
          </NavLink>

          {hasAdminPermissions && (
            <NavLink
              to={pages.teoCreator}
              isActive={() => dashboardIsActive}
              activeClassName={s.activeNavLink}
              className={s.item}
            >
              <img src={`${whiteTheme ? '/img/pie-black.png' : '/img/donut-white.png'}`} alt="Сводная информация" />
            </NavLink>
          )}
        </div>
        <div className={s.group}>
          <a href="#" className={s.item}>
            <img src="/img/question.svg" alt="Информация" />
          </a>
          <a href="#" className={s.item}>
            <img src="/img/telegram.svg" alt="Телеграм" />
          </a>
        </div>
      </div>
      <div className={s.contentWrapper} id="layout-wrapper">
        <div className={s.top}>
          <div className={s.title} id="page-title">
            {typeof pageTitle === 'string' ? <h2>{pageTitle}</h2> : pageTitle}
          </div>
          <div className={s.user}>
            <div className={s.info}>
              <p>{`${account?.firstName} ${account?.lastName}`}</p>
            </div>
            <img src="http://placehold.it/48x48" alt="avatar" />
            <div className={s.schevronWrapper} onClick={() => setMenuState(!menuIsOpen)}>
              <Chevron down={menuIsOpen} />
            </div>
            {menuIsOpen && (
              <div className={s.rightMenu}>
                <div>
                  <span className={s.link} onClick={logout}>
                    Выход
                  </span>
                </div>
                <div>
                  <NavLink to={pages.home}>
                    <span className={s.link}>О системе</span>
                  </NavLink>
                </div>
                <div className={s.switch}>
                  <span>Светлая тема</span>
                  <Switch disabled={true} checked={true} onChange={() => undefined} />
                </div>
              </div>
            )}
          </div>
        </div>
        {children}
        {whiteTheme}
      </div>
    </div>
  );
};
