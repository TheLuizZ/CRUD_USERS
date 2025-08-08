import bcrypto from 'bcrypt';
import { SALT_ROUNDS } from '../config.js';

export const hashed = (password) => {
  const hashedPassword = bcrypto.hashSync(password, SALT_ROUNDS);
  return hashedPassword;
};

export const isValidPassword = (userPassword, loginPassword) => {
  const isvalid = bcrypto.compareSync(loginPassword, userPassword);
  return isvalid;
  }