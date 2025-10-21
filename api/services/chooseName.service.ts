import { allNames } from '../utils/allNames.utils';
import { dbService } from '../services/db.service';

const chooseName = async (ownName: string, year: number): Promise<string> => {
  const availableNames = await dbService.getAvailableNames(year);
  const chosenNameLastYear = await dbService.getChosenName(ownName, year - 1);
  const namesToChooseFrom = availableNames.filter((name) => name !== ownName && name !== chosenNameLastYear);

  if (namesToChooseFrom.length === 1) {
    return namesToChooseFrom[0];
  }

  return namesToChooseFrom[Math.abs(Math.round(Math.random() * namesToChooseFrom.length - 1))];
}

const chooseNames = async (year: number): Promise<void> => {
  for (const name of allNames) {
    const chosenName = await chooseName(name, year);

    if (!chosenName) {
      throw `Last person didn't receive a name`;
    }

    await dbService.setChosenName(name, chosenName, year);
  }
}

export const chooseNamesWithRetry = async (year: number, maxRetries: number = 100) => {
  let attempts = 0;
  let lastError: string = '';

  while (attempts < maxRetries) {
    try {
      await chooseNames(year);
      console.log(`✓ Year ${year} completed successfully on attempt ${attempts + 1}`);
      return;
    } catch (error) {
      lastError = error as string;
      attempts++;
      console.log(`✗ Year ${year} attempt ${attempts} failed: ${error}. Retrying...`);
      await dbService.clearYear(year);
      await dbService.initYear(year);
    }
  }

  throw `Failed to assign names for year ${year} after ${maxRetries} attempts. Last error: ${lastError}`;
}