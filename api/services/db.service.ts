import { Sequelize, Model, DataTypes, Options } from 'sequelize';
import { allNames } from '../utils/allNames.utils';
import { stringToBase64, base64ToString } from '../utils/base64.util';
import { v4 as uuidv4 } from 'uuid';

interface IName {
  name: string;
  guid: string;
  chosenName: string;
  isChosen: boolean;
}

class Name extends Model { }

class DbService {
  private sequelize: Sequelize;

  constructor(database: string, options: Options) {
    this.sequelize = new Sequelize(database, options);
  }

  async initDb() {
    Name.init({
      name: DataTypes.STRING,
      guid: DataTypes.STRING,
      chosenName: DataTypes.STRING,
      isChosen: DataTypes.BOOLEAN,
      year: DataTypes.INTEGER,
    }, { sequelize: this.sequelize, modelName: 'name' });
    await this.sequelize.sync({ alter: true });
  }

  async initYear(year: number) {
    for (const name of allNames) {
      await this.addName(name, uuidv4(), year);
    }
  }

  async addName(name: string, guid: string, year: number) {
    const record = await Name.create({ name, guid, isChosen: false, year });
    return record.toJSON();
  }

  async setChosenName(name: string, chosenName: string, year: number) {
    await Name.update({ chosenName: stringToBase64(chosenName) }, { where: { name, year } });
    await Name.update({ isChosen: 1 }, { where: { name: chosenName, year } });
    return;
  }

  async getOwnNameViaGuid(guid: string, year: number): Promise<IName['name']> {
    const record = await Name.findOne({ attributes: ['name'], where: { guid, year } });
    const { name } = record ? record.toJSON() as IName : { name: null };
    return name;
  }

  async getAvailableNames(year: number): Promise<IName['name'][]> {
    const records = await Name.findAll({ where: { isChosen: false, year } });
    return records.map((record) => (record.toJSON() as IName).name);
  }

  async getChosenName(name: IName['name'], year: number): Promise<IName['chosenName']> {
    const record = await Name.findOne({ attributes: ['chosenName'], where: { name, year } });
    if (!record) {
      return null;
    }
    const { chosenName } = record.toJSON() as IName;

    return chosenName ? base64ToString(chosenName) : null;
  }

  async clearDb(): Promise<void> {
    await Name.destroy({ truncate: true });
  }

  async clearYear(year: number): Promise<void> {
    await Name.destroy({ where: { year } });
  }
}

export const dbService = new DbService('sqlite:api/naamtrekker.sqlite', {
  logging: false,
});
