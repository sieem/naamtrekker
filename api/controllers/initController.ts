import { appendFileSync } from "fs";
import { chooseNamesWithRetry } from "../services/chooseName.service";
import { dbService } from "../services/db.service";
import { allNames } from "../utils/allNames.utils";

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

    const year = parseInt(req.body.year);
    await dbService.clearYear(year);
    await dbService.initYear(year);
    await chooseNamesWithRetry(year);
    for (let name of allNames) {
      const nameGuid = await dbService.getGuidByName(name, year);
      appendFileSync(`namen${year}.txt`, `${name}: https://home.sieem.be/naamtrekker/?guid=${nameGuid}\n`, 'utf8');
    }
    res.status(200).json({ message: 'Year initialized successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to initialize year' + error });
  }
}