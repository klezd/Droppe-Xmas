import React from 'react';

import styles from './loader.module.css';

const Loader = (): React.ReactElement => {
  return (
    <div className={styles.root}>
      <div className={styles.loadingBar}></div>
      <div>Loading. . .</div>
    </div>
  );
};

export default Loader;
