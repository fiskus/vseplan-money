import * as R from 'ramda';
import PouchDB from 'pouchdb';

import { TransactionsResponse } from '../types/rpc';
import {
  DbId,
  DbTransactions,
  Transaction,
  TransactionIntent,
  UnitType,
} from '../types';

const TRANSACTIONS_DB_URL = (): string => `${process.env.DB_HOST}/transactions`;
const db = new PouchDB<Transaction>(TRANSACTIONS_DB_URL());

export async function loadTransactions(userId: string): Promise<DbTransactions> {
  db.createIndex({
    index: {
      fields: ['userId'],
    },
  });

  const data = await db.find({
    selector: {
      userId,
    },
  });

  const initial = {};
  return data.docs.reduce((memo, doc) => {
    if (!doc) {
      return memo;
    }

    /* eslint-disable-next-line no-underscore-dangle */
    const {
      _id,
      _rev,
      ...other
    } = doc;

    return {
      ...memo,
      [_id]: {
        id: {
          _id,
          _rev,
        },
        ...other,
      },
    };
  }, initial);
}

export async function addTransaction(
  userId: string,
  lastTransactionId: string|null,
  transaction: TransactionIntent,
  targetUnit: UnitType,
  sourceUnit?: UnitType,
): Promise<TransactionsResponse> {
  const transactionStruct: Transaction = {
    amount: transaction.amount,
    next: null,
    prev: lastTransactionId,
    target: {
      // eslint-disable-next-line no-underscore-dangle
      id: transaction.target.id,
      unitType: targetUnit,
    },
    userId,
  };
  if (sourceUnit) {
    transactionStruct.source = {
      // eslint-disable-next-line no-underscore-dangle
      id: R.pathOr<DbId>({ _id: 'wrong id', _rev: 'wrong rev' }, ['source', 'id'], transaction),
      unitType: sourceUnit,
    };
  }

  const { id, rev } = await db.post(transactionStruct);

  if (lastTransactionId) {
    const lastTransaction = await db.get(lastTransactionId);

    if (lastTransaction) {
      await db.put({
        // eslint-disable-next-line no-underscore-dangle
        _id: lastTransaction._id,
        // eslint-disable-next-line no-underscore-dangle
        _rev: lastTransaction._rev,
        amount: lastTransaction.amount,
        next: id,
        prev: lastTransaction.prev,
        source: lastTransaction.source,
        target: lastTransaction.target,
        userId,
      });
    }
  }

  const latestTransaction = {
    ...transactionStruct,
    id: {
      _id: id,
      _rev: rev,
    },
  };

  return latestTransaction;
}
