import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ReactDOM from 'react-dom';
import { updateCart } from '../../requests';
import { _UserWithCart } from '../../requests/types';
import ConfirmContent from './ConfirmContent';
import styles from './styles.module.css';
import SubmittedContent from './SubmittedContent';

type _Props = {
  ref?: any;
  display: boolean;
  closeModal: () => void;
  UpdatePrice: () => void;
  cartDetail: _UserWithCart;
  tprice: number;
};

const Modal = (props: _Props): React.ReactElement => {
  const { display, cartDetail, tprice, closeModal, UpdatePrice } = props;

  const [screen, setScreen] = React.useState<'confirm' | 'submit'>('confirm');
  const [loading, setLoading] = React.useState(false);

  const onKeyDown = (e: React.SyntheticEvent) => {
    console.log('press ', e);
    // TODO : Implement listener to keydown
  };

  const PushCart = () => {
    setLoading(true);
    setScreen('submit');
    updateCart(cartDetail).then(() => {
      setLoading(false);
    });
  };

  const gridTempCol =
    screen === 'confirm'
      ? { gridTemplateColumns: '1fr 1fr 1fr' }
      : { gridTemplateColumns: '1fr' };

  const modal = (
    <div
      className={
        display ? [styles.root, styles.display].join(' ') : styles.root
      }
      id="modalRoot"
      onKeyDown={(e) => onKeyDown(e)}
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          Cart Summary
          <span onClick={() => closeModal()}>
            <FontAwesomeIcon icon="times" />
          </span>
        </div>
        <div className={styles.modalContent}>
          <div>
            {screen === 'confirm' ? (
              <ConfirmContent
                cartDetail={cartDetail}
                onClose={() => closeModal()}
                tprice={tprice}
              />
            ) : (
              <SubmittedContent
                loading={loading}
                tprice={tprice}
                cartDetail={cartDetail}
              />
            )}
          </div>
          <div className={styles.modalFooter} style={gridTempCol}>
            {screen === 'confirm' && (
              <>
                <div className={styles.button} onClick={() => PushCart()}>
                  Confirm
                </div>
                <div className={styles.button} onClick={() => UpdatePrice()}>
                  Update cart
                </div>
              </>
            )}
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
