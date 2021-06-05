import { _Cart, _ProductInCart } from './../../requests/types';
import { getQuantityOfProductFromCart } from '../cart';

const cart: _Cart = {
  date: '2020-03-01T00:00:02.000Z',
  id: 6,
  products: [
    { productId: 18, quantity: 1 },
    { productId: 1, quantity: 1 }
  ],
  userId: 8
};

describe('Test: Array utils', () => {
  test('getQuantityOfProductFromCart', () => {
    expect(getQuantityOfProductFromCart(cart, 18)).toStrictEqual(1);
  });
});
