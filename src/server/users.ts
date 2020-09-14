/* eslint import/prefer-default-export: 0 */

import PouchDB from 'pouchdb';

const USERS_DB_URL = (): string => `${process.env.DB_HOST}/users`;
const db = new PouchDB(USERS_DB_URL());

export async function saveFacebookIdentity(facebookId: string, name: string): Promise<string> {
  db.createIndex({
    index: {
      fields: ['facebookId'],
    },
  });

  const data = await db.find({
    selector: {
      facebookId,
    },
  });

  if (!data.docs.length) {
    const { id } = await db.post({
      facebookId,
      name,
    });
    return id;
  }

  /* eslint-disable-next-line no-underscore-dangle */
  return data.docs[0]._id;
}
