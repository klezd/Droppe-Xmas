import React from 'react';

import styles from './styles.module.css';

type _Props = {
  props?: any;
  element: string | React.ReactNode;
  onSelect: () => void;
  isChecked?: boolean;
};

const Checkbox = (props: _Props): React.ReactElement => {
  const { element, isChecked, onSelect } = props;

  const initLocalCheck = isChecked ? isChecked : false;

  const [checked, setChecked] = React.useState(initLocalCheck);

  const onLocalSelect = () => {
    console.log('Checkbox seelct');
    setChecked(!checked);
    onSelect();
  };

  return (
    <React.Fragment>
      <label
        className={
          checked
            ? [styles.labelRoot, styles.selected].join(' ')
            : styles.labelRoot
        }
      >
        <input
          type="checkbox"
          className={styles.input}
          defaultChecked={checked}
          onClick={onLocalSelect}
        />
        <span className={styles.checkbox} />
        {element}
      </label>
    </React.Fragment>
  );
};

export default Checkbox;
