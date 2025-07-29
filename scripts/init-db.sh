#!/bin/bash

echo "🔄 Inicializando base de datos..."

# Crear base de datos
createdb servicios_criticos_db 2>/dev/null || echo "Base de datos ya existe"

# Ejecutar migraciones
echo "📋 Ejecutando migraciones..."
npm run migrate

# Ejecutar seeds
echo "🌱 Ejecutando seeds..."
npm run seed

echo "✅ Base de datos inicializada correctamente"
