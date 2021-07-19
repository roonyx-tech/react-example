import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import cn from 'classnames';

import { TeoCashflowItem, GroupedTeoCashflowItems } from '~/components/pages/teoEditor/types';
import { ArticleVisibility } from '../types';
import { Button } from '../../Button';
import { SearchField } from '../../htmlElements/SearchField';
import s from './styles.module.scss';

const sortPred = (a: TeoCashflowItem, b: TeoCashflowItem) => (a.item.name < b.item.name ? -1 : 1);

const filterPred = (article: TeoCashflowItem, searchValue: string) =>
  article.item.name.toLowerCase().includes(searchValue.toLowerCase());

interface IArticlesEditor {
  onEdit: (items: ArticleVisibility[]) => void;
  articles: GroupedTeoCashflowItems;
}

export const ArticlesEditor: React.FC<IArticlesEditor> = ({ onEdit, articles }: IArticlesEditor): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [editedArticles, setEditedArticles] = useState<ArticleVisibility[]>([]);
  const [search, setSearch] = useState<string>('');

  const closePopup = () => {
    setOpen(false);
    setEditedArticles([]);
  };

  const save = () => {
    onEdit(editedArticles);
    closePopup();
  };

  const addToEditedArticle = (id: number, visible: boolean) => {
    setEditedArticles([...editedArticles, { id, visible }]);
  };

  const removeFromEditedArticle = (id: number) => {
    setEditedArticles(editedArticles.filter((article) => article.id !== id));
  };

  return (
    <>
      <div className={s.buttonContainer}>
        <Button onClick={() => setOpen(!open)}>
          <span>Добавить / удалить статьи</span>
        </Button>
      </div>

      <Popup
        open={open}
        onClose={closePopup}
        contentStyle={{ width: 'fit-content', height: 'fit-content' }}
        modal={true}
        lockScroll={false}
      >
        <h2>Добавление статей</h2>
        <h4>
          Вы можете добавить еще статьи для указания расходов <br />
          по проекту
        </h4>
        <SearchField
          value={search}
          onChange={setSearch}
          style={{
            height: '40px',
            fontSize: '16px',
            border: '1px solid #e1e5eb',
            borderRadius: '6px',
          }}
        />
        <div className={s.scrollContainer}>
          <ArticlesGroup
            title="Капитализируемые расходы"
            articles={articles.capex}
            addToEditedArticles={addToEditedArticle}
            removeFromEditedArticles={removeFromEditedArticle}
            search={search}
          />
          <ArticlesGroup
            title="Операционные расходы"
            articles={articles.opex}
            addToEditedArticles={addToEditedArticle}
            removeFromEditedArticles={removeFromEditedArticle}
            search={search}
          />
        </div>
        <div className={s.buttonContainer}>
          <div className={cn(s.buttonSave, s.button)} onClick={save}>
            <span>Сохранить</span>
          </div>
          <div className={cn(s.buttonCancel, s.button)} onClick={closePopup}>
            <span>Отменить</span>
          </div>
        </div>
      </Popup>
    </>
  );
};

interface IArticlesGroup {
  articles: TeoCashflowItem[];
  addToEditedArticles: (id: number, visible: boolean) => void;
  removeFromEditedArticles: (id: number) => void;
  search: string;
  title: string;
}

export const ArticlesGroup: React.FC<IArticlesGroup> = ({
  articles,
  addToEditedArticles,
  removeFromEditedArticles,
  search,
  title,
}: IArticlesGroup): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={s.block}>
      <div className={s.blockTitle} onClick={() => setOpen(!open)}>
        <img src={`/img/chevron-${open ? 'up' : 'down'}.svg`} alt="" />
        <h3>{title}</h3>
      </div>
      <div className={s.article}>
        {articles
          .filter((article) => filterPred(article, search))
          .sort(sortPred)
          .map((article: TeoCashflowItem) => (
            <div className={s.line} key={article.id}>
              <input
                type="checkbox"
                className={s.checkbox}
                onChange={(e) =>
                  e.target.checked !== article.visible
                    ? addToEditedArticles(article.id, e.target.checked)
                    : removeFromEditedArticles(article.id)
                }
                defaultChecked={article.visible}
              />
              <span className={s.name}>{article.item.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
