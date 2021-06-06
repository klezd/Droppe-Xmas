import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import Tooltip from '../common/Tooltip';

import styles from './styles.module.css';

type _Props = {
  ref?: any;
  price: number;
};

const Header = (props: _Props): React.ReactElement => {
  const [Y, setY] = React.useState(window.scrollY);
  const [headerStyle, setHeaderStyle] = React.useState(styles.header);

  const onScroll: EventListener = React.useCallback(() => {
    if (Y > window.scrollY) setHeaderStyle(styles.header);

    if (Y < window.scrollY)
      setHeaderStyle([styles.header, styles.headerUp].join(' '));

    setY(window.scrollY);
  }, [Y]);

  React.useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const cartSummary = props.price
    ? `Total price: ${props.price} EUR`
    : 'Cart is empty';

  const CartIcon = (
    <div className={styles.btnWithText}>
      <span>
        <FontAwesomeIcon icon={faShoppingCart} />
      </span>
      <span className={styles.descriptionCart}>Cart</span>
    </div>
  );

  return (
    <div className={headerStyle}>
      <div></div>
      <div className={styles.pageTitle}>
        <span>Droppe Xmas</span>
      </div>
      <div className={styles.rightHolder}>
        <Tooltip
          element={CartIcon}
          position={{ top: 0, right: 15 }}
          description={cartSummary}
        />
      </div>
    </div>
  );
};

export default Header;
