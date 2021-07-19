import React, { useState, forwardRef, useRef } from 'react';
import cn from 'classnames';

import s from './styles.module.scss';

interface IInputProps {
  type?: string;
  value?: string | number;
  onChange?: (data: string) => void;
  onClick?: () => void;
  onKeyUp?: (keyCode: number, ctrlPressed?: boolean) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onKeyDown?: (keyCode: number, ctrlPressed?: boolean) => void;
  onFocus?: (e: React.FocusEvent) => void;
  id?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
  defaultValue?: string | number;
  step?: number;
  placeholder?: string;
  intOnly?: boolean;
  maxLength?: number;
  max?: number;
  min?: number;
}

interface ICursorPositionState {
  start: number | null;
  end: number | null;
}
/**
 * Input component
 */
export const Input = forwardRef<HTMLInputElement, IInputProps>((props, forwardedRef) => {
  const {
    type = 'text',
    value,
    style,
    disabled = false,
    onClick,
    onKeyDown,
    onBlur,
    onFocus,
    id,
    className,
    defaultValue,
    step,
    placeholder,
    maxLength,
    max,
    min,
  } = props;

  const [cursorPosition, setCursorPosition] = useState<ICursorPositionState>({ start: null, end: null });
  const innerRef = useRef(null);
  const ref = (forwardedRef || innerRef) as React.MutableRefObject<HTMLInputElement | null>;

  const setCursor = () => {
    const inputEl = ref?.current;
    if (inputEl && type === 'text') {
      const { start, end } = cursorPosition;
      if (typeof start === 'number' && typeof end === 'number') {
        inputEl.setSelectionRange(start, end);
        setCursorPosition({
          start: null,
          end: null,
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart, selectionEnd } = e.target;
    const regexp = new RegExp(`^-?[0-9]*$`);
    setCursorPosition({
      start: selectionStart,
      end: selectionEnd,
    });
    if (props.intOnly && regexp.test(e.target.value) && props.onChange) {
      props.onChange(value);
    } else if (!props.intOnly && props.onChange) {
      props.onChange(value);
    }
  };

  const handleKeyUp = (e: any) => {
    const { onKeyUp } = props;
    onKeyUp && onKeyUp(e.keyCode, e.ctrlKey);
    setCursor();
  };

  return (
    <input
      ref={ref}
      className={cn(s.input, className)}
      id={id}
      maxLength={maxLength}
      style={style}
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      onClick={onClick}
      disabled={disabled}
      onKeyUp={handleKeyUp}
      onKeyDown={(e) => onKeyDown && onKeyDown(e.keyCode, e.ctrlKey)}
      onFocus={onFocus}
      defaultValue={defaultValue}
      step={step}
      placeholder={placeholder}
      max={max}
      min={min}
    />
  );
});
