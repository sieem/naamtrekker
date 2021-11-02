import { getAvailableNames } from './db.service';
export const chooseName = async (ownName: string): Promise<string> => {
  const availableNames = await getAvailableNames();
  const namesToChooseFrom = availableNames.filter((name) => name !== ownName);

  const chosenName = namesToChooseFrom[Math.round(Math.random() * namesToChooseFrom.length - 1)];

  return chosenName;
} 