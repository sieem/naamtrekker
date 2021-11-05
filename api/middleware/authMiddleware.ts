import { compare } from 'bcrypt';
import { decode, verify } from 'jsonwebtoken';
import { secretKey } from '../utils/secretKey.util';
import { removeLoggedInStateToName } from '../services/db.service';

export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  const token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }

  let payload: any;
  try {
    payload = verify(token, secretKey());

  } catch (error) {
    if (error.message === 'jwt expired') {
      payload = decode(token);
      removeLoggedInStateToName(payload.name);
      return res.status(401).send({ error: 'jwt expired' });
    }
    console.log(error);
    return res.status(401).send({ error: 'Invalid Signature' });
  }

  if (!payload) {
    return res.status(401).send({ error: 'Unauthorized request' });
  }

  compare(`${secretKey()}/${payload.name}`, payload.hash, (err, result) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ error: err.message })
    }
    if (!result) {
      return res.status(401).json({ error: 'Invalid hash' })
    } else {

      req.name = payload.name;
      next();
    }
  })

}