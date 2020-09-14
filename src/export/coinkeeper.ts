import PouchDB from 'pouchdb';
import csvtojson from 'csvtojson';

import { Category, CurrencyName, UnitType } from '../types';
import IconsMap from './coinkeeper-icons.json';

const UNITS_DB_URL = (): string => `${process.env.DB_HOST}/units`;
const db = new PouchDB<Category>(UNITS_DB_URL());

type CoinKeepeerCategory = {
  'Текущее значение': number;
  Валюта: CurrencyName;
  Иконка: string;
  Название: string;
};

type IconName = keyof typeof IconsMap;

function convert(userId: string, unitType: UnitType, dataList: CoinKeepeerCategory[]): Category[] {
  return dataList.map((data) => ({
    amount: {
      currency: {
        name: data['Валюта'],
      },
      value: Number(data['Текущее значение']) || 0,
    },
    icon: {
      content: IconsMap[data['Иконка'] as IconName] || 'dollar-sign',
    },
    name: data['Название'],
    unitType,
    userId,
  }));
}

async function parse(userId: string, rawContent: string): Promise<Category[][]> {
  const list = rawContent.split(/\n\n\n/);
  const unitTypes = [UnitType.Income, UnitType.Wallet, UnitType.Expense];
  const categories = [list[1], list[2], list[3]]
    .map(async (data, index) => {
      const json = await csvtojson().fromString(data);
      return convert(userId, unitTypes[index], json);
    });
  return Promise.all(categories);
}

export default async function exportCoinkeeper(userId: string, rawContent: string): Promise<null> {
  const [incomes, wallets, expenses] = await parse(userId, rawContent);
  const docs = [...incomes, ...wallets, ...expenses];
  await db.bulkDocs(docs);
  return null;
}
