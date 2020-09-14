import React, {
  FormEvent,
  FC,
  ReactElement,
  useState,
} from 'react';
import { observer } from 'mobx-react';

import ValueBalance from '../ValueBalance';
import RootStore from '../../store/root';
import useStore from '../../hooks/store';
import { CurrencyName } from '../../types';

import * as Container from './style';

type TransactionFormProps = {
  isBidirectional: boolean;
};

const TransactionForm: FC<TransactionFormProps> = (
  props: TransactionFormProps,
): ReactElement<void> => {
  const { store } = useStore<'store', RootStore>();

  const { isBidirectional } = props;

  const initialValue = store.transactionForm.value
    ? store.transactionForm.value.toString()
    : '';
  const [value, setValue] = useState(initialValue);
  const amount = {
    currency: {
      name: CurrencyName.RUB,
    },
    value: Number(value),
  };

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    store.transactionForm.submitForm(Number(value));
  };

  if (!store.rates) {
    return <>null</>;
  }

  return (
    <Container.Container onSubmit={onSubmit}>
      {(store.transactionForm.source && store.transactionForm.target)
        ? (
          <Container.Header>
            <Container.Name>
              {store.transactionForm.source.name}
              <ValueBalance
                amount={amount}
                category={store.transactionForm.source}
                rates={store.rates}
                shouldAdd={isBidirectional}
              />
            </Container.Name>
            <Container.Label>
              →
            </Container.Label>
            <Container.Name>
              {store.transactionForm.target.name}
              <ValueBalance
                amount={amount}
                category={store.transactionForm.target}
                rates={store.rates}
                shouldAdd
              />
            </Container.Name>
          </Container.Header>
        )
        : null }

      <Container.Input
        autoFocus
        value={value}
        onChange={(event): void => setValue(event.target.value)}
      />
      <Container.Submit type="submit">
        Save
      </Container.Submit>
    </Container.Container>
  );
};

export default observer(TransactionForm);
