/* eslint import/prefer-default-export: 0 */

import { CurrencyRates } from '../types';
import { createHeaders, getApiUrl } from '.';

export async function loadCurrencies(): Promise<CurrencyRates> {
  const response = await window.fetch(getApiUrl('/api/v1/currencies'), {
    headers: createHeaders(),
    method: 'GET',
  });
  return response.json();
}
