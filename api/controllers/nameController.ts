import { getChosenName, setChosenName, getUnhashedNames } from "../services/db.service";

export const getNames = async (req, res) => {
  try {
    const names = await getUnhashedNames()
    res.status(200).json(names);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}

export const seeName = async (req, res) => {
  try {
    const chosenName = await getChosenName(req.name)
    res.status(200).json({ chosenName });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}