import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import { sequelize } from './models/index.js'
import authRoutes from './routes/auth.js'
import farmaciaRoutes from './routes/farmacias.js'
import { generalLimiter } from './middleware/rateLimiter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-dominio.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}))

// Middleware de parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rate limiting global
app.use(generalLimiter)

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Rutas principales
app.use('/api/auth', authRoutes)
app.use('/api/farmacias', farmaciaRoutes)

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API Servicios Críticos funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Ruta raíz con información de la API
app.get('/', (req, res) => {
  res.json({
    message: 'API Servicios Críticos - Emergencia 24/7',
    version: '1.0.0',
    documentacion: 'https://github.com/tu-usuario/servicios-criticos-app',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      farmacias: {
        listar: 'GET /api/farmacias',
        obtener: 'GET /api/farmacias/:id',
        crear: 'POST /api/farmacias (super_usuario)',
        actualizar: 'PUT /api/farmacias/:id (super_usuario)',
        eliminar: 'DELETE /api/farmacias/:id (super_usuario)'
      },
      health: 'GET /health'
    }
  })
})

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    method: req.method
  })
})

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err)
  
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido en el cuerpo de la solicitud' })
  }
  
  res.status(err.status || 500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : err.message 
  })
})

// Función para inicializar servidor
const startServer = async () => {
  try {
    // Verificar conexión a la base de datos
    await sequelize.authenticate()
    console.log('✅ Conexión a la base de datos establecida')
    
    // Sincronizar modelos (en desarrollo)
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true })
      console.log('✅ Modelos sincronizados')
    }
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
      console.log(`📋 Documentación: http://localhost:${PORT}`)
      console.log(`🏥 Health check: http://localhost:${PORT}/health`)
    })
  } catch (error) {
    console.error('❌ Error al inicializar servidor:', error)
    process.exit(1)
  }
}

// Manejo de señales para cierre graceful
process.on('SIGTERM', async () => {
  console.log('🔄 Cerrando servidor gracefully...')
  await sequelize.close()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('🔄 Cerrando servidor gracefully...')
  await sequelize.close()
  process.exit(0)
})

startServer()
