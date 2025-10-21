import { dbService } from './services/db.service';
import { chooseNamesWithRetry } from './services/chooseName.service';


(async () => {
  await dbService.initDb();
  await dbService.clearDb();
  
  for (let i = 2020; i < 2200; i++) {
    console.log(`Start test: ${i}`)
    await dbService.initYear(i);
    await chooseNamesWithRetry(i);
  }
})()