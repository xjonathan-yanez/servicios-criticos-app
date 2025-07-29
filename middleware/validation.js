import { validationResult } from 'express-validator'

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Datos de entrada inválidos',
      detalles: errors.array().map(error => ({
        campo: error.path,
        mensaje: error.msg,
        valor: error.value
      }))
    })
  }
  
  next()
}