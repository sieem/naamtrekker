import { compare } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { secretKey } from '../utils/secretKey.util';

export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  const token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }

  let payload: any = {};
  try {
    payload = verify(token, secretKey());

  } catch (error) {
    console.error(error);
    return res.status(401).send('Invalid Signature');
  }

  if (!payload) {
    return res.status(401).send('Unauthorized request');
  }

  compare(`${secretKey()}/${payload.user}`, payload.hash, (err, result) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ error: err.message })
    }
    if (!result) {
      return res.status(401).json({ error: 'Invalid hash' })
    } else {

      req.user = payload.user;
      next();
    }
  })

}