import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
import { User } from '../models/index.js'

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [{ username }, { email }] 
      } 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Usuario o email ya existe' 
      });
    }

    // Crear nuevo usuario
    const user = await User.create({ 
      username, 
      email, 
      password, 
      role: role || 'ciudadano' 
    });
    
    // Generar token
    const token = generateToken(user);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    
    // Buscar usuario
    const user = await User.findOne({ where: { username } })
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' })
    }

    // Validar contraseña
    const isValidPassword = await user.validatePassword(password)
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Credenciales inválidas' })
    }

    // Generar token
    const token = generateToken(user)

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
