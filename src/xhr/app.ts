/* eslint import/prefer-default-export: 0 */

import { WorldResponse } from '../types/rpc';
import { getApiUrl, createHeaders } from '.';

export async function loadWorld(): Promise<WorldResponse> {
  const response = await window.fetch(getApiUrl('/api/v1/world'), {
    headers: createHeaders(),
  });
  return response.json();
}
