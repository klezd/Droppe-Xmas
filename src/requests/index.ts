import {
  _User,
  _Product,
  _UserWithCart,
  _UserWithCarts,
  _Cart,
  _ProductInCart
} from './types';
import { groupItemsOfArrayByIndex } from '../utils/array';

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

export const updateCart = (
  allCarts: _UserWithCart
): /* Promise<_Cart> */ any => {
  const userIds = Object.keys(allCarts);
  const requests: Promise<Response>[] = [];
  userIds.map((userId: string) => {
    const cart: _Cart = allCarts[userId];
    const products = cart.products.map((p: _ProductInCart) => ({
      productId: p.productId,
      quantity: p.quantity
    }));
    const cartToUpdate = {
      userId,
      date: cart.date,
      products
    };
    const req = fetch(`https://fakestoreapi.com/carts/${cart.id}`, {
      method: 'PUT',
      body: JSON.stringify(cartToUpdate)
    });
    requests.push(req);
  });
  return Promise.all(requests)
    .then((res) => {
      return Promise.all(res.map((res) => res.json()));
    })
    .then((data) => {
      return data;
    });
};
