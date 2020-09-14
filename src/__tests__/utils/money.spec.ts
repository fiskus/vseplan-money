import { diff, sum } from '../../utils/money';
import { CurrencyName } from '../../types';

const rates = {
  [CurrencyName.RUB]: {
    [CurrencyName.EUR]: 87.47,
    [CurrencyName.RUB]: 1,
    [CurrencyName.USD]: 74.25,
  },
  [CurrencyName.USD]: {
    [CurrencyName.EUR]: 1.18,
    [CurrencyName.RUB]: 0.01,
    [CurrencyName.USD]: 1,
  },
  [CurrencyName.EUR]: {
    [CurrencyName.EUR]: 1,
    [CurrencyName.RUB]: 0.01,
    [CurrencyName.USD]: 0.85,
  },
};

test('sum of same currencies', () => {
  const a1 = { currency: { name: CurrencyName.RUB }, value: 100 };
  const a2 = { currency: { name: CurrencyName.RUB }, value: 99 };
  const result = { currency: { name: CurrencyName.RUB }, value: 199 };
  expect(sum(a1, a2, rates)).toEqual(result);
});

test('diff of same currencies', () => {
  const a1 = { currency: { name: CurrencyName.RUB }, value: 100 };
  const a2 = { currency: { name: CurrencyName.RUB }, value: 99 };
  const result = { currency: { name: CurrencyName.RUB }, value: 1 };
  expect(diff(a1, a2, rates)).toEqual(result);
});

test('sum of different currencies', () => {
  const a1 = { currency: { name: CurrencyName.RUB }, value: 1 };
  const a2 = { currency: { name: CurrencyName.USD }, value: 1 };
  const result = { currency: { name: CurrencyName.RUB }, value: 75.25 };
  expect(sum(a1, a2, rates)).toEqual(result);
});

test('sum of different currencies, reversed', () => {
  const a1 = { currency: { name: CurrencyName.USD }, value: 1 };
  const a2 = { currency: { name: CurrencyName.RUB }, value: 1 };
  const result = { currency: { name: CurrencyName.RUB }, value: 75.25 };
  expect(sum(a1, a2, rates)).toEqual(result);
});

test('sum of usd and eur', () => {
  const a1 = { currency: { name: CurrencyName.USD }, value: 1 };
  const a2 = { currency: { name: CurrencyName.EUR }, value: 1 };
  const result = { currency: { name: CurrencyName.USD }, value: 2.18 };
  expect(sum(a1, a2, rates)).toEqual(result);
});

test('diff of different currencies', () => {
  const a1 = { currency: { name: CurrencyName.RUB }, value: 100 };
  const a2 = { currency: { name: CurrencyName.USD }, value: 1 };
  const result = { currency: { name: CurrencyName.RUB }, value: 25.75 };
  expect(diff(a1, a2, rates)).toEqual(result);
});

test('diff of different currencies, reversed', () => {
  const a1 = { currency: { name: CurrencyName.USD }, value: 1 };
  const a2 = { currency: { name: CurrencyName.RUB }, value: 1 };
  const result = { currency: { name: CurrencyName.RUB }, value: 73.25 };
  expect(diff(a1, a2, rates)).toEqual(result);
});

test('diff of usd and eur', () => {
  const a1 = { currency: { name: CurrencyName.EUR }, value: 1 };
  const a2 = { currency: { name: CurrencyName.USD }, value: 1 };
  const result = { currency: { name: CurrencyName.USD }, value: 0.18 };
  expect(diff(a1, a2, rates)).toEqual(result);
});
