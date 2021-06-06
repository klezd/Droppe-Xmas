import { IMap } from './../requests/types';

/**
 * 
 * @param array 
    example: [
      { id: 1, userId: 1 },
      { id: 2, userId: 1 },
      { id: 3, userId: 2 },
      { id: 4, userId: 3 }
    ];

 * @param index 
    example: userId
 * @returns 
    example: {
        '1': [
          { id: 1, userId: 1 },
          { id: 2, userId: 1 }
        ],
        '2': [{ id: 3, userId: 2 }],
        '3': [{ id: 4, userId: 3 }]
      }
 */
export function groupItemsOfArrayByIndex(
  array: Array<any>,
  index: string
): IMap<any> {
  const map: IMap<any> = {};
  try {
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      const idx = item[index];
      // eslint-disable-next-line no-prototype-builtins
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

/**
 *
 * @param object
 * example: {
      '1': [],
      '2': [{ id: 3, userId: 2 }],
      '3': [{ id: 4, userId: 3 }]
    }

 * @returns object
    example: {
      '2': { id: 3, userId: 2 },
      '3': { id: 4, userId: 3 }
    }
 */
export function getFirstValueOfItemInObject<T>(
  object: Record<string, Array<T>>
): Record<string, T> {
  const newO: Record<string, T> = {};
  Object.keys(object).map((key: string) => {
    if (object[key][0]) newO[key] = object[key][0];
  });
  return newO;
}
