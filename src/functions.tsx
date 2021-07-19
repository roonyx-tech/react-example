import { useEffect, useState } from 'react';
import { IOption } from './interfaces';

export const extractDate = (date: Date | null | undefined): string =>
  date ? new Date(date).toLocaleDateString('ru') : '';

export const formatNumToCurrency = (num: number | undefined, addLabel = true): string => {
  return `${num ? Math.round(num / 1000).toLocaleString('ru-RU') : 0}${addLabel ? ' тыс. ₽' : ''}`;
};

export const prettyNum = (value: number | undefined, mlnMode = false): string => {
  if (!value) return '0';
  if (mlnMode) return (value / 1_000_000).toLocaleString('ru-RU', { maximumFractionDigits: 1 });
  return (value / 1_000).toLocaleString('ru-RU');
};

export const parseValue = (value: string | undefined, mlnMode = false): number => {
  if (!value) return 0;

  const res = +value.replace(/\s/, '').replace(/,/, '.') * (mlnMode ? 1_000_000 : 1_000);
  if (res !== res) return 0;
  return res;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return `${d.toLocaleDateString('ru')} ${d.toLocaleTimeString().match(/^\d+:\d+/)}`;
};

export const convertToThousands = (num: number): number => (num ? Math.round(num / 1000) : 0);

// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (fn: Function, delay = 0) => {
  let to: any;

  return function (...args: any[]) {
    clearTimeout(to);

    to = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export function deepClone(obj: any) {
  let clObj = {} as any;
  if (obj instanceof Object) {
    for (const i in obj) {
      if (Array.isArray(obj[i])) {
        clObj[i] = obj[i].map((x: any) => deepClone(x));
        continue;
      }
      if (obj[i] instanceof Object) {
        clObj[i] = deepClone(obj[i]);
        continue;
      }
      clObj[i] = obj[i];
    }
  } else {
    clObj = obj;
  }
  return clObj;
}

export function snakeToCamelObject(obj: Record<string, any>) {
  return Object.keys(obj).reduce((newOne: Record<string, any>, key: string) => {
    newOne[snakeToCamel(key)] = obj[key];
    return newOne;
  }, {});
}

export function snakeToCamel(str: string) {
  return str.replace(/([-_][a-z])/g, (group: string) => group.toUpperCase().replace('-', '').replace('_', ''));
}

export const toOption = (v: { name: string; id: number }): IOption | null => {
  if (v) {
    return {
      label: v.name,
      value: v.id,
    };
  }
  return null;
};

export const trimSpacesInLine = (text: string): string => text.replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');

export const trimSpacesInText = (text: string): string =>
  text
    .split('\n')
    .map((t) => trimSpacesInLine(t))
    .join('\n');

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

/**
 * функция склонения слова в зависимости от числа
 * @param number чисто склоняемых значений
 * @param titles склонения
 */
export const decline = (number: number, titles: string[]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

/**
 * Форматирует числа и переводит их в строку
 * @param num число
 * @returns отформатированное число (1000 -> 1 000)
 */
export const prettyNumbers = (num: number, round = true): string => {
  if (!num) return '0';
  return `${round ? Math.floor(num) : num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const useDebounce = (value: any, delay: number) => {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
