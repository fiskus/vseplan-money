/* eslint import/prefer-default-export: 0 */

import { TransactionIntent, UnitType } from '../types';
import { TransactionsResponse, TransactionsAddRequestBody } from '../types/rpc';
import { createHeaders, createRequestBody, getApiUrl } from '.';

export async function makeTransaction(
  lastTransactionId: string|null,
  transaction: TransactionIntent,
  targetUnit: UnitType,
  sourceUnit?: UnitType,
): Promise<TransactionsResponse> {
  const response = await window.fetch(getApiUrl('/api/v1/transactions'), {
    body: createRequestBody<TransactionsAddRequestBody>({
      lastTransactionId,
      sourceUnit,
      targetUnit,
      transaction,
    }),
    headers: createHeaders(),
    method: 'POST',
  });
  return response.json();
}
