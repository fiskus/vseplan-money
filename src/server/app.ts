/* eslint import/prefer-default-export: 0 */

import * as R from 'ramda';

import { loadTransactions } from './transactions';
import { loadUnits } from './units';

import { diff, sum } from '../utils/money';
import {
  Category,
  CurrencyRates,
  DbDocument,
  UnitType,
  WholeData,
} from '../types';

function getUnit(unitType: UnitType, id: string, obj: WholeData): DbDocument<Category> {
  switch (unitType) {
    case UnitType.Income:
      return obj.incomes.dict[id];
    case UnitType.Wallet:
      return obj.wallets.dict[id];
    case UnitType.Expense:
      return obj.expenses.dict[id];
    default:
      throw new Error('Wrong unit type');
  }
}

function transactInner(memo: WholeData): WholeData {
  if (!memo.transactionId) {
    throw new Error('No transaction id');
  }
  const transaction = memo.transactions[memo.transactionId];

  // eslint-disable-next-line no-underscore-dangle
  const target = getUnit(transaction.target.unitType, transaction.target.id._id, memo);
  target.amount = sum(target.amount, transaction.amount, memo.rates);

  if (transaction.source) {
    // eslint-disable-next-line no-underscore-dangle
    const source = getUnit(transaction.source.unitType, transaction.source.id._id, memo);
    source.amount = diff(source.amount, transaction.amount, memo.rates);
  }

  return R.assoc<string|null, WholeData, string>('transactionId', transaction.next, memo);
}

export async function loadApp(userId: string, rates: CurrencyRates): Promise<WholeData> {
  const expensesDb = await loadUnits(userId, UnitType.Expense);
  const incomesDb = await loadUnits(userId, UnitType.Income);
  const transactionsDb = await loadTransactions(userId);
  const walletsDb = await loadUnits(userId, UnitType.Wallet);

  let firstId: string|null = null;
  let lastId: string|null = null;
  const transactionIds = Object.keys(transactionsDb);
  transactionIds.some((transactionId) => {
    if (!transactionsDb[transactionId].prev) {
      firstId = transactionId;
    }
    if (!transactionsDb[transactionId].next) {
      lastId = transactionId;
    }
    return Boolean(firstId && lastId);
  });

  const initial = {
    expenses: expensesDb,
    incomes: incomesDb,
    lastId,
    rates,
    transactionId: firstId,
    transactions: transactionsDb,
    wallets: walletsDb,
  };

  return R.until<WholeData, WholeData>(
    (memo) => {
      if (!memo.transactionId) {
        return true;
      }

      // transactions.setLastTransaction(transactionsDb[memo.transactionId]);
      return false;
    },
    transactInner,
    initial,
  );
}
