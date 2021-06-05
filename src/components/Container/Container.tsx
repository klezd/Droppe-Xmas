import React from 'react';
import ChildCart from '../ChildCart';

import { getAllAvailableUsers, getAllCarts } from '../../requests';
import { _User, _UserWithCart, _Cart } from '../../requests/types';
import { getFirstValueOfItemInObject } from '../../utils/array';
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
    newTPrice: number
  ) {
    const newCart = carts;
    newCart[userId] = cart;
    setCarts(newCart);
    setPrice(price + newTPrice);
  }

  return (
    <div className={styles.root}>
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
                onUpdateCart={(ncart: _Cart, nprice: number) =>
                  onUpdateAllCarts(u.id, ncart, nprice)
                }
              />
            );
          })}
        </div>
      )}
      <div className={styles.btnHolder}></div>
    </div>
  );
};

export default Container;
