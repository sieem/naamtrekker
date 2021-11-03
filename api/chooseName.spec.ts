import { chooseName } from './services/chooseName.service';
import { initDb, populateDb, getChosenNames, setChosenName, clearDb } from './services/db.service';
import { allNames } from './utils/allNames.utils';

const chooseNameTest = async () => {
  await clearDb();
  await populateDb();

  for (const name of allNames) {
    const chosenName = await chooseName(name);
    console.log(name, '=>', chosenName);

    if (!chosenName) {
      throw `Last person didn't receive a name`;
    }

    await setChosenName(name, chosenName);
  }

  const chosenNames = await getChosenNames();
  if ([...new Set(chosenNames)].length !== chosenNames.length) {
    throw `Array has duplicates, not everyone has a unique name`;
  }
}

(async () => {
  await initDb();

  for (let i = 0; i < 100; i++) {
    console.log(`Start test: ${i}`)
    await chooseNameTest();
  }
})()