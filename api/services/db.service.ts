import { Sequelize, Model, DataTypes, Op } from 'sequelize';
const sequelize = new Sequelize('sqlite:api/naamtrekker.sqlite');

interface IName {
  name: string;
  hash: string;
  chosenName: string;
}

export class Name extends Model { }

export const initDb = async () =>  {
  Name.init({
    name: DataTypes.STRING,
    hash: DataTypes.STRING,
    chosenName: DataTypes.STRING,
  }, { sequelize, modelName: 'name' });

  await addName({ name: 'Siem' });
  await addName({ name: 'Han' });
  await addName({ name: 'Fen' });
  await addName({ name: 'Lien' });
  await addName({ name: 'An' });
  await addName({ name: 'David' });
}

export const addName = async (name) => {
  await sequelize.sync();
  const record = await Name.create({ name });
  return record.toJSON();
}

export const addHashToName = async (name, hash) => {
  await sequelize.sync();
  const [id, record] = await Name.update({ hash }, { where: { name } });
  return record[0].toJSON();
}

export const setChosenName = async (name, chosenName) => {
  await sequelize.sync();
  const [id, record] = await Name.update({ chosenName }, { where: { name }});
  return record[0].toJSON();
}

export const getUnhashedNames = async () => {
  await sequelize.sync();
  const records = await Name.findAll({ where: { hash: { [Op.not]: null } }});
  return records.map((record) => record.toJSON());
}

export const getChosenName = async (hash) => {
  await sequelize.sync();
  const record = await Name.findOne({where: { hash }});
  const { chosenName } = record.toJSON() as IName;
  return chosenName;
}
