import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.css';

const Header = (): React.ReactElement => {
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

  return (
    <div className={headerStyle}>
      <div></div>
      <div className={styles.pageTitle}>
        <span>Droppe Xmas</span>
      </div>
      <div>
        <span>
          <FontAwesomeIcon icon={faShoppingCart} />
        </span>
      </div>
    </div>
  );
};

export default Header;
