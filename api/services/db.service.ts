import { Sequelize, Model, DataTypes, Op } from 'sequelize';
import { generateHash } from '../utils/generateHash.util';
import { loggedIn } from '../../src/services/auth.service';
const sequelize = new Sequelize('sqlite:api/naamtrekker.sqlite');

interface IName {
  name: string;
  loggedIn: boolean;
  chosenName: string;
}

export class Name extends Model { }

export const initDb = async () =>  {
  Name.init({
    name: DataTypes.STRING,
    loggedIn: DataTypes.BOOLEAN,
    chosenName: DataTypes.STRING,
  }, { sequelize, modelName: 'name' });
}

export const populateDb = async () => {
  await addName('Siem');
  await addName('Han');
  await addName('Fen');
  await addName('Lien');
  await addName('An');
  await addName('David');
}

export const addName = async (name) => {
  await sequelize.sync();
  const record = await Name.create({ name, loggedIn: false });
  return record.toJSON();
}

export const addLoggedInStateToName = async (name) => {
  await sequelize.sync();
  await Name.update({ loggedIn: true }, { where: { name } });
  return;
}

export const removeLoggedInStateToName = async (name) => {
  await sequelize.sync();
  await Name.update({ loggedIn: false }, { where: { name } });
  return;
}

export const setChosenName = async (name, chosenName) => {
  await sequelize.sync();
  await Name.update({ chosenName }, { where: { name }});
  return;
}

export const getAvailableUsers = async () => {
  await sequelize.sync();
  const records = await Name.findAll({ where: { loggedIn: false }});
  return records.map((record) => record.toJSON());
}

export const getChosenName = async (name: IName['name']) => {
  await sequelize.sync();
  const record = await Name.findOne({where: { name }});
  const { chosenName } = record.toJSON() as IName;
  return chosenName;
}
