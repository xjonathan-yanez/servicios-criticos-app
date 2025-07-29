import express from 'express'
import { body } from 'express-validator'
import { register, login } from '../controllers/authController.js'
import { validateRequest } from '../middleware/validation.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

// Aplicar rate limiting a todas las rutas de auth
router.use(authLimiter)

// Registro de usuario
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username debe tener entre 3 y 50 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username solo puede contener letras, números y guiones bajos'),
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password debe contener al menos una mayúscula, una minúscula y un número'),
  body('role')
    .optional()
    .isIn(['ciudadano', 'super_usuario'])
    .withMessage('Rol inválido'),
  validateRequest
], register)

// Login de usuario
router.post('/login', [
  body('username')
    .notEmpty()
    .withMessage('Username es requerido')
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password es requerido'),
  validateRequest
], login)

export default router
