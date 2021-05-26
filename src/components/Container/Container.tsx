import React from 'react';
import ChildCart from '../ChildCart';

import { getAllAvailableUsers } from '../../requests';
import { _User } from '../../requests/types';

import styles from './styles.module.css';

const userIds = [1, 2, 3, 4, 8];

const Container = (): React.ReactElement => {
  const [users, setUsers] = React.useState<_User[]>([]);

  React.useEffect(() => {
    getAllAvailableUsers(userIds).then((u) => setUsers(u));
  }, []);

  return (
    <div className={styles.root}>
      {users.map((u: _User, i: number) => {
        const userName = u.name.firstname + ' ' + u.name.lastname;
        return <ChildCart childId={u.id} childName={userName} key={i} />;
      })}
    </div>
  );
};

export default Container;
