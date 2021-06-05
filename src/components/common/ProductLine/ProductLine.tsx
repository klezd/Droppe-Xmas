import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.css';
import Tooltip from '../Tooltip';

interface _Props {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

const ProductLine = (props: _Props): React.ReactElement => {
  const { id, title, price, description, image, quantity } = props;

  return (
    <div className={styles.productLine}>
      <img src={image} />
      <div className={styles.productDescription}>
        <div className={styles.leftBox}>
          <div className={styles.productTitle}>
            <div className={styles.descriptionText}>{title}</div>
            <Tooltip
              element={<FontAwesomeIcon icon="question" />}
              description={description}
              position={{ top: 0, right: '-20px' }}
              maxWidth={500}
              setActionOnClick={true}
            />
          </div>
          <div>{price}</div>
        </div>
        <div className={styles.rightBox}>
          <div>
            <label htmlFor={`product_quantity_${id}`}>Quantity</label>
            <select
              name={`product_quantity_${id}_select`}
              id={`product_quantity_${id}`}
              disabled
            >
              <option value={quantity}>{quantity}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLine;
