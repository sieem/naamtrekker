import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import { allNames } from '../utils/allNames.utils';
import { stringToBase64, base64ToString } from '../utils/base64.util';
const sequelize = new Sequelize('sqlite:api/naamtrekker.sqlite');

interface IName {
  name: string;
  loggedIn: boolean;
  chosenName: string;
  isChosen: boolean;
}

export class Name extends Model { }

export const initDb = async () =>  {
  Name.init({
    name: DataTypes.STRING,
    loggedIn: DataTypes.BOOLEAN,
    chosenName: DataTypes.STRING,
    isChosen: DataTypes.BOOLEAN,
  }, { sequelize, modelName: 'name' });
}

export const populateDb = async () => {
  for (const name of allNames) {
    await addName(name);
  }
}

export const addName = async (name) => {
  await sequelize.sync();
  const record = await Name.create({ name, loggedIn: false, isChosen: false });
  return record.toJSON();
}

export const addLoggedInStateToName = async (name): Promise<void> => {
  await sequelize.sync();
  await Name.update({ loggedIn: true }, { where: { name } });
  return;
}

export const removeLoggedInStateToName = async (name): Promise<void> => {
  await sequelize.sync();
  await Name.update({ loggedIn: false }, { where: { name } });
  return;
}

export const setChosenName = async (name: string, chosenName: string) => {
  await sequelize.sync();
  await Name.update({ chosenName: stringToBase64(chosenName) }, { where: { name }});
  await Name.update({ isChosen: 1 }, { where: { name: chosenName } });
  return;
}

export const getLoggedOutNames = async (): Promise<IName[]> => {
  await sequelize.sync();
  const records = await Name.findAll({ where: { loggedIn: false }});
  return records.map((record) => record.toJSON()) as IName[];
}

export const getAvailableNames = async (): Promise<IName['name'][]> => {
  await sequelize.sync();
  const records = await Name.findAll({ where: { isChosen: false } });
  return records.map((record) => (record.toJSON() as IName).name);
}

export const getChosenNames = async (): Promise<IName['name'][]> => {
  await sequelize.sync();
  const records = await Name.findAll({ where: { chosenName: { [Op.not]: null} } });
  return records.map((record) => (record.toJSON() as IName).name);
}

export const getChosenName = async (name: IName['name']): Promise<IName['chosenName']> => {
  await sequelize.sync();
  const record = await Name.findOne({where: { name }});
  const { chosenName } = record.toJSON() as IName;

  return chosenName ? base64ToString(chosenName) : null;
}

export const clearDb = async (): Promise<void> => {
  await sequelize.sync();
  await Name.destroy({ truncate: true });
}
