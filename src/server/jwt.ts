import jsonwebtoken from 'jsonwebtoken';

const SECRET = 'abyrvalg';

export async function signJwt<T extends Record<string, string>>(str: T): Promise<string> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(str, SECRET, (jwtError, jwt) => {
      if (jwtError) {
        reject(jwtError);
      } else {
        resolve(jwt);
      }
    });
  });
}

export async function verifyJwt<T extends Record<string, string>>(jwt: string): Promise<T> {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(jwt, SECRET, (jwtError, decoded) => {
      if (jwtError) {
        reject(jwtError);
      } else {
        resolve(decoded as T);
      }
    });
  });
}
