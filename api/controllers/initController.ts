import { chooseNamesWithRetry } from "../services/chooseName.service";
import { dbService } from "../services/db.service";

export const initYear = async (req, res) => {
  try {
    if (!req.body.year) {
      return res.status(400).json({ message: 'Year is required' });
    }

    if (isNaN(parseInt(req.body.year))) {
      return res.status(400).json({ message: 'Year must be a number' });
    }

    if (req.body.year.toString().length !== 4) {
      return res.status(400).json({ message: 'Year must be 4 digits' });
    }
    await dbService.clearYear(parseInt(req.body.year));
    await dbService.initYear(parseInt(req.body.year));
    await chooseNamesWithRetry(parseInt(req.body.year));
    res.status(200).json({ message: 'Year initialized successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to initialize year' + error });
  }
}