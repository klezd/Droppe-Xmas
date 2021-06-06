import React from 'react';

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  IMap,
  _Cart,
  _Product,
  _ProductInCart,
  _ProductShort
} from '../../requests/types';
import { getProductById } from '../../requests';

import Tooltip from '../common/Tooltip';
import ProductLine from '../common/ProductLine';
import Loader from '../common/Loader';

import styles from './childcart.module.css';

interface _Props {
  childId: number;
  childName: string;
  cart: _Cart;
  onUpdateCart: (cart: _Cart, isModified?: boolean) => void;
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
    userName: childName,
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
    // Set init state of all cart
    onUpdateCart(emptyCart);
  }, []);

  function toggleCollapse() {
    setOpen(!panelOpen);
  }

  function onSelectProduct(
    id: number,
    quantity: number,
    pInfo: _ProductShort
  ): void {
    // This function will select the product in current cart, and add the product to new cart.
    const currentProductsInCart = approvedCart.products;

    if (currentProductsInCart.some((p) => p.productId === id)) {
      RemoveProductFromCart(id, quantity, pInfo);
    } else {
      AddProductToCart(id, quantity, pInfo);
    }
  }

  function AddProductToCart(
    id: number,
    quantity: number,
    pInfo: _ProductShort
  ) {
    const newInfo: _ProductInCart[] = approvedCart.products;

    newInfo.push({
      productId: id,
      quantity,
      productInfo: pInfo
    });
    const totalPPrice = pInfo.price * quantity;

    updateCartWithProduct(newInfo);
    setPrice(price + totalPPrice);
  }

  function RemoveProductFromCart(
    id: number,
    quantity: number,
    pInfo: _ProductShort
  ) {
    let newInfo: _ProductInCart[] = approvedCart.products;

    const totalPPrice = pInfo.price * quantity;
    newInfo = newInfo.filter((p) => p.productId !== id);

    updateCartWithProduct(newInfo);
    setPrice(price - totalPPrice);
  }

  function updateCartWithProduct(p: _ProductInCart[]) {
    const { userId, date } = cart;

    const newCart: _Cart = {
      id: cart.id,
      userId,
      userName: childName,
      date,
      products: p
    };

    setApprovedCart(newCart);
  }

  function onUpdateChildCart(): void {
    if (approvedCart.products.length !== 0) {
      onUpdateCart(approvedCart, true);
    }
  }

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
              panelOpen || approvedCart.products.length !== 0
                ? [styles.titleNav, styles.active].join(' ')
                : styles.titleNav
            }
            onClick={() => toggleCollapse()}
          >
            {panelOpen ? (
              <>Wish list of {childName}</>
            ) : (
              <span>{childName}</span>
            )}
            <span>
              <FontAwesomeIcon icon={panelOpen ? faCaretUp : faCaretDown} />
            </span>
          </div>
        }
        description="Open to view cart"
        position={{ top: 10, left: 270 }}
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
          <Loader />
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
                  <ProductLine
                    key={`${id}_${i}`}
                    divId={`${id}_${i}`}
                    id={id}
                    title={title}
                    description={description}
                    quantity={quantity}
                    price={price}
                    image={image}
                    isSelected={isChecked}
                    onSelect={(q) =>
                      onSelectProduct(id, q, { price, title, image })
                    }
                  />
                );
              } else {
                return <></>;
              }
            })}
            <div className={styles.bottomPanel}>
              <div>Total Price : {Number(price).toFixed(2)} EUR</div>
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
