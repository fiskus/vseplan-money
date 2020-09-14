import {
  Category,
  DbDocument,
  Transaction,
  TransactionIntent,
  UnitType,
  WholeData,
} from '.';

export type ExportSource = 'coinkeeper';

export type UnitsAddRequestBody = {
  name: string;
  unitType: UnitType;
};

export type UnitsAddResponse = DbDocument<Category>;

export type TransactionsAddRequestBody = {
  lastTransactionId: string|null;
  transaction: TransactionIntent;
  targetUnit: UnitType;
  sourceUnit?: UnitType;
};

export type TransactionsResponse = DbDocument<Transaction>;

export type ExportRequestBody = {
  content: string;
  source: ExportSource;
};

export type ExportResponse = null;

export type WorldResponse = WholeData;
