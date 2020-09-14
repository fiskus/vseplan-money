import { Amount, Currency, CurrencyRates } from '../types';

export function whichCurrencyStronger(a1: Amount, a2: Amount, rates: CurrencyRates): Currency {
  const rate1 = rates[a1.currency.name][a2.currency.name];
  const rate2 = rates[a2.currency.name][a1.currency.name];
  if (rate1 > rate2) {
    return a1.currency;
  }

  return a2.currency;
}

export function convert(amount: Amount, currency: Currency, rates: CurrencyRates): Amount {
  const value = amount.value * rates[currency.name][amount.currency.name];
  return {
    currency,
    value,
  };
}

type NormalizedAmounts = {
  amount1: Amount,
  amount2: Amount,
  currency: Currency
};

export function normalize(a1: Amount, a2: Amount, rates: CurrencyRates): NormalizedAmounts {
  const currency = whichCurrencyStronger(a1, a2, rates);
  return {
    amount1: convert(a1, currency, rates),
    amount2: convert(a2, currency, rates),
    currency,
  };
}

export function diff(a1: Amount, a2: Amount, rates: CurrencyRates): Amount {
  // TODO: should be `sum` only
  const { amount1, amount2, currency } = normalize(a1, a2, rates);
  const value = ((amount1.value * 100) - (amount2.value * 100)) / 100;
  return {
    currency,
    value,
  };
}

export function sum(a1: Amount, a2: Amount, rates: CurrencyRates): Amount {
  const { amount1, amount2, currency } = normalize(a1, a2, rates);
  const value = ((amount1.value * 100) + (amount2.value * 100)) / 100;
  return {
    currency,
    value,
  };
}
