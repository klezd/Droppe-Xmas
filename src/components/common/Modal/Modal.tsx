import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';

type _Props = {
  ref?: any;
  display: boolean;
  closeModal: () => void;
  title: string;
  content: React.ReactElement;
  size?: { width: number | string; height: number | string };
};

const Modal = (props: _Props): React.ReactElement => {
  const { display, title, content, closeModal } = props;

  const modal = (
    <div
      className={
        display ? [styles.root, styles.display].join(' ') : styles.root
      }
      id="modalRoot"
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          {title}
          <span onClick={() => closeModal()}>
            <FontAwesomeIcon icon="times" />
          </span>
        </div>
        <div className={styles.modalContent}>
          <div>{content}</div>
          <div className={styles.modalFooter}>
            <div className={styles.button} onClick={() => closeModal()}>
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default Modal;
