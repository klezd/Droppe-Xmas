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
  backgroundImage?: string;
  textColor?: string;
};

const Modal = (props: _Props): React.ReactElement => {
  const { display, title, content, backgroundImage, textColor, closeModal } =
    props;

  const modal = (
    <div
      className={
        display ? [styles.root, styles.display].join(' ') : styles.root
      }
      id="modalRoot"
    >
      <div className={styles.modal}>
        {backgroundImage && <img src={backgroundImage} />}
        <div className={styles.modalHeader} style={{ color: textColor }}>
          <div>{title}</div>
          <span onClick={() => closeModal()}>
            <FontAwesomeIcon icon="times" />
          </span>
        </div>
        <div className={styles.modalContent}>
          <div
            className={backgroundImage ? styles.contentContainer : ''}
            style={{ padding: 16 }}
          >
            {content}
          </div>
          <div className={styles.modalFooter} style={{ color: textColor }}>
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
