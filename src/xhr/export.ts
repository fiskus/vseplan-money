/* eslint import/prefer-default-export: 0 */

import { ExportRequestBody, ExportResponse } from '../types/rpc';
import { createHeaders, createRequestBody, getApiUrl } from '.';

export async function exportCoinkeeper(content: string): Promise<ExportResponse> {
  const response = await window.fetch(getApiUrl('/api/v1/export'), {
    body: createRequestBody<ExportRequestBody>({
      content,
      source: 'coinkeeper',
    }),
    headers: createHeaders(),
    method: 'POST',
  });
  return response.json();
}
