import {
  groupItemsOfArrayByIndex,
  getFirstValueOfItemInObject
} from '../array';

const Arr1 = [
  { id: 1, userId: 1 },
  { id: 2, userId: 1 },
  { id: 3, userId: 2 },
  { id: 4, userId: 3 }
];

const Arr2 = [1, 2, 3, 4];

const Arr3 = {
  '1': [
    { id: 1, userId: 1 },
    { id: 2, userId: 1 }
  ],
  '2': [{ id: 3, userId: 2 }],
  '3': [{ id: 4, userId: 3 }]
};

const Arr4 = {
  '1': { id: 1, userId: 1 },
  '2': { id: 3, userId: 2 },
  '3': { id: 4, userId: 3 }
};

const Arr5 = {
  '1': [],
  '2': [{ id: 3, userId: 2 }],
  '3': [{ id: 4, userId: 3 }]
};
const Arr6 = {
  '2': { id: 3, userId: 2 },
  '3': { id: 4, userId: 3 }
};

describe('Test: Array utils', () => {
  test('groupItemsOfArrayByIndex: success with array of object', () => {
    expect(groupItemsOfArrayByIndex(Arr1, 'userId')).toStrictEqual(Arr3);
  });

  test('groupItemsOfArrayByIndex: return object with key undefined array provide is not an array of object', () => {
    expect(groupItemsOfArrayByIndex(Arr2, 'i')).toStrictEqual({
      undefined: Arr2
    });
  });

  test('getFirstValueOfItemInObject: success with object of array', () => {
    expect(getFirstValueOfItemInObject(Arr3)).toStrictEqual(Arr4);
  });
  test('getFirstValueOfItemInObject: success with object of array: omit if array is empty', () => {
    expect(getFirstValueOfItemInObject(Arr5)).toStrictEqual(Arr6);
  });
});
