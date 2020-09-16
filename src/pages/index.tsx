import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
} from 'react';
import { RouteComponentProps } from '@reach/router';
import { ThemeContext } from 'styled-components';
import { observer } from 'mobx-react';

import CategoryList from '../components/CategoryList';
import Layout from '../components/Layout';
import RootStore from '../store/root';
import useStore from '../hooks/store';
import { UnitType } from '../types/index';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {};

const PageIndex: FC<RouteComponentProps> = (): ReactElement<void> => {
  const { store } = useStore<'store', RootStore>();

  useEffect(() => {
    store.load();
  });

  const {
    expenses,
    incomes,
    wallets,
  } = store;

  const theme = useContext(ThemeContext);

  return (
    <Layout>
      { store.areIncomesExpanded
        ? (
          <CategoryList
            color={theme.palette.income}
            moneyUnits={{ dict: incomes.dict, order: incomes.order }}
            onAdd={(): void => store.addIncome()}
            onEdit={noop}
            onRemove={noop}
            addTitle="Add Income"
          />
        ) : null }

      <CategoryList
        color={theme.palette.wallet}
        moneyUnits={{ dict: wallets.dict, order: wallets.order }}
        onAdd={(): void => store.addWallet()}
        onChange={(a, w): void => store.earnIncome(a, w)}
        onEdit={noop}
        onRemove={noop}
        sourceType={UnitType.Income}
        addTitle="Add wallet"
      />

      <CategoryList
        color={theme.palette.expense}
        moneyUnits={{ dict: expenses.dict, order: expenses.order }}
        onAdd={(): void => store.addExpense()}
        onChange={(a, w): void => store.spendExpense(a, w)}
        onEdit={noop}
        onRemove={noop}
        sourceType={UnitType.Wallet}
        addTitle="Add Expense"
      />
    </Layout>
  );
};

export default observer(PageIndex);
