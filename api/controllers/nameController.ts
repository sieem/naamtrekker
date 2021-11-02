import { getChosenName, setChosenName, getUnhashedNames } from "../services/db.service";

export const getNames = async (req, res) => {
  try {
    const names = await getUnhashedNames()
    res.status(200).json(names);
  } catch (error) {
    res.status(400).text(error);
  }
}

export const seeName = async (req, res) => {
  try {
    const chosenName = await getChosenName(req.name)
    res.status(200).json({ chosenName });
  } catch (error) {
    res.status(400).text(error);
  }
}