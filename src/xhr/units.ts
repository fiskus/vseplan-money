/* eslint import/prefer-default-export: 0 */

import { UnitType } from '../types';
import { UnitsAddResponse, UnitsAddRequestBody } from '../types/rpc';
import { createHeaders, createRequestBody, getApiUrl } from '.';

export async function addUnit(unitType: UnitType, name: string): Promise<UnitsAddResponse> {
  const response = await window.fetch(getApiUrl('/api/v1/units'), {
    body: createRequestBody<UnitsAddRequestBody>({
      name,
      unitType,
    }),
    headers: createHeaders(),
    method: 'POST',
  });
  return response.json();
}
