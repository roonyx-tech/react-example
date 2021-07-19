import React from 'react';

import s from './styles.module.scss';

interface ISearchField {
  value: string;
  onChange: (value: string) => void;
  style?: any;
  placeholder?: string;
}

export class SearchField extends React.Component<ISearchField> {
  static defaultProps: Partial<ISearchField> = {
    style: {},
  };

  public inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  constructor(props: ISearchField) {
    super(props);
  }

  focus() {
    this.inputRef.current?.focus();
  }

  render() {
    const { value, onChange, style, placeholder } = this.props;

    return (
      <div className={s.wrapper}>
        <img src="/img/search.svg" className={s.icon} alt="search-icon" />
        <input
          ref={this.inputRef}
          className={s.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={style}
          placeholder={placeholder || 'Поиск'}
          type="text"
        />
      </div>
    );
  }
}
