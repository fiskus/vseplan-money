import url from 'url';
import querystring from 'querystring';

export function setJwt(jwtToken: string): void {
  window.localStorage.setItem('jwt', jwtToken);
}

export function getJwt(): string|null {
  return window.localStorage.getItem('jwt');
}

export async function parseJwtFromUrl(href: string): Promise<void> {
  const { search } = url.parse(href);
  if (!search) {
    return;
  }

  const { jwtToken } = querystring.parse(search.substring(1));
  if (!jwtToken || typeof jwtToken !== 'string') {
    return;
  }

  setJwt(jwtToken);

  // TODO: window.history.replaceState(null, '', '/');
  window.location.assign('/');
}
