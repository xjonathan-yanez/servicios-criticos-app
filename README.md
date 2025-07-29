# 📋 README.md completo
# Servicios Críticos API

API REST para la gestión de servicios críticos de emergencia, específicamente farmacias.

## 🚀 Características

- **Autenticación JWT** con roles diferenciados
- **CRUD completo** para gestión de farmacias
- **Base de datos PostgreSQL** con Sequelize ORM
- **Middleware de seguridad** integrado
- **Validación de datos** con express-validator
- **Rate limiting** para protección contra ataques
- **Dev Container** para desarrollo consistente

## 📋 Requisitos

- Node.js 18+
- PostgreSQL 12+
- Docker (para Dev Containers)

## 🛠️ Instalación

### Usando Dev Container (Recomendado)
1. Abrir proyecto en VSCode
2. Instalar extensión "Dev Containers"
3. Ejecutar: `Dev Containers: Reopen in Container`

### Instalación Manual
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/servicios-criticos-app.git
cd servicios-criticos-app

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Inicializar base de datos
# Opción 1: Con Sequelize CLI (puede tener problemas con ES6)
npm run db:reset

# Opción 2: Script personalizado (recomendado para ES6)
npm run init-db

# Iniciar servidor
npm run dev
