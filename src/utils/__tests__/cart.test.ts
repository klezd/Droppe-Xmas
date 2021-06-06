import { _UserWithCart } from './../../requests/types';
import { GetPriceWithDiscountForCarts } from '../cart';

const cart: _UserWithCart = {
  1: {
    date: '2020-03-02T00:00:02.000Z',
    id: 1,
    products: [
      {
        productId: 1,
        quantity: 4,
        productInfo: {
          title: 'Backpack',
          price: 123,
          image: 'anylink'
        }
      },
      {
        productId: 2,
        quantity: 2,
        productInfo: {
          title: 'Shirt',
          price: 13,
          image: 'anylink'
        }
      }
    ],
    userId: 1,
    userName: 'john doe'
  },
  2: {
    date: '2020-03-02T00:00:02.000Z',
    id: 2,
    products: [
      {
        productId: 1,
        quantity: 1,
        productInfo: {
          title: 'Backpack',
          price: 123,
          image: 'anylink'
        }
      },
      {
        productId: 3,
        quantity: 2,
        productInfo: {
          title: 'Shirt',
          price: 23,
          image: 'anylink'
        }
      }
    ],
    userId: 2,
    userName: 'john'
  }
};

describe('Test: Cart utils', () => {
  test('groupItemsOfArrayByIndex: success with array of object', () => {
    const price = 123 * 5 * 0.8 + 23 * 2 + 13 * 2;
    const nprice = 123 * 5 + 23 * 2 + 13 * 2;
    expect(GetPriceWithDiscountForCarts(cart)).toBe({
      discountPrice: price,
      normalPrice: nprice
    });
  });
});
