import {
  _Cart,
  _ProductInCart,
  _UserWithCart,
  IMap
} from './../requests/types';
import { groupItemsOfArrayByIndex } from './array';

export function GetPriceWithDiscountForCarts(carts: _UserWithCart): number {
  let price = 0;
  let productsInAllCarts: _ProductInCart[] = [];
  Object.values(carts).map((c: _Cart) => {
    productsInAllCarts = productsInAllCarts.concat(c.products);
  });
  const productsById = groupItemsOfArrayByIndex(
    productsInAllCarts,
    'productId'
  );
  Object.values(productsById).map((sp: _ProductInCart[]) => {
    const numOfProducts: string = sp.length.toString();
    const discountRate = percentDiscount[`${numOfProducts}`];
    let singleSetPrice = 0;
    sp.map((p: _ProductInCart) => {
      if (p.productInfo)
        singleSetPrice = singleSetPrice + p.quantity * p.productInfo?.price;
    });
    price = price + singleSetPrice - singleSetPrice * discountRate;
  });
  return price;
}

const percentDiscount: IMap<number> = {
  '1': 0,
  '2': 0.2,
  '3': 0.3,
  '4': 0.4,
  '5': 0.5,
  '6': 0.6,
  '7': 0.7,
  '8': 0.8
};
