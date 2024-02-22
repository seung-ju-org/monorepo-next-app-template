import util from 'util';
import crypto from 'crypto';

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const createSalt = async () => {
  const buf = await randomBytesPromise(64);

  return buf.toString('base64');
};

export async function createHashedPassword(password: string) {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 104906, 64, 'sha512');
  const hashedPassword = key.toString('base64');

  return { hashedPassword, salt };
}

export async function verifyPassword(
  password: string,
  userPassword: string,
  userSalt: string,
) {
  const key = await pbkdf2Promise(password, userSalt, 104906, 64, 'sha512');
  const hashedPassword = key.toString('base64');

  return hashedPassword === userPassword;
}
