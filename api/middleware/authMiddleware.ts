import { dbService } from "../services/db.service";

export const verifyGuid = async (req, res, next) => {
  if (!req.headers.guid) {
    return res.status(401).send({ error: 'Unauthorized request'});
  }

  const year = new Date().getFullYear();
  req.name = await dbService.getOwnNameViaGuid(req.headers.guid, year);
  
  if (!req.name) {
    return res.status(401).send({ error: 'Unauthorized request' });
  }

  next();
}