'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Farmacias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direccion: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: false
      },
      horario_apertura: {
        type: Sequelize.TIME,
        allowNull: false
      },
      horario_cierre: {
        type: Sequelize.TIME,
        allowNull: false
      },
      latitud: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: false
      },
      longitud: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: false
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    // Agregar índices
    await queryInterface.addIndex('Farmacias', ['latitud', 'longitud'])
    await queryInterface.addIndex('Farmacias', ['activo'])
    await queryInterface.addIndex('Farmacias', ['nombre'])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Farmacias')
  }
}
