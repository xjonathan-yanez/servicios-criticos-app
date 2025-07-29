// Es mejor práctica depender de las variables de entorno inyectadas por Docker/shell
// para las credenciales de la base de datos, en lugar de un archivo .env para sequelize-cli.
// La aplicación principal aún puede usar dotenv para otras configuraciones.
// require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'servicios_criticos_db',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5434,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: 'servicios_criticos_test',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5434,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    dialect: 'postgres',
    logging: false
  }
}
