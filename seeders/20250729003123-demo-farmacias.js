'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Farmacias', [
      {
        nombre: 'Farmacia Central',
        direccion: 'Av. Libertador 1234, Santiago Centro',
        telefono: '+56 2 2345 6789',
        horario_apertura: '08:00:00',
        horario_cierre: '22:00:00',
        latitud: -33.4489,
        longitud: -70.6693,
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Farmacia Las Condes',
        direccion: 'Av. Apoquindo 3000, Las Condes',
        telefono: '+56 2 2987 6543',
        horario_apertura: '09:00:00',
        horario_cierre: '21:00:00',
        latitud: -33.4055,
        longitud: -70.5811,
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Farmacia Providencia',
        direccion: 'Av. Providencia 1500, Providencia',
        telefono: '+56 2 2234 5678',
        horario_apertura: '08:30:00',
        horario_cierre: '23:00:00',
        latitud: -33.4264,
        longitud: -70.6128,
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Farmacias', null, {})
  }
}
