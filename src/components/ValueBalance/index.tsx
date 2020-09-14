import React, { ReactElement } from 'react';
import { Amount, Category, CurrencyRates } from '../../types';
import { diff, sum } from '../../utils/money';

import * as Container from './style';

type ValueBalanceProps = {
  shouldAdd: boolean;
  category: Category;
  rates: CurrencyRates;
  amount: Amount;
};

export default (props: ValueBalanceProps): ReactElement<void> => {
  const {
    amount,
    category,
    rates,
    shouldAdd,
  } = props;

  if (!category) {
    return <Container.Container>…</Container.Container>;
  }

  const balance = shouldAdd
    ? sum(category.amount, amount, rates)
    : diff(category.amount, amount, rates);

  return (
    <Container.Container>
      <Container.Value>
        {balance.value}
        <Container.Currency>
          {balance.currency.name}
        </Container.Currency>
      </Container.Value>
    </Container.Container>
  );
};
