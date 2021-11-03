import { getAvailableNames, getChosenNames } from './db.service';
export const chooseName = async (ownName: string): Promise<string> => {
  const availableNames = await getAvailableNames();
  const chosenNames = await getChosenNames();
  const namesToChooseFrom = availableNames.filter((name) => name !== ownName);

  if (namesToChooseFrom.length === 1) {
    return namesToChooseFrom[0];
  }

  if (namesToChooseFrom.length === 2 && !(chosenNames.includes(namesToChooseFrom[0]) && chosenNames.includes(namesToChooseFrom[1]))) {
    return !chosenNames.includes(namesToChooseFrom[0]) ? namesToChooseFrom[0] : namesToChooseFrom[1];
  }

  return namesToChooseFrom[Math.abs(Math.round(Math.random() * namesToChooseFrom.length - 1))];
}