import * as R from 'ramda';
import PouchDB from 'pouchdb';

import { DOLLAR } from '../utils/icons';
import { UnitsAddResponse } from '../types/rpc';
import {
  Category,
  CategoryNormalized,
  CurrencyName,
  DbId,
  UnitType,
} from '../types';

const UNITS_DB_URL = (): string => `${process.env.DB_HOST}/units`;
const db = new PouchDB<Category>(UNITS_DB_URL());

export async function loadUnits(userId: string, unitType: UnitType): Promise<CategoryNormalized> {
  db.createIndex({
    index: {
      fields: ['unitType', 'userId'],
    },
  });

  const data = await db.find({
    selector: {
      unitType,
      userId,
    },
  });
  const initial: CategoryNormalized = {
    dict: {},
    order: [],
  };
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
      dict: {
        ...memo.dict,
        [_id]: {
          id: {
            _id,
            _rev,
          },
          ...other,
        },
      },
      order: memo.order.concat(_id),
    };
  }, initial);
}

export async function addUnit(
  userId: string,
  name: string,
  unitType: UnitType,
): Promise<UnitsAddResponse> {
  const unit: Category = {
    amount: {
      currency: {
        name: CurrencyName.RUB,
      },
      value: 0,
    },
    icon: {
      content: DOLLAR,
    },
    name,
    unitType,
    userId,
  };

  const doc = await db.post(unit);

  const id = {
    _id: doc.id,
    _rev: doc.rev,
  };
  return R.assoc<DbId, Category, 'id'>('id', id, unit);
}
