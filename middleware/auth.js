import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Token de acceso requerido' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.id)
    
    if (!user) {
      return res.status(401).json({ error: 'Usuario no válido' })
    }
    
    req.user = user
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' })
    }
    return res.status(403).json({ error: 'Token inválido' })
  }
}

export const requireSuperUsuario = (req, res, next) => {
  if (req.user.role !== 'super_usuario') {
    return res.status(403).json({ 
      error: 'Acceso denegado: Se requiere rol de super usuario' 
    })
  }
  next()
}
