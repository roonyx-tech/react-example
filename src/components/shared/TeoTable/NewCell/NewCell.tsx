import React, { useEffect, useState, useRef } from 'react';

import { Input } from '~/components/shared/Input';
import { ProposalHint } from '../../ProposalHint';
import { prettyNum, parseValue } from '~/functions';

import s from './styles.module.scss';

interface INewCell {
  value: number;
  save?: (value: number) => void;
  disabled?: boolean;
  mlnMode: boolean;
  isActive?: boolean;
  setActive?: (activate: boolean) => void;
  onKeyDown?: (keyCode: number, ctrlPressed: boolean, inputElement: HTMLInputElement) => void;
  showProposal?: boolean;
  setShowProposal?: (show: boolean) => void;
  setAllPeriodValue?: (value: number) => void;
  isLastActive?: boolean;
}

export const NewCell: React.FC<INewCell> = ({
  value,
  save,
  mlnMode,
  disabled,
  setActive,
  isActive = false,
  onKeyDown,
  showProposal,
  setShowProposal,
  setAllPeriodValue,
  isLastActive,
}: INewCell): JSX.Element => {
  const [editedValue, setEditedValue] = useState<string | null>(null);
  const inputValue = editedValue !== null ? editedValue : prettyNum(value, mlnMode);
  const inputWrapper = useRef(null);

  const getInput = () => (inputWrapper.current as any).getElementsByTagName('input')[0];

  useEffect(() => {
    if (isActive) {
      const input = getInput();
      input.focus();
    }
  }, [isActive]);

  useEffect(() => {
    setEditedValue(null);
  }, [value]);

  const onFocus = () => {
    // console.log('onFocus', inputValue, editedValue, value);
    inputValue === '0' && setEditedValue('');
    isActive || (setActive && setActive(true));
  };

  const onBlur = () => {
    const valueToSave = editedValue !== null ? parseValue(editedValue, mlnMode) : value;
    setEditedValue(prettyNum(valueToSave, mlnMode));
    setActive && setActive(false);
    // console.log('onBlur:', value, valueToSave);
    if (save && valueToSave !== value) {
      save(valueToSave);
      // setEditedValue(null);
    }
  };

  const handleOnKeyDown = (keyCode: number, ctrlPressed?: boolean) => {
    const input = getInput();
    onKeyDown && onKeyDown(keyCode, Boolean(ctrlPressed), input);
  };

  return (
    <div className={s.inputWrapper} ref={inputWrapper}>
      <Input
        onChange={setEditedValue}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        value={inputValue}
        onKeyDown={(key, ctrlPressed) => handleOnKeyDown(key, ctrlPressed)}
      />
      {showProposal && (isActive || isLastActive) && (
        <ProposalHint
          text={`Проставить значение ${inputValue} до конца периода?`}
          onApprove={() => {
            if (setAllPeriodValue) {
              const valueToSave = editedValue !== null ? parseValue(editedValue, mlnMode) : value;
              setAllPeriodValue(valueToSave);
              setShowProposal && setShowProposal(false);
            }
          }}
          onReject={() => setShowProposal && setShowProposal(false)}
        />
      )}
    </div>
  );
};
