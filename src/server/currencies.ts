import got from 'got';
import { CurrencyName, CurrencyRates } from '../types';

let currencyRates: CurrencyRates | null = null;

type RatesList = {
  base: [CurrencyName.EUR],
  rates: {
    [key in CurrencyName]: number;
  };
};

function convertToCurrencies({ rates }: RatesList): CurrencyRates {
  return {
    [CurrencyName.RUB]: {
      [CurrencyName.EUR]: rates.RUB,
      [CurrencyName.RUB]: 1,
      [CurrencyName.USD]: rates.RUB / rates.USD,
    },
    [CurrencyName.USD]: {
      [CurrencyName.EUR]: rates.USD,
      [CurrencyName.RUB]: rates.USD / rates.RUB,
      [CurrencyName.USD]: 1,
    },
    [CurrencyName.EUR]: {
      [CurrencyName.EUR]: 1,
      [CurrencyName.RUB]: 1 / rates.RUB,
      [CurrencyName.USD]: 1 / rates.USD,
    },
  };
}

export default async function loadCurrencies(): Promise<CurrencyRates> {
  if (currencyRates) {
    return Promise.resolve(currencyRates);
  }

  const response = await got('https://api.ratesapi.io/api/latest');
  const ratesList: RatesList = JSON.parse(response.body);
  currencyRates = convertToCurrencies(ratesList);
  return currencyRates;
}
