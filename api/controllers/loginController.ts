import { sign } from 'jsonwebtoken';
import { addHashToName } from '../services/db.service';
import { generateHash } from "../utils/generateHash.util";
import { secretKey } from '../utils/secretKey.util';

export const login = async (req, res) => {
  const name = req.body.name;

  try {
    const hash = await generateHash(name);
    await addHashToName(name, hash);

    // TODO: setChosenName(name, 'chosenName');

    const payload = { name, hash }
    const token = sign(payload, secretKey())
    return res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}
