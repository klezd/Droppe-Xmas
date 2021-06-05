import { IMap } from './../requests/types';

export function groupItemsOfArrayByIndex(
  array: Array<any>,
  index: string
): IMap<any> {
  const map: IMap<any> = {};
  try {
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      const idx = item[index];
      if (!map.hasOwnProperty(item[index])) {
        map[idx] = [];
      }
      map[idx].push(item);
    }
    return map;
  } catch (e) {
    console.error(e);
    return {};
  }
}

export function getFirstValueOfItemInObject<T>(
  object: Record<string, Array<T>>
): Record<string, T> {
  const newO: Record<string, T> = {};
  Object.keys(object).map((key: string) => {
    if (object[key][0]) newO[key] = object[key][0];
  });
  return newO;
}
