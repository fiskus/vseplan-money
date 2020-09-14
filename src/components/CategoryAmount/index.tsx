import React, { ReactElement } from 'react';
import { Amount, CurrencyName } from '../../types';

import * as Container from './style';

type CategoryAmountProps = {
  amount: Amount;
};

const signs = {
  [CurrencyName.EUR]: '€',
  [CurrencyName.RUB]: '₽',
  [CurrencyName.USD]: '$',
};

export default (props: CategoryAmountProps): ReactElement => {
  const { amount } = props;

  const value = Math.round(amount.value * 100) / 100;

  return (
    <Container.Wrapper>
      { (amount.currency.name !== CurrencyName.RUB)
        ? (
          <Container.Currency>
            {signs[amount.currency.name]}
          </Container.Currency>
        ) : null }

      <Container.Value>
        {value}
      </Container.Value>

      { (amount.currency.name === CurrencyName.RUB)
        ? (
          <Container.Currency>
            {signs[amount.currency.name]}
          </Container.Currency>
        ) : null }
    </Container.Wrapper>
  );
};
