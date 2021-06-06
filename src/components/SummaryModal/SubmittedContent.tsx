import React from 'react';
import { _Cart, _ProductInCart, _UserWithCart } from '../../requests/types';
import Loader from '../common/Loader';

import styles from './styles.module.css';

interface _Props {
  cartDetail: _UserWithCart;
  tprice: number;
  nprice: number;
  loading: boolean;
}

const SubmittedContent = (props: _Props): React.ReactElement => {
  return (
    <div className={styles.contentRoot}>
      {props.loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.singleChildInfo}>
            <div className={styles.productsContainer}>
              <table className={styles.billTable}>
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price (1pcs)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(props.cartDetail).map(
                    (childCart: _Cart, index: number) => {
                      const { id, userName, products } = childCart;
                      const nameWithoutSpace = userName?.replaceAll(' ', '_');
                      return (
                        <>
                          {products.length === 0 ? (
                            <></>
                          ) : (
                            // <table className={styles.billTable}>
                            <React.Fragment
                              key={`bill_product_${nameWithoutSpace}_${id}_${index}`}
                            >
                              {products.map((p: _ProductInCart, i: number) => {
                                const { productId, quantity, productInfo } = p;
                                return (
                                  <tr
                                    key={`bill_product_${nameWithoutSpace}_${productId}_${i}`}
                                  >
                                    <td>{productId}</td>
                                    <td>{productInfo?.title}</td>
                                    <td>{quantity}</td>
                                    <td>{productInfo?.price}</td>
                                  </tr>
                                );
                              })}
                            </React.Fragment>
                          )}
                        </>
                      );
                    }
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>Total Payment:</td>
                    <td>{props.tprice} EUR</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className={styles.priceLine}></div>
        </>
      )}
    </div>
  );
};

export default SubmittedContent;
