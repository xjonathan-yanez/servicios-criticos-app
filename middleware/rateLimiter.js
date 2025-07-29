import rateLimit from 'express-rate-limit'

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: message || 'Demasiadas solicitudes, intenta más tarde'
    },
    standardHeaders: true,
    legacyHeaders: false
  })
}

// Rate limiters específicos
export const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutos
  5, // 5 intentos máximo
  'Demasiados intentos de autenticación'
)

export const generalLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutos
  100 // 100 solicitudes máximo
)
