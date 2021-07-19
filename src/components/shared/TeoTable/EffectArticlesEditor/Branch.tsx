import React, { Fragment } from 'react';

import { EffectItem } from '~/components/pages/teoEditor/types';
import { Tooltip } from '../../htmlElements/Tooltip';
import s from './index.module.scss';

interface IBranch {
  data: EffectItem;
  shiftIndex: number;
  type: string;
  disabled?: boolean;
  onChange(itemId: EffectItem, status: boolean): void;
  isSelected?: boolean;
  selectedItems: { id: number; visible: boolean }[];
  tooltipsOpen: { id: number; open: boolean; top?: number; left?: number }[];
  onTooltipsOpen(items: { id: number; open: boolean; top?: number; left?: number }): void;
}

export const Branch: React.FC<IBranch> = ({
  data,
  shiftIndex,
  type,
  disabled,
  selectedItems,
  onChange,
  onTooltipsOpen,
  tooltipsOpen,
}) => {
  const currentItem = selectedItems.find((item) => item.id === data.id);

  return (
    <Fragment key={`branch-${shiftIndex}-${type}`}>
      <div className={`${s.line} ${s[`shift-${shiftIndex}`]}`}>
        <input
          type="checkbox"
          className={s.checkbox}
          onChange={(e) => {
            onChange(data, e.target.checked);
          }}
          checked={currentItem ? currentItem.visible : data.visible}
          disabled={disabled}
        />
        <span className={s.name}>{data.nameInTeo}</span>
        {data.tooltip && (
          <>
            <img
              id={data.id.toString()}
              src="/img/tooltip.svg"
              alt="tooltip"
              onMouseOver={() => {
                const coords = {
                  top: (document.getElementById(data.id.toString())?.getBoundingClientRect().top || 0) - 60,
                  left: (document.getElementById(data.id.toString())?.getBoundingClientRect().left || 0) + 30,
                };
                onTooltipsOpen({ id: data.id, open: true, top: coords.top, left: coords.left });
              }}
              onMouseOut={() => {
                onTooltipsOpen({ id: data.id, open: false });
              }}
            />
            <Tooltip
              show={tooltipsOpen.find((elem) => elem.id === data.id)?.open || false}
              blockStyles={{
                width: '200px',
                left: `${tooltipsOpen.find((elem) => elem.id === data.id)?.left}px`,
                top: `${tooltipsOpen.find((elem) => elem.id === data.id)?.top}px`,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 14, color: '#ffffff' }}>{data.tooltip || ''}</h2>
            </Tooltip>
          </>
        )}
      </div>
      {data.children &&
        data.children.map((item, i) => (
          <Branch
            key={`branch-${shiftIndex}-${type}-${i}`}
            data={item}
            shiftIndex={1}
            type={`${type}-${i}`}
            onChange={(item, status) => onChange(item, status)}
            onTooltipsOpen={(items) => onTooltipsOpen(items)}
            tooltipsOpen={tooltipsOpen}
            selectedItems={selectedItems}
            disabled={currentItem ? currentItem.visible : data.visible}
          />
        ))}
    </Fragment>
  );
};
