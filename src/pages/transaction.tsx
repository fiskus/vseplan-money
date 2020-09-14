import * as R from 'ramda';
import React, { FC, ReactElement, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react';

import FormTransaction from '../components/FormTransaction';
import Layout from '../components/Layout';
import RootStore from '../store/root';
import useStore from '../hooks/store';
import { UnitType } from '../types';

const PageTransaction: FC<RouteComponentProps> = (): ReactElement<void> => {
  const { store } = useStore<'store', RootStore>();

  useEffect(() => {
    store.load();
  });

  const isBidirectional = R.pathOr<UnitType>(
    UnitType.Expense,
    ['transactionForm', 'source', 'unitType'],
    store,
  ) === UnitType.Income;

  return (
    <Layout>
      <FormTransaction
        isBidirectional={isBidirectional}
      />
    </Layout>
  );
};

export default observer(PageTransaction);
