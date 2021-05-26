import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingCart,
  faCopyright,
  faCaretUp,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';

import Header from './components/Header';
import Container from './components/Container';

import './App.css';
import styles from './styles.module.css';

library.add(faShoppingCart, faCopyright, faCaretUp, faCaretDown);

const current = new Date();
const currentYear = current.getFullYear();

const App = (): React.ReactElement => {
  return (
    <div className={['App', styles.appRoot].join(' ')}>
      <Header />
      <div className={styles.container}>
        <Container />
      </div>
      <div className={styles.footer}>
        <span>
          Droppe - Klez - {currentYear} &nbsp;
          <FontAwesomeIcon icon={faCopyright} />
        </span>
      </div>
    </div>
  );
};

export default App;
