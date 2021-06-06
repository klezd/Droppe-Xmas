import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingCart,
  faCopyright,
  faCaretUp,
  faCaretDown,
  faQuestion,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import Header from './components/Header';
import Container from './components/Container';

import './App.css';
import styles from './styles.module.css';

library.add(
  faShoppingCart,
  faCopyright,
  faCaretUp,
  faCaretDown,
  faTimes,
  faQuestion
);

const current = new Date();
const currentYear = current.getFullYear();

const App = (): React.ReactElement => {
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  return (
    <div className={['App', styles.appRoot].join(' ')}>
      <Header price={totalPrice} />
      <div className={styles.container}>
        <Container setTotalPrice={setTotalPrice} />
      </div>
      <div className={styles.footer}>
        <span>
          Klez {currentYear} - Droppe &nbsp;
          <FontAwesomeIcon icon={faCopyright} />
        </span>
      </div>
    </div>
  );
};

export default App;
