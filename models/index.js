import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import createUserModel from './User.js'
import createFarmaciaModel from './Farmacia.js'

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
)

// Inicializar modelos
const User = createUserModel(sequelize)
const Farmacia = createFarmaciaModel(sequelize)

// Definir relaciones si las hay
// User.hasMany(Farmacia, { foreignKey: 'userId' });
// Farmacia.belongsTo(User, { foreignKey: 'userId' });

export {
  sequelize,
  User,
  Farmacia
}
