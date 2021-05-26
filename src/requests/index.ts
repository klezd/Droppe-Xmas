import { _User, _Cart, _Product } from './types';

export const getUserById = (id: number): Promise<_User> => {
  return fetch(`https://fakestoreapi.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const { id, username, password, name, phone } = data;
      return { id, username, password, name, phone };
    });
};

const prepareUserAPI = (id: number) =>
  fetch(`https://fakestoreapi.com/users/${id}`);

export const getAllAvailableUsers = async (ids: number[]): Promise<_User[]> => {
  const allRequests = ids.map((id) => prepareUserAPI(id));
  return Promise.all(allRequests)
    .then((res) => {
      return Promise.all(res.map((res) => res.json()));
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const getUserCartByUserId = (id: number): Promise<_Cart> => {
  return fetch(`https://fakestoreapi.com/carts/user/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const firstCart = data[0];
      const { id, userId, date, products } = firstCart;
      return { id, userId, date, products };
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
