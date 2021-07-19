import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

import { IEffectItems, EffectItem } from '~/components/pages/teoEditor/types';
import { ArticleVisibility } from '../types';
import { Button } from '../../Button';
import { SearchField } from '../../htmlElements/SearchField';
import { Branch } from './Branch';
import { Block } from './Block';
import s from './index.module.scss';

type FormBlock = {
  type: string;
  title: string;
};

const blocks: FormBlock[] = [
  {
    type: 'costPrice',
    title: 'Себестоимость',
  },
  {
    type: 'grossIncome',
    title: 'Валовый доход',
  },
  {
    type: 'operatingCosts',
    title: 'Операционные расходы',
  },
  {
    type: 'capex',
    title: 'Капитализируемые расходы',
  },
];

type FormBlockOpenInfo = Record<string, boolean>;

interface IEffectArticlesEditor {
  onEdit: (items: ArticleVisibility[]) => void;
  articles: IEffectItems;
}

export const EffectArticlesEditor: React.FC<IEffectArticlesEditor> = ({ onEdit, articles }: IEffectArticlesEditor) => {
  const [open, setOpen] = useState(false);
  const [editedArticles, setEditedArticles] = useState<ArticleVisibility[]>([]);
  const [tooltipsOpen, setTooltipsOpen] = useState<{ id: number; open: boolean; top?: number; left?: number }[]>([]);
  const [articleOpen, setArticleOpen] = useState<FormBlockOpenInfo>({
    costPrice: false,
    grossIncome: false,
    operatingCosts: false,
    capex: false,
  });
  const [searchValue, setSearchValue] = useState<string>('');

  const closePopup = () => {
    setOpen(false);
    setEditedArticles([]);
  };

  const addEditedArticle = (id: number, visible: boolean) => {
    setEditedArticles((old) => [...old, { id, visible }]);
  };

  const removeEditedArticle = (id: number) => {
    setEditedArticles((old) => old.filter((article) => article.id !== id));
  };

  useEffect(() => {
    const newOpenInfo = { ...articleOpen };
    for (const key in newOpenInfo) newOpenInfo[key] = Boolean(searchValue);
    setArticleOpen(newOpenInfo);
  }, [searchValue]);

  const handleBranchChange = (item: EffectItem, status: boolean) => {
    if (status !== item.visible) addEditedArticle(item.id, status);
    else removeEditedArticle(item.id);
    if (item.children) {
      item.children.forEach((child) => {
        if (child.visible) addEditedArticle(child.id, false);
        else removeEditedArticle(child.id);
      });
    }
  };

  const onSave = () => {
    onEdit(editedArticles);
    closePopup();
  };

  return (
    <>
      <div className={s.buttonContainer}>
        <Button onClick={() => setOpen(!open)}>
          <span>Добавить / удалить статьи</span>
        </Button>
      </div>
      {articles && (
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
            value={searchValue}
            onChange={(val) => setSearchValue(val)}
            style={{
              height: '40px',
              fontSize: '16px',
              border: '1px solid #e1e5eb',
              borderRadius: '6px',
            }}
          />
          <div className={s.scrollContainer}>
            {articles.single
              .filter((elem: EffectItem) => elem.nameInTeo.toLowerCase().includes(searchValue.toLowerCase()))
              .map((elem: EffectItem, index: number) => (
                <Branch
                  key={`single-${index}`}
                  data={elem}
                  shiftIndex={0}
                  type={`single-${index}`}
                  selectedItems={editedArticles}
                  tooltipsOpen={tooltipsOpen}
                  onTooltipsOpen={(item) => setTooltipsOpen((old) => [...old.filter((i) => item.id !== i.id), item])}
                  onChange={handleBranchChange}
                />
              ))}

            {blocks.map(({ type, title }) => (
              <Block
                key={type}
                type={type}
                title={title}
                isOpen={articleOpen[type]}
                onOpen={() => setArticleOpen({ ...articleOpen, [type]: !articleOpen[type] })}
              >
                {articles[type as keyof IEffectItems]
                  .filter((elem: EffectItem) => elem.nameInTeo.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((elem: EffectItem, i: number) => (
                    <Branch
                      key={`${type}-${i}`}
                      data={elem}
                      shiftIndex={0}
                      type={`${type}-${i}`}
                      selectedItems={editedArticles}
                      tooltipsOpen={tooltipsOpen}
                      onTooltipsOpen={(item) =>
                        setTooltipsOpen((old) => [...old.filter((i) => item.id !== i.id), item])
                      }
                      onChange={handleBranchChange}
                    />
                  ))}
              </Block>
            ))}
          </div>
          <div className={s.buttonContainer}>
            <Button type="primary" onClick={onSave}>
              Сохранить
            </Button>
            <Button type="outline" onClick={closePopup}>
              Отмена
            </Button>
          </div>
        </Popup>
      )}
    </>
  );
};
