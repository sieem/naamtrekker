import { sign } from 'jsonwebtoken';
import { addLoggedInStateToName, removeLoggedInStateToName } from '../services/db.service';
import { generateHash } from "../utils/generateHash.util";
import { secretKey } from '../utils/secretKey.util';

export const login = async (req, res) => {
  const name = req.body.name;
  
  if (name === '') {
    return res.status(400);
  }

  try {
    const hash = await generateHash(name);
    const status = await addLoggedInStateToName(name);

    if (status) {
      const payload = { name, hash };
      const token = sign(payload, secretKey(), { expiresIn: '180 days' });
      return res.status(200).send({ token });
    }
    else {
      console.error(`${name} already logged in`)
      return res.status(401).json({ error: 'Already logged in' });
    }


  } catch (error) {
    console.error(error);
    return res.status(400);
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
