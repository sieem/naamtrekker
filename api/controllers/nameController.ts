import { dbService } from '../services/db.service';

export const getOwnName = async (req, res) => {
  try {
    res.status(200).json({ name: req.name });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}

export const seeName = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const chosenName = await dbService.getChosenName(req.name, year);
    res.status(200).json({ chosenName });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
}