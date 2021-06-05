import { _User, _Product, _UserWithCarts } from './types';
import { groupItemsOfArrayByIndex } from '../utils/array';

export const getUserById = (id: number): Promise<_User> => {
  return fetch(`https://fakestoreapi.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const { id, username, password, name, phone } = data;
      return { id, username, password, name, phone };
    });
};

const prepareUserAPI = (id: number | string) =>
  fetch(`https://fakestoreapi.com/users/${id}`);

export const getAllAvailableUsers = (
  ids: Array<number | string>
): Promise<_User[]> => {
  const allRequests = ids.map((id: number | string) => prepareUserAPI(id));
  return Promise.all(allRequests)
    .then((res) => {
      return Promise.all(res.map((res) => res.json()));
    })
    .then((data) => {
      return data;
    });
};

export const getAllCarts = (): Promise<{
  userIds: Array<string | number>;
  userWithCarts: _UserWithCarts;
}> => {
  return fetch('https://fakestoreapi.com/carts')
    .then((res) => res.json())
    .then((data) => {
      const modifiedData = groupItemsOfArrayByIndex(data, 'userId');
      const userIds = Object.keys(modifiedData);
      return { userIds, userWithCarts: modifiedData };
    });
};

export const getProductById = (id: number): Promise<_Product> => {
  return fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const { id, title, price, description, category, image } = data;
      return { id, title, price, description, category, image };
    });
};
