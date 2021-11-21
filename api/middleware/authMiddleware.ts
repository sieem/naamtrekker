import { getOwnNameViaGuid } from "../services/db.service";

export const verifyGuid = async (req, res, next) => {
  if (!req.headers.guid) {
    return res.status(401).send({ error: 'Unauthorized request'});
  }

  req.name = await getOwnNameViaGuid(req.headers.guid);
  
  if (!req.name) {
    return res.status(401).send({ error: 'Unauthorized request' });
  }

  next();
}