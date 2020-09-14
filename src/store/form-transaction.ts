import { action, decorate, observable } from 'mobx';

import {
  Category,
  CurrencyName,
  DbDocument,
} from '../types';

class FormTransactionStore {
  value = 0;

  callback: () => void;

  currency: CurrencyName = CurrencyName.RUB;

  source: DbDocument<Category>;

  target: DbDocument<Category>;

  openForm(source: DbDocument<Category>, target: DbDocument<Category>, callback: () => void): void {
    this.source = source;
    this.target = target;

    this.callback = callback;
  }

  submitForm(value: number): void {
    this.value = value;

    this.callback();
  }
}

decorate(FormTransactionStore, {
  currency: observable,
  openForm: action,
  source: observable,
  submitForm: action,
  target: observable,
  value: observable,
});

export default FormTransactionStore;
