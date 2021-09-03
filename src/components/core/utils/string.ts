export function matchPattern(params: string, searchPattern: string): boolean;
export function matchPattern(params: string[], searchPattern: string): boolean;
export function matchPattern(params: string | string[], searchPattern: string) {
  let compareWith: string[] = [];

  if (typeof searchPattern === 'undefined' || searchPattern === null) {
    return true;
  }

  const patternEscaped = `${searchPattern}`
    .trim()
    .replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

  if (!Array.isArray(params)) {
    compareWith = [params];
  } else {
    compareWith = [...params];
  }

  return compareWith.some(
    (param) => `${param}`.search(new RegExp(patternEscaped, 'i')) >= 0
  );
}

export function compareValues(data1: any, data2: any) {
  /* eslint-disable no-param-reassign */
  if (typeof data1 === 'string') {
    data1 = data1?.toLocaleLowerCase();
  }
  if (typeof data2 === 'string') {
    data2 = data2?.toLocaleLowerCase();
  }
  /* eslint-disable no-param-reassign */
  return data1?.toString() === data2?.toString();
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
}
