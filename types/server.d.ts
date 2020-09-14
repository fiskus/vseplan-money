import { OAuth2Namespace } from 'fastify-oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    facebookOAuth2: OAuth2Namespace;
    myCustomOAuth2: OAuth2Namespace;
  }
}
