/* eslint no-underscore-dangle: 0 */

import * as R from 'ramda';
import { action, decorate, observable } from 'mobx';

import { addUnit } from '../xhr/units';
import { diff, sum } from '../utils/money';
import {
  Amount,
  Category,
  CategoryDict,
  CategoryNormalized,
  CategoryOrder,
  CurrencyRates,
  DbDocument,
  TransactionIntent,
  UnitType,
} from '../types';

class UnitsStore {
  dict: CategoryDict = {};

  order: CategoryOrder = [];

  setDb(data: CategoryNormalized): void {
    this.dict = data.dict;
    this.order = data.order;
  }

  add(transaction: TransactionIntent, rates: CurrencyRates): void {
    const target = this.dict[transaction.target.id._id];
    const amount = sum(target.amount, transaction.amount, rates);
    this.dict = R.assocPath<Amount, CategoryDict>([transaction.target.id._id, 'amount'], amount, this.dict);
  }

  subtract(transaction: TransactionIntent, rates: CurrencyRates): void {
    // TODO: should be `add` only
    if (!transaction.source) {
      throw new Error('set source for subtraction');
    }

    const amount = diff(transaction.source.amount, transaction.amount, rates);
    this.dict = R.assocPath<Amount, CategoryDict>([transaction.source.id._id, 'amount'], amount, this.dict);
  }

  async create(unitType: UnitType, name: string): Promise<void> {
    const unit = await addUnit(unitType, name);

    this.dict = R.assoc<Category, CategoryDict, string>(unit.id._id, unit, this.dict);
    this.order = R.append<string>(unit.id._id, this.order);
  }

  getById(id: string): DbDocument<Category> {
    return this.dict[id];
  }
}

decorate(UnitsStore, {
  create: action,
  dict: observable,
  order: observable,
  subtract: action,
});

export default UnitsStore;
