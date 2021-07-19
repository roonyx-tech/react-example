import React, { useState } from 'react';

import Popup from 'reactjs-popup';
import Select, { ValueType } from 'react-select';

import { Button } from '../Button';

import styles from './PopupWithSelect.module.scss';

interface Option<T> {
  value: T;
  label: string;
}

interface IPopupWithSelectProps<T> {
  isPopupOpen: boolean;
  title: string;
  description: string;
  options: Option<T>[];
  sendButtonTitle?: string;
  isSendButtonDisable?: boolean;

  onClose?: (event?: React.MouseEvent) => void;
  onSend?: (event: React.MouseEvent) => void;
  onSelectChange?: (value: ValueType<Option<T>, false>) => void;
}

export const PopupWithSelect = <T,>(props: IPopupWithSelectProps<T>) => {
  const {
    isPopupOpen,
    title,
    description,
    options,
    sendButtonTitle = 'Отправить',

    onClose = () => undefined,
    onSend = () => undefined,
    onSelectChange = () => undefined,
  } = props;

  const [isSendButtonDisable, setIsSendButtonDisable] = useState<boolean>(true);

  return (
    <Popup
      open={isPopupOpen}
      onClose={() => {
        onClose();
        setIsSendButtonDisable(true);
      }}
      contentStyle={{ width: 'fit-content', height: 'fit-content', padding: 48, borderRadius: 24 }}
    >
      <div className={styles.popupContent}>
        <h2 className={styles.popupTitle}>{title}</h2>
        <p className={styles.popupDescription}>{description}</p>
        <Select
          placeholder="Выбрать"
          options={options}
          isSearchable
          onChange={(event) => {
            onSelectChange(event);
            if (isSendButtonDisable) setIsSendButtonDisable(false);
          }}
        />

        <div className={styles.buttons}>
          <Button isDisable={isSendButtonDisable} onClick={onSend} className={styles.leftButton} type="primary">
            {sendButtonTitle}
          </Button>
          <Button onClick={onClose} type="outline">
            Отменить
          </Button>
        </div>
      </div>
    </Popup>
  );
};
