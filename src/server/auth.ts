import FastifyOauth2, { OAuth2Token } from 'fastify-oauth2';
import got from 'got';
import { FastifyInstance } from 'fastify';

import { saveFacebookIdentity } from './users';
import { signJwt } from './jwt';
import logger from '../log';

export function registerFacebookAuth(
  fastify: FastifyInstance,
  startRedirectPath: string,
  callbackUri: string,
): void {
  const facebookId = process.env.AUTH_FACEBOOK_ID;
  const facebookSecret = process.env.AUTH_FACEBOOK_SECRET;
  if (!facebookId || !facebookSecret) {
    logger.error(new Error('Set Facebook ID and secret'));
    return;
  }

  fastify.register(FastifyOauth2, {
    callbackUri,
    credentials: {
      auth: FastifyOauth2.FACEBOOK_CONFIGURATION,
      client: {
        id: facebookId.toString(),
        secret: facebookSecret.toString(),
      },
    },
    name: 'facebookOAuth2',
    scope: ['email'],
    startRedirectPath,
  });
}

export async function facebookCallback(facebookToken: OAuth2Token): Promise<string> {
  const response = await got<{ id: string, name: string }>('https://graph.facebook.com/v6.0/me', {
    headers: {
      Authorization: `Bearer ${facebookToken.access_token}`,
    },
    responseType: 'json',
  });
  const userId = await saveFacebookIdentity(response.body.id, response.body.name);
  return signJwt({
    userId,
  });
}

export async function guestCallback(): Promise<string> {
  return signJwt({
    userId: 'fake',
  });
}
