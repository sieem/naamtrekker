import { dbService } from './services/db.service';
import { chooseNamesWithRetry } from './services/chooseName.service';
import { allNames } from './utils/allNames.utils';


(async () => {
  await dbService.initDb();
  await dbService.clearDb();
  
  for (let year = 2020; year < 2200; year++) {
    console.log(`Start test: ${year}`)
    await dbService.initYear(year);
    await chooseNamesWithRetry(year);

    const combos: Record<string, string> = {};
    
    for (let name of allNames) {
      const chosenName = await dbService.getChosenName(name, year);

      combos[name] = chosenName;
      console.log(`${name} => ${chosenName}`);
    }
    
    for (let name of allNames) {
      const chosenNameLastYear = await dbService.getChosenName(name, year - 1);

      if (combos[name] === chosenNameLastYear) {
        throw `same name as last year: ${name} => ${chosenNameLastYear}`;  
      }
    }
  }
})()