export type ValueInfo = {
  value: number;
  month: number;
  year: number;
};

export type DoubleValueInfo = {
  value: [number, number];
  month: number;
  year: number;
};

const isDoubleValueInfo = (x: ValueInfo | DoubleValueInfo | null): x is DoubleValueInfo => {
  return Boolean(x && Array.isArray(x.value));
};

export class ValuesChecker<T extends ValueInfo | DoubleValueInfo> {
  private prevValues: [T | null, T | null];
  private current: T | null;

  constructor() {
    this.prevValues = [null, null];
    this.current = null;
  }

  private addValue(value: T) {
    const { prevValues } = this;
    prevValues[1] = prevValues[0];
    prevValues[0] = value;
  }

  private findIndex(value: T): number {
    return this.prevValues.findIndex((x) => x?.month === value.month && x?.year === value.year);
  }

  /** Checks that the values go one after another */
  private datesNear(): boolean {
    const { prevValues, current } = this;
    if (!prevValues[0] || !prevValues[1] || !current) return false;

    const correctGaps = prevValues[0].month - prevValues[1].month === 1 && current.month - prevValues[0].month === 1;
    return prevValues.every((x) => x?.year === current.year) && correctGaps;
  }

  public isThirdInRow(value: T): boolean {
    // console.group('IsTrirdInRow func');
    // console.log('value', value);
    const { prevValues } = this;
    // console.log('prevValues', prevValues);
    if (this.current && this.areDuplicates(this.current, value)) {
      // console.log('return', false);
      // console.groupEnd();
      return false;
    }

    this.current = value;
    const index = this.findIndex(value);
    // console.log('index', index);
    if (index !== -1) {
      prevValues[index] = value;
      // console.log('return', false);
      // console.groupEnd();
      return false;
    }
    // console.log('datesNear', this.datesNear());
    // console.log('hasSameValues', this.hasSameValues());
    const res = this.datesNear() && this.hasSameValues();
    this.addValue(value);
    // console.log('return', res);
    // console.groupEnd();
    return res;
  }

  public reset() {
    this.prevValues = [null, null];
  }

  private areDuplicates(a: T, b: T) {
    if (isDoubleValueInfo(a) && isDoubleValueInfo(b)) {
      return a.value[0] === b.value[0] && a.value[1] === b.value[1] && a.month === b.month && a.year === b.year;
    }
    return a.value === b.value && a.month === b.month && a.year === b.year;
  }

  /** Checks that all elems have same values */
  private hasSameValues() {
    const { prevValues, current } = this;
    return (
      !prevValues.some((x) => x === null) &&
      prevValues.every((x) => {
        if (isDoubleValueInfo(x) && isDoubleValueInfo(current)) {
          return x.value[0] === current.value[0] && x.value[1] === current.value[1];
        }
        return x?.value === current?.value;
      })
    );
  }
}
