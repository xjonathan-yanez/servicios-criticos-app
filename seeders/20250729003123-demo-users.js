'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10)

    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@servicios-criticos.com',
        password: hashedPassword,
        role: 'super_usuario',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'ciudadano1',
        email: 'ciudadano1@email.com',
        password: hashedPassword,
        role: 'ciudadano',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
