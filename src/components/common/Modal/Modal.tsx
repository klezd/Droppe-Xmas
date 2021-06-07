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
  footer?: React.ReactElement;
  size?: { width: number | string; height: number | string };
  backgroundImage?: string;
  textColor?: string;
  imageOpacity?: number;
  contentOpacity?: number;
  contentFallbackBg?: string;
};

const Modal = (props: _Props): React.ReactElement => {
  const {
    display,
    title,
    content,
    footer,
    backgroundImage,
    textColor,
    imageOpacity,
    contentOpacity,
    contentFallbackBg,
    closeModal
  } = props;

  const modal = (
    <div
      className={
        display ? [styles.root, styles.display].join(' ') : styles.root
      }
      id="modalRoot"
    >
      <div
        className={styles.modal}
        style={contentFallbackBg ? { background: contentFallbackBg } : {}}
      >
        {backgroundImage && (
          <img
            src={backgroundImage}
            style={imageOpacity ? { opacity: imageOpacity } : {}}
          />
        )}
        <div className={styles.modalHeader} style={{ color: textColor }}>
          <div>{title}</div>
          <span onClick={() => closeModal()}>
            <FontAwesomeIcon icon="times" />
          </span>
        </div>
        <div className={styles.modalContent}>
          <div
            className={styles.contentContainer}
            style={
              contentOpacity
                ? { backgroundColor: `rgba(199, 197, 209,${contentOpacity})` }
                : {}
            }
          >
            {content}
          </div>
          {footer ? (
            <div style={{ color: textColor }}>{footer}</div>
          ) : (
            <div className={styles.modalFooter} style={{ color: textColor }}>
              <div className={styles.button} onClick={() => closeModal()}>
                Close
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default Modal;
