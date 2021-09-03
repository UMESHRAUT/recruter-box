export enum NumFormattingType {
  SHORT,
  MEDIUM,
  LONG
}

export function numFormatter(num: number, type =
  NumFormattingType.SHORT, allowDecimalValues = true) {
  if (num && typeof (num) === 'number') {
    const digits = 2;

    const si = [
      { value: 1E15, threshold: 1E14, short: 'Q', medium: 'Quint', long: 'Quintillion' },
      { value: 1E12, threshold: 1E11, short: 'T', medium: 'Tril', long: 'Trillion' },
      { value: 1E9, threshold: 1E8, short: 'B', medium: 'Bil', long: 'Billion' },
      { value: 1E6, threshold: 1E5, short: 'M', medium: 'Mil', long: 'Million' },
      { value: 1E3, threshold: 1E3, short: 'k', medium: 'k', long: 'Thousand' }
    ];

    let symbolAccessor: 'long' | 'medium' | 'short';
    switch (type) {
      case NumFormattingType.LONG:
        symbolAccessor = 'long';
        break;
      case NumFormattingType.MEDIUM:
        symbolAccessor = 'medium';
        break;
      default:
        symbolAccessor = 'short';
        break;
    }

    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

    for (let i = 0; i < si.length; i++) {
      if (num >= (allowDecimalValues ? si[i].threshold : si[i].value)) {
        return (num / si[i].value).toFixed(digits).replace(rx, '$1')
          + (type === NumFormattingType.LONG ? ' ' : '')
          + si[i][symbolAccessor];
      }
    }
    return num.toFixed(digits).replace(rx, '$1');
  }
    return num;
}

