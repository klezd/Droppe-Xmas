import React from 'react';

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IMap, _Cart, _Product, _ProductInCart } from '../../requests/types';

import { getProductById } from '../../requests';
import styles from './childcart.module.css';
import Tooltip from '../common/Tooltip';
import Checkbox from '../common/Checkbox';
import ProductLine from '../common/ProductLine/ProductLine';

interface _Props {
  childId: number;
  childName: string;
  cart: _Cart;
  onUpdateCart: (cart: _Cart, price: number) => void;
}

const ChildCart = (props: _Props): React.ReactElement => {
  const { childId, childName, cart, onUpdateCart } = props;

  const [panelOpen, setOpen] = React.useState(false);

  const [products, setProduct] = React.useState<IMap<_Product>>({});
  const [price, setPrice] = React.useState<number>(0);

  const [loading, setLoading] = React.useState<boolean>(true);

  const emptyCart: _Cart = {
    id: cart.id,
    userId: cart.userId,
    date: cart.date,
    products: []
  };

  const [approvedCart, setApprovedCart] = React.useState<_Cart>(emptyCart);

  const isDiabled = approvedCart.products.length === 0;
  const buttonStyle = isDiabled
    ? ['submitBtn', 'disabled'].join(' ')
    : 'submitBtn';

  React.useEffect(() => {
    cart.products.map(async (PIC: _ProductInCart) => {
      if (Object.keys(products).length === 0) {
        const product: _Product = await getProductById(PIC.productId);
        const newProducts = products;
        newProducts[PIC.productId] = product;
        setProduct(newProducts);
      }
    });
    setLoading(false);
  }, [cart]);

  function toggleCollapse() {
    setOpen(!panelOpen);
  }

  function onSelectProduct(id: number, quantity: number, pprice: number): void {
    // This function will select the product in current cart, and add the product to new cart.
    let currentProductsInCart = approvedCart.products;
    const totalPPrice = pprice * quantity;

    if (currentProductsInCart.some((p) => p.productId === id)) {
      // cart already has this product
      // remove from cart and update price
      currentProductsInCart = currentProductsInCart.filter(
        (p) => p.productId !== id
      );
      setPrice(price - totalPPrice);
    } else {
      currentProductsInCart.push({
        productId: id,
        quantity,
        price: totalPPrice
      });
      setPrice(price + totalPPrice);
    }

    const { userId, date } = cart;

    const newCart: _Cart = {
      id: cart.id,
      userId,
      date,
      products: currentProductsInCart
    };

    setApprovedCart(newCart);
  }

  function onUpdateChildCart(): void {
    if (approvedCart.products.length !== 0) onUpdateCart(approvedCart, price);
  }

  if (childId === 1) console.log(cart);

  return (
    <div
      className={styles.root}
      key={`${childName.replaceAll(' ', '_')}_${childId}`}
      id={`${childName.replaceAll(' ', '_')}_${childId}`}
    >
      <Tooltip
        element={
          <div
            className={
              !panelOpen
                ? styles.titleNav
                : [styles.titleNav, styles.active].join(' ')
            }
            onClick={() => toggleCollapse()}
          >
            <span>{childName}</span>
            <span>
              <FontAwesomeIcon icon={panelOpen ? faCaretUp : faCaretDown} />
            </span>
          </div>
        }
        description="Open to view cart"
        position={{ top: 10, left: 200 }}
        toolTipAction={() => toggleCollapse()}
      />
      <div
        className={
          !panelOpen
            ? [styles.contentPanel, styles.collapse].join(' ')
            : [styles.contentPanel, styles.expand].join(' ')
        }
      >
        {loading || Object.keys(products).length === 0 ? (
          <div> Loading</div>
        ) : (
          <div>
            {cart.products.map((PIC: _ProductInCart, i: number) => {
              if (products[PIC.productId]) {
                const { id, title, price, description, image } =
                  products[PIC.productId];
                const { quantity } = PIC;
                const isChecked =
                  approvedCart.products.filter((p) => p.productId === id)
                    .length === 1;

                return (
                  <Checkbox
                    key={`${id}_${i}`}
                    element={
                      <ProductLine
                        id={id}
                        title={title}
                        description={description}
                        quantity={quantity}
                        price={price}
                        image={image}
                      />
                    }
                    onSelect={() => onSelectProduct(id, quantity, price)}
                    isChecked={isChecked}
                  />
                );
              } else {
                return <></>;
              }
            })}
            <div className={styles.bottomPanel}>
              <div>Total Price : {Number(price).toFixed(2)}</div>
              <div className={buttonStyle} onClick={onUpdateChildCart}>
                <span>Update cart</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildCart;
