import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.css';
import Tooltip from '../Tooltip';

interface _Props {
  id: number;
  divId: string;
  title?: string;
  price?: number;
  description?: string;
  image?: string;
  quantity: number;
  isSelected?: boolean;
  onSelect?: (quantity: number) => void;
  inShort?: boolean;
}

const ProductLine = (props: _Props): React.ReactElement => {
  const {
    id,
    title,
    price,
    description,
    image,
    quantity,
    isSelected,
    onSelect,
    inShort,
    divId
  } = props;

  const initLocalCheck = isSelected ? isSelected : false;

  const [checked, setChecked] = React.useState(initLocalCheck);

  const onLocalSelect = () => {
    if (onSelect) {
      setChecked(!checked);
      onSelect(quantity);
    }
  };

  const imgStyle = inShort ? { width: 30, height: 30 } : {};
  return (
    <div
      className={
        checked ? [styles.root, styles.selected].join(' ') : styles.root
      }
      onClick={() => onLocalSelect()}
      id={divId}
    >
      {onSelect && (
        <label htmlFor={`product_quantity_${id}_checkbox`}>
          <input
            type="checkbox"
            className={styles.input}
            checked={checked}
            onChange={(e) => {
              e.preventDefault();
            }}
            name={`product_quantity_${id}_checkbox`}
          />
          <span className={styles.checkbox} />
        </label>
      )}

      <div className={styles.productLine}>
        {image && <img src={image} style={imgStyle} />}
        <div className={styles.productDescription}>
          <div className={styles.leftBox}>
            <div className={styles.productTitle}>
              {title && <div className={styles.descriptionText}>{title}</div>}
              {!inShort && description && (
                <Tooltip
                  element={<FontAwesomeIcon icon="question" />}
                  description={description}
                  position={{ top: 0, right: '-20px' }}
                  maxWidth={500}
                  setActionOnClick={true}
                />
              )}
            </div>
            {price && <div>{price} EUR</div>}
          </div>
          <div className={styles.rightBox}>
            <div>
              {!inShort && (
                <label htmlFor={`product_quantity_${id}`}>Quantity</label>
              )}
              <input
                name={`product_quantity_${id}_select`}
                id={`product_quantity_${id}`}
                // TODO:  Enable change quantity
                disabled
                value={quantity}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLine;
