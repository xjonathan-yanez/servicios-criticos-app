import express from 'express'
import { body, param, query } from 'express-validator'
import {
  getFarmacias,
  getFarmaciaById,
  createFarmacia,
  updateFarmacia,
  deleteFarmacia
} from '../controllers/farmaciaController.js'
import { authenticateToken, requireSuperUsuario } from '../middleware/auth.js'
import { validateRequest } from '../middleware/validation.js'
import { generalLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

// Aplicar rate limiting
router.use(generalLimiter)

// Validaciones comunes para farmacia
const farmaciaValidations = [
  body('nombre')
    .notEmpty()
    .withMessage('Nombre es requerido')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nombre debe tener entre 3 y 100 caracteres'),
  body('direccion')
    .notEmpty()
    .withMessage('Dirección es requerida'),
  body('telefono')
    .notEmpty()
    .withMessage('Teléfono es requerido')
    .matches(/^[+]?[(]?[\d\s\-\(\)]{7,15}$/)
    .withMessage('Formato de teléfono inválido'),
  body('horario_apertura')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Horario de apertura inválido (formato HH:MM)'),
  body('horario_cierre')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Horario de cierre inválido (formato HH:MM)'),
  body('latitud')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitud debe estar entre -90 y 90'),
  body('longitud')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitud debe estar entre -180 y 180'),
  body('activo')
    .optional()
    .isBoolean()
    .withMessage('Activo debe ser true o false')
]

// Rutas públicas para usuarios autenticados
router.get('/', [
  authenticateToken,
  query('limite')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Límite debe estar entre 1 y 100'),
  query('pagina')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página debe ser mayor a 0'),
  validateRequest
], getFarmacias)

router.get('/:id', [
  authenticateToken,
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo'),
  validateRequest
], getFarmaciaById)

// Rutas solo para super usuarios
router.post('/', [
  authenticateToken,
  requireSuperUsuario,
  ...farmaciaValidations,
  validateRequest
], createFarmacia)

router.put('/:id', [
  authenticateToken,
  requireSuperUsuario,
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo'),
  ...farmaciaValidations.map(validation => validation.optional()),
  validateRequest
], updateFarmacia)

router.delete('/:id', [
  authenticateToken,
  requireSuperUsuario,
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID debe ser un número entero positivo'),
  validateRequest
], deleteFarmacia)

export default router