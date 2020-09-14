import PouchDB from 'pouchdb';

export type Icon = {
  content: string;
};

export enum CurrencyName {
  EUR = 'EUR',
  RUB = 'RUB',
  USD = 'USD',
}

export type Currency = {
  name: CurrencyName;
};

export type Amount = {
  currency: Currency;
  value: number;
};

export type DbId = PouchDB.Core.IdMeta & PouchDB.Core.RevisionIdMeta;

export type DbDocument<T> = T & {
  id: DbId;
};

export enum UnitType {
  Income = 'income',
  Expense = 'expense',
  Wallet = 'wallet',
}

type TransactionSubject = {
  unitType: UnitType;
};

export type Category = TransactionSubject & {
  amount: Amount;
  icon: Icon;
  name: string;
  userId: string;
};

export type CategoryDict = {
  [id: string]: DbDocument<Category>;
};

export type CategoryOrder = string[];

export type CategoryNormalized = {
  dict: CategoryDict;
  order: CategoryOrder;
};

export type TransactionIntent = {
  amount: Amount;
  source?: DbDocument<{
    amount: Amount;
    unitType: UnitType;
  }>;
  target: DbDocument<{
    amount: Amount;
    unitType: UnitType;
  }>;
};

export type TransactionDrag = {
  type: UnitType;
  unit: DbDocument<Category>;
};

export type Transaction = {
  amount: Amount;
  next: string|null;
  prev: string|null;
  source?: DbDocument<TransactionSubject>;
  target: DbDocument<TransactionSubject>;
  userId: string;
};

export type DbTransactions = {
  [id: string]: DbDocument<Transaction>;
};

export type WholeData = {
  incomes: CategoryNormalized;
  expenses: CategoryNormalized;
  wallets: CategoryNormalized;
  transactions: DbTransactions;
  transactionId: string|null;
  lastId: string|null;
  rates: CurrencyRates;
};

export type State = {
  firstTransactionId: string;
};

export type DbState = {
  [id: string]: State;
};

export type CurrencyRates = {
  [k in CurrencyName]: {
    [j in CurrencyName]: number;
  };
};
