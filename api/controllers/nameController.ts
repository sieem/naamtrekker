import { getChosenName, getOwnNameViaGuid, setChosenName } from '../services/db.service';
import { chooseName } from '../services/chooseName.service';

export const getOwnName = async (req, res) => {
  try {
    const name = await getOwnNameViaGuid(req.params.guid);
    res.status(200).json({ name });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}

export const seeName = async (req, res) => {
  try {
    let chosenName = await getChosenName(req.name);
    if (!chosenName) {
      chosenName = await chooseName(req.name);
      await setChosenName(req.name, chosenName);
    }
    res.status(200).json({ chosenName });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}