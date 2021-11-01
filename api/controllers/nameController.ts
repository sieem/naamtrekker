import { hash } from "bcrypt";
import { sign } from 'jsonwebtoken';
import { secretKey } from "../utils/secretKey.util";
const saltRounds = 10;

export const takeName = async (req, res) => {
  const user = req.body.user;
  hash(`${secretKey()}/${user}`, saltRounds, (err, hash) => {
    if (err) {
      console.error(err)
      return res.status(400).json(err.message)
    }

    const payload = { user, hash }
    const token = sign(payload, secretKey())
    return res.status(200).send({ token });
  });
}

export const getName = async (req, res) => {
  try {
    res.status(200).json({ task: 'getName', user: req.user });
  } catch (error) {
    res.status(400).text(error);
  }
}