import { getJwt } from './jwt';

export function createRequestBody<T>(obj: T): string {
  return JSON.stringify(obj);
}

export function createHeaders(): Headers {
  return new Headers({
    Authorization: `Bearer ${getJwt()}`,
    'Content-Type': 'application/json',
  });
}

export function getApiUrl(part: string): string {
  return process.env.SERVER_HOST + part;
}
