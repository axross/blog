import crypto from 'crypto';

export const generateAccessToken = () => {
  const seed = String(Math.random());
  const hash = crypto.createHash('sha512');

  hash.update(seed);
  const accessToken = hash.digest('hex');

  return accessToken;
};
