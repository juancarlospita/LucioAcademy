#!/bin/bash

echo "🚀 Iniciando despliegue de Lucio Academy..."

# Ir al directorio del proyecto
cd /root/LucioAcademy

# Actualizar código desde Git
echo "📥 Actualizando código..."
git pull origin main

# Backend
echo "🔧 Configurando backend..."
cd server
npm install
npm run build
pm2 restart backend

# Frontend
echo "🎨 Configurando frontend..."
cd ../client
npm install
npm run build
pm2 restart frontend

echo "✅ Despliegue completado!"
pm2 status 