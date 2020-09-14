import Fastify, { FastifyRequest } from 'fastify';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

import exportCoinkeeper from '../export/coinkeeper';
import loadCurrencies from './currencies';
import { CurrencyRates } from '../types';
import { addTransaction } from './transactions';
import { addUnit } from './units';
import { loadApp } from './app';
import { facebookCallback, guestCallback, registerFacebookAuth } from './auth';
import { verifyJwt } from './jwt';
import {
  ExportRequestBody,
  ExportResponse,
  TransactionsAddRequestBody,
  TransactionsResponse,
  UnitsAddRequestBody,
  UnitsAddResponse,
  WorldResponse,
} from '../types/rpc';

PouchDB.plugin(PouchDBFind);

const fastify = Fastify({
  logger: true,
});

registerFacebookAuth(
  fastify,
  '/api/v1/login/facebook',
  `${process.env.FRONTEND_HOST}/api/v1/login/facebook/callback`,
);

fastify.get('/api/v1/login/facebook/callback', async function onRequest(request, reply) {
  const token = await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
  try {
    const jwt = await facebookCallback(token);
    reply.redirect(`${process.env.FRONTEND_HOST}/?jwtToken=${jwt}`);
  } catch (error) {
    reply.send(error);
  }
});

fastify.get('/api/v1/login/guest', async (request, reply) => {
  const jwt = await guestCallback();
  reply.redirect(`${process.env.FRONTEND_HOST}/?jwtToken=${jwt}`);
});

type WorldRequest = FastifyRequest<{
  Headers: {
    authorization: string;
  };
}>;

fastify.get('/api/v1/world', /* worldOptions */ async (req: WorldRequest, res): Promise<WorldResponse> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.code(201).send({ errors: ['Not authorized'] });
  }
  const token = authHeader.split('Bearer ')[1];
  const { userId } = await verifyJwt(token);
  if (!userId) {
    return res.code(201).send({ errors: ['Not authorized'] });
  }
  const rates = await loadCurrencies();
  return loadApp(userId, rates);
});

type UnitsRequest = FastifyRequest<{
  Body: UnitsAddRequestBody;
  Headers: {
    authorization: string;
  };
}>;
fastify.post('/api/v1/units', async (req: UnitsRequest): Promise<UnitsAddResponse> => {
  const { name, unitType } = req.body;

  const authHeader = req.headers.authorization;
  const token = authHeader.split('Bearer ')[1];
  const { userId } = await verifyJwt(token);
  return addUnit(userId, name, unitType);
});

type TransactionsRequest = FastifyRequest<{
  Body: TransactionsAddRequestBody;
  Headers: {
    authorization: string;
  };
}>;

fastify.post('/api/v1/transactions', async (req: TransactionsRequest): Promise<TransactionsResponse> => {
  const {
    lastTransactionId,
    sourceUnit,
    targetUnit,
    transaction,
  } = req.body;

  const authHeader = req.headers.authorization;
  const token = authHeader.split('Bearer ')[1];
  const { userId } = await verifyJwt(token);

  return addTransaction(userId, lastTransactionId, transaction, targetUnit, sourceUnit);
});

type ExportRequest = FastifyRequest<{
  Body: ExportRequestBody;
  Headers: {
    authorization: string;
  };
}>;
fastify.post('/api/v1/export', async (req: ExportRequest): Promise<ExportResponse> => {
  const { content, source } = req.body;

  const authHeader = req.headers.authorization;
  const token = authHeader.split('Bearer ')[1];
  const { userId } = await verifyJwt(token);
  switch (source) {
    case 'coinkeeper':
      return exportCoinkeeper(userId, content);
    default:
      throw new Error('Wrong source');
  }
});

fastify.get('/api/v1/currencies', async (): Promise<CurrencyRates> => loadCurrencies());

const start = async (): Promise<void> => {
  try {
    const port = 3001;
    await fastify.listen(port, '0.0.0.0');
    fastify.log.info(`server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
