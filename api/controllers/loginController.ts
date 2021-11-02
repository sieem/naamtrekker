import { sign } from 'jsonwebtoken';
import { addLoggedInStateToName, removeLoggedInStateToName } from '../services/db.service';
import { generateHash } from "../utils/generateHash.util";
import { secretKey } from '../utils/secretKey.util';

export const login = async (req, res) => {
  const name = req.body.name;

  try {
    const hash = await generateHash(name);
    await addLoggedInStateToName(name);

    const payload = { name, hash }
    const token = sign(payload, secretKey())
    return res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}

export const logout = async (req, res) => {
  const name = req.name;

  try {
    await removeLoggedInStateToName(name);


    return res.status(200).send({ status: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}
