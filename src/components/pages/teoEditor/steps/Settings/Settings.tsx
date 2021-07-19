import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

import { Input } from '~/components/shared/Input';
import { ISettings } from './types';
import { Button } from '~/components/shared/Button';

import s from './styles.module.scss';

interface ISettingsProps {
  settings: ISettings;
  onSettingChange: (settings: ISettings) => void;
}

export const Settings: React.FC<ISettingsProps> = ({ settings, onSettingChange }): JSX.Element => {
  const [changedTeoSettings, setChangedTeoSettings] = useState<ISettings>(settings);
  const [openOverlimitWarning, setOpenOverlimitWarning] = useState<boolean>(false);

  const defaultValue = 60;

  useEffect(() => {
    setChangedTeoSettings(settings);
  }, [settings]);

  const parse = (value: any): number => {
    let parsed = defaultValue;
    const type = typeof value;
    if (type === 'number') {
      parsed = value;
    } else if (type === 'string') {
      parsed = +value.replace(/\s/, '');
      if (parsed !== parsed) parsed = defaultValue;
    }
    return parsed;
  };

  const onBlur = (e: React.FocusEvent, field: keyof ISettings) => {
    let value = parse((e.target as any).value);
    if (value <= 0) {
      value = defaultValue;
      setOpenOverlimitWarning(true);
    }
    setChangedTeoSettings((old) => ({ ...old, [field]: value }));
    onSettingChange({ ...changedTeoSettings, [field]: value });
  };

  const onFocus = (field: keyof ISettings) => {
    if (changedTeoSettings[field] === 0) setChangedTeoSettings((old) => ({ ...old, [field]: '' }));
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.container}>
          <h3>
            <strong>Проверьте корректность заполнения Инвестиционного периода и Срока полезного использования</strong>
          </h3>
          <h4>Если даты указаны правильно, нажмите кнопку “Далее”. При необходимости измените даты.</h4>
          <div className={s.inputsWrapper}>
            <div className={s.inputWrapper}>
              <span>Инвестиционный период (мес.)</span>
              <Input
                type="number"
                value={changedTeoSettings.investmentPeriodMonths}
                onFocus={() => onFocus('investmentPeriodMonths')}
                onChange={(data) => setChangedTeoSettings((old) => ({ ...old, investmentPeriodMonths: data }))}
                style={{ boxSizing: 'border-box', width: '300px' }}
                onBlur={(e) => onBlur(e, 'investmentPeriodMonths')}
                min={1}
              />
            </div>

            <div className={s.inputWrapper}>
              <span>Срок полезного использования (мес.)</span>
              <Input
                type="number"
                value={changedTeoSettings.usefulLifeMonths}
                onFocus={() => onFocus('usefulLifeMonths')}
                onChange={(data) => setChangedTeoSettings((old) => ({ ...old, usefulLifeMonths: data }))}
                style={{ boxSizing: 'border-box', width: '300px' }}
                onBlur={(e) => onBlur(e, 'usefulLifeMonths')}
                min={1}
              />
            </div>
          </div>
        </div>
      </div>
      <Popup
        open={openOverlimitWarning}
        onClose={() => setOpenOverlimitWarning(false)}
        contentStyle={{
          width: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: '0 0 20px', fontWeight: 'lighter' }}>
          Значение данного поля не может равняться
          <br />
          нулю или быть отрицательным!
        </h2>
        <Button type="primary" onClick={() => setOpenOverlimitWarning(false)}>
          Ок
        </Button>
      </Popup>
    </>
  );
};
