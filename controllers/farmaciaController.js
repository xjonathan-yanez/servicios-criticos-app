import { Farmacia } from '../models/index.js'
import { Op } from 'sequelize'

export const getFarmacias = async (req, res) => {
  try {
    const { activo = true, limite = 50, pagina = 1 } = req.query
    
    const offset = (pagina - 1) * limite
    
    const whereClause = {}
    if (activo !== undefined) {
      whereClause.activo = activo === 'true'
    }

    const farmacias = await Farmacia.findAndCountAll({
      where: whereClause,
      limit: parseInt(limite),
      offset: parseInt(offset),
      order: [['nombre', 'ASC']]
    })

    res.json({
      farmacias: farmacias.rows,
      total: farmacias.count,
      pagina: parseInt(pagina),
      totalPaginas: Math.ceil(farmacias.count / limite)
    });
  } catch (error) {
    console.error('Error al obtener farmacias:', error)
    res.status(500).json({ error: 'Error al obtener farmacias' })
  }
}

export const getFarmaciaById = async (req, res) => {
  try {
    const { id } = req.params
    
    const farmacia = await Farmacia.findByPk(id)
    
    if (!farmacia) {
      return res.status(404).json({ error: 'Farmacia no encontrada' })
    }
    
    res.json(farmacia)
  } catch (error) {
    console.error('Error al obtener farmacia:', error)
    res.status(500).json({ error: 'Error al obtener farmacia' })
  }
}

export const createFarmacia = async (req, res) => {
  try {
    const farmacia = await Farmacia.create(req.body)
    res.status(201).json({
      message: 'Farmacia creada exitosamente',
      farmacia
    })
  } catch (error) {
    console.error('Error al crear farmacia:', error)
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Datos de farmacia inválidos',
        detalles: error.errors.map(e => e.message)
      })
    }
    res.status(500).json({ error: 'Error al crear farmacia' })
  }
}

export const updateFarmacia = async (req, res) => {
  try {
    const { id } = req.params
    
    const farmacia = await Farmacia.findByPk(id)
    if (!farmacia) {
      return res.status(404).json({ error: 'Farmacia no encontrada' })
    }

    await farmacia.update(req.body)
    
    res.json({
      message: 'Farmacia actualizada exitosamente',
      farmacia
    })
  } catch (error) {
    console.error('Error al actualizar farmacia:', error)
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Datos de farmacia inválidos',
        detalles: error.errors.map(e => e.message)
      })
    }
    res.status(500).json({ error: 'Error al actualizar farmacia' })
  }
}

export const deleteFarmacia = async (req, res) => {
  try {
    const { id } = req.params
    
    const farmacia = await Farmacia.findByPk(id)
    if (!farmacia) {
      return res.status(404).json({ error: 'Farmacia no encontrada' })
    }

    await farmacia.destroy()
    
    res.json({ message: 'Farmacia eliminada exitosamente' })
  } catch (error) {
    console.error('Error al eliminar farmacia:', error)
    res.status(500).json({ error: 'Error al eliminar farmacia' })
  }
}