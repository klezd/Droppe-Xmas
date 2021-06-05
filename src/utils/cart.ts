import { _Cart, _ProductInCart } from './../requests/types';

export function getQuantityOfProductFromCart(
  cart: _Cart,
  productId: number
): number {
  const productsInCart: Array<_ProductInCart> = cart.products;
  const product = productsInCart.filter((p) => p.productId === productId);
  console.group('get qunatity');
  console.log(cart);
  console.log(product);
  console.groupEnd;
  const quantity: number = product[0].quantity;
  return quantity;
}

// TODO DELETE
