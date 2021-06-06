import React from 'react';
import ChildCart from '../ChildCart';

import { getAllAvailableUsers, getAllCarts } from '../../requests';
import { _User, _UserWithCart, _Cart } from '../../requests/types';

import { getFirstValueOfItemInObject } from '../../utils/array';
import { GetPriceWithDiscountForCarts } from '../../utils/cart';

import SummaryModal from '../SummaryModal';
import Modal from '../common/Modal';
import styles from './styles.module.css';

type _Props = {
  ref?: any;
  setTotalPrice: (p: number) => void;
};

const Container = (props: _Props): React.ReactElement => {
  const [users, setUsers] = React.useState<_User[]>([]);
  // constant state, won't change when updating cart
  const [initcarts, setUnchangableCarts] = React.useState<_UserWithCart>({});
  const [carts, setCarts] = React.useState<_UserWithCart>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const [price, setPrice] = React.useState<number>(0);
  const [normPrice, setNPrice] = React.useState<number>(0);

  const [disabledBtn, setdisabledBtn] = React.useState<boolean>(true);

  const [display, setDisplay] = React.useState<'summary' | 'help' | null>(null);

  React.useEffect(() => {
    if (users.length === 0 || Object.keys(carts).length === 0) {
      getAllCarts().then(async (r) => {
        const { userIds, userWithCarts } = r;
        await getAllAvailableUsers(userIds).then((u) => setUsers(u));
        const userWithOneCart = getFirstValueOfItemInObject(userWithCarts);

        setCarts(userWithOneCart);
        // Create a totally new object to avoid updating object causes all objects updated
        const initCarts = Object.assign({}, userWithOneCart);
        setUnchangableCarts(initCarts);
        setLoading(false);
      });
    }
    props.setTotalPrice(price);
  }, [price]);

  function onUpdateAllCarts(
    userId: number | string,
    cart: _Cart,
    isModified?: boolean
  ) {
    const newCart = carts;
    newCart[userId] = cart;
    setCarts(newCart);
    if (isModified) UpdatePrice();
    if (disabledBtn && isModified) setdisabledBtn(false);
  }

  function UpdatePrice(): void {
    const { discountPrice, normalPrice } = GetPriceWithDiscountForCarts(carts);
    setPrice(discountPrice);
    setNPrice(normalPrice);
  }

  function openModal(modal: 'summary' | 'help') {
    // Set to prevent scroll on open modal
    document.body.style.overflow = 'hidden';
    setDisplay(modal);
  }

  function closeModal() {
    document.body.style.overflow = 'unset';
    setDisplay(null);
  }

  function onGetSummary() {
    if (!disabledBtn) openModal('summary');
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>Santa Claus is coming...</p>
      <p onClick={() => openModal('help')}>
        Here you can find your children &apos;s wish list for their Christmas
        gift. Click here if you have any struggles!
      </p>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.cartsContainer}>
          {users.map((u: _User, i: number) => {
            const userName = u.name.firstname + ' ' + u.name.lastname;
            return (
              <ChildCart
                childId={u.id}
                childName={userName}
                key={i}
                cart={initcarts[u.id]}
                onUpdateCart={(ncart: _Cart, isModified?: boolean) =>
                  onUpdateAllCarts(u.id, ncart, isModified)
                }
              />
            );
          })}
        </div>
      )}
      <div className={styles.btnHolder}>
        <div
          className={
            disabledBtn ? ['submitBtn', 'disabled'].join(' ') : 'submitBtn'
          }
          onClick={() => onGetSummary()}
        >
          Get Summary
        </div>
      </div>
      {display === 'summary' && (
        <SummaryModal
          display={display === 'summary'}
          closeModal={() => closeModal()}
          cartDetail={carts}
          tprice={price}
          nprice={normPrice}
          UpdatePrice={() => UpdatePrice()}
        />
      )}
      {display === 'help' && (
        <Modal
          display={display === 'help'}
          closeModal={() => closeModal()}
          title="Help"
          backgroundImage="./christmas-gift.jpg"
          contentOpacity={0.35}
          content={
            <div>
              <p>
                Below is the list of section of each child. Each section can be
                opened and you can modify their choice.
              </p>
              <p>Click on each line to select or deselect product.</p>
              <p>Hover on question mark (?) for product description.</p>
              <p>
                After finish modifying, you can press &quot;Update cart&quot; to
                update your choice. Tap the panel again to close section if
                needed.
              </p>
              <p>
                You will find &quot;Get Summary&quot; button at the end of page.
                Open to view what you have selected.
              </p>
              <p>
                Once you ready for payment, choose &quot;Confirm&quot; on
                summary form.
              </p>
              <p>We wish you a happy holiday!</p>
              <p>Merry Christmas</p>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Container;
