import React from 'react';
import { _Cart, _ProductInCart, _UserWithCart } from '../../requests/types';
import ProductLine from '../common/ProductLine';

import styles from './styles.module.css';

interface _Props {
  cartDetail: _UserWithCart;
  tprice: number;
  onClose: () => void;
}

const ConfirmContent = (props: _Props): React.ReactElement => {
  const { cartDetail, tprice, onClose } = props;

  return (
    <div className={styles.contentRoot}>
      {Object.values(cartDetail).map((childCart: _Cart, index: number) => {
        const { id, userName, products } = childCart;
        const nameWithoutSpace = userName?.replaceAll(' ', '_');
        return (
          <div
            key={`summary_cart_${id}_${nameWithoutSpace}_${index}`}
            id={`summary_cart_${id}_${nameWithoutSpace}_${index}`}
            className={styles.singleChildInfo}
          >
            <div className={styles.childname}>
              Gift for <span>{userName}</span>
            </div>
            <div className={styles.productsContainer}>
              {products.length > 0 &&
                products.map((p: _ProductInCart, i: number) => {
                  const { productId, quantity, productInfo } = p;

                  return (
                    <ProductLine
                      key={`product_summary_${productId}_${i}`}
                      divId={`product_summary_${nameWithoutSpace}_${productId}`}
                      id={productId}
                      title={productInfo?.title}
                      image={productInfo?.image}
                      price={productInfo?.price}
                      quantity={quantity}
                      inShort={true}
                    />
                  );
                })}
              {products.length === 0 && (
                <div onClick={onClose}>
                  You have not added gift for this children
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div className={styles.priceLine}>Total Price: {tprice} EUR</div>
    </div>
  );
};

export default ConfirmContent;
