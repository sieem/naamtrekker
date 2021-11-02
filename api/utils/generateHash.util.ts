import { hash } from "bcrypt";
import { secretKey } from "../utils/secretKey.util";
const saltRounds = 10;

export const generateHash = (name) => new Promise((resolve, reject) => {
  hash(`${secretKey()}/${name}`, saltRounds, (err, hash) => {
    if (err) {
      console.error(err)
      return reject(err.message);
    }

    return resolve(hash);
  });
})