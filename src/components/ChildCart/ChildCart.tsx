import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { getUserCartByUserId } from '../../requests';
import styles from './collapse.module.css';

interface _Props {
  childId: number;
  childName: string;
}

const CollapseBox = (props: _Props): React.ReactElement => {
  const { childId, childName } = props;

  React.useEffect(() => {
    getUserCartByUserId(childId);
  }, []);

  const [panelOpen, setOpen] = React.useState(false);
  const [panelStyle, setStyle] = React.useState();

  const toggleCollapse = () => {
    setOpen(!panelOpen);
  };
  console.log(childId, 'rerun', panelOpen);

  return (
    <div className={styles.root}>
      <div className={styles.titleNav} onClick={() => toggleCollapse()}>
        <span>{childName}</span>
        <span>
          <FontAwesomeIcon icon={panelOpen ? faCaretUp : faCaretDown} />
        </span>
      </div>
      <div
        className={
          !panelOpen
            ? styles.contentPanel
            : [styles.contentPanel, styles.display].join(' ')
        }
      ></div>
    </div>
  );
};

export default CollapseBox;
