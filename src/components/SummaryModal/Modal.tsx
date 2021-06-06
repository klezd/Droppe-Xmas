import React from 'react';

import { updateCart } from '../../requests';
import { _UserWithCart } from '../../requests/types';
import ConfirmContent from './ConfirmContent';
import Modal from '../common/Modal';
import styles from './styles.module.css';
import SubmittedContent from './SubmittedContent';

type _Props = {
  ref?: any;
  display: boolean;
  closeModal: () => void;
  UpdatePrice: () => void;
  cartDetail: _UserWithCart;
  tprice: number;
  nprice: number;
};

const SummaryModal = (props: _Props): React.ReactElement => {
  const { display, cartDetail, tprice, nprice, closeModal, UpdatePrice } =
    props;

  const [screen, setScreen] = React.useState<'confirm' | 'submit'>('confirm');
  const [loading, setLoading] = React.useState(false);

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

  const footer = (
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
  );

  const content = (
    <div>
      {screen === 'confirm' ? (
        <ConfirmContent
          cartDetail={cartDetail}
          onClose={() => closeModal()}
          tprice={tprice}
          nprice={nprice}
        />
      ) : (
        <SubmittedContent
          loading={loading}
          tprice={tprice}
          cartDetail={cartDetail}
          nprice={nprice}
        />
      )}
    </div>
  );

  return (
    <Modal
      display={display}
      closeModal={() => closeModal()}
      title="Cart Summary"
      footer={footer}
      backgroundImage="./gift2.jpg"
      content={content}
      imageOpacity={0.8}
      contentOpacity={0.7}
      textColor="#fff"
    />
  );

  // return ReactDOM.createPortal(modal, document.body);
};

export default SummaryModal;
