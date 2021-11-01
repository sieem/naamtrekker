import { verify, Secret } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const secretKey = process.env.SECRET_KEY as Secret;

export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }

  let payload: any = {};
  try {
    payload = verify(token, secretKey);

  } catch (error) {
    console.error(error);
    return res.status(401).send('Invalid Signature');
  }

  if (!payload) {
    return res.status(401).send('Unauthorized request');
  }

  req.userId = payload.id;
  next();
}