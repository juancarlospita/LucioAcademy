#!/bin/bash

echo "🚀 Iniciando actualización del VPS con cambios de GitHub..."
echo "=================================================="

# Configuración
VPS_IP=""
VPS_USER="root"
PROJECT_PATH="/root/LucioAcademy"

# Solicitar IP del VPS si no está configurada
if [ -z "$VPS_IP" ]; then
    echo "📝 Por favor ingresa la IP de tu VPS:"
    read -p "IP del VPS: " VPS_IP
fi

echo "🔗 Conectando a $VPS_USER@$VPS_IP..."

# Comandos para ejecutar en el VPS
ssh $VPS_USER@$VPS_IP << 'EOF'
echo "📥 Actualizando código desde GitHub..."
cd /root/LucioAcademy

# Verificar si hay cambios pendientes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Hay cambios locales no guardados. Haciendo stash..."
    git stash
fi

# Obtener los últimos cambios
git fetch origin
git pull origin main

echo "🔧 Actualizando dependencias del backend..."
cd server
npm install

echo "🏗️  Compilando backend..."
npm run build

echo "🔄 Reiniciando backend..."
pm2 restart backend

echo "🎨 Actualizando dependencias del frontend..."
cd ../client
npm install

echo "🏗️  Compilando frontend..."
npm run build

echo "🔄 Reiniciando frontend..."
pm2 restart frontend

echo "📊 Verificando estado de los servicios..."
pm2 status

echo "✅ Actualización completada exitosamente!"
echo "🌐 Tu aplicación debería estar actualizada en: http://$VPS_IP"
EOF

echo "🎉 ¡Proceso completado!"
echo "📱 Verifica que tu aplicación esté funcionando correctamente." 