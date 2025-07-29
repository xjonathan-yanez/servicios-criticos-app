import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Farmacia = sequelize.define('Farmacia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100]
      }
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[+]?[(]?[\d\s\-\(\)]{7,15}$/
      }
    },
    horario_apertura: {
      type: DataTypes.TIME,
      allowNull: false
    },
    horario_cierre: {
      type: DataTypes.TIME,
      allowNull: false
    },
    latitud: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        min: -90,
        max: 90
      }
    },
    longitud: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        min: -180,
        max: 180
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    indexes: [
      {
        fields: ['latitud', 'longitud']
      },
      {
        fields: ['activo']
      }
    ]
  })

  return Farmacia
}
