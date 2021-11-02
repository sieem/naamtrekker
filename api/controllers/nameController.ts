import { getChosenName, getLoggedOutNames, setChosenName } from '../services/db.service';
import { chooseName } from '../services/chooseName.service';

export const getNames = async (req, res) => {
  try {
    const names = await getLoggedOutNames()
    res.status(200).json(names);
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