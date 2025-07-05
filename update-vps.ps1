# Script para actualizar VPS desde Windows PowerShell
Write-Host "🚀 Iniciando actualización del VPS con cambios de GitHub..." -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan

# Configuración
$VPS_IP = ""
$VPS_USER = "root"

# Solicitar IP del VPS si no está configurada
if ([string]::IsNullOrEmpty($VPS_IP)) {
    $VPS_IP = Read-Host "📝 Por favor ingresa la IP de tu VPS"
}

Write-Host "🔗 Conectando a $VPS_USER@$VPS_IP..." -ForegroundColor Yellow

# Comandos para ejecutar en el VPS
$commands = @"
echo "📥 Actualizando código desde GitHub..."
cd /root/LucioAcademy

# Verificar si hay cambios pendientes
if [ -n "\$(git status --porcelain)" ]; then
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
"@

# Ejecutar comandos en el VPS
Write-Host "⏳ Ejecutando comandos en el VPS..." -ForegroundColor Yellow
ssh $VPS_USER@$VPS_IP $commands

Write-Host "🎉 ¡Proceso completado!" -ForegroundColor Green
Write-Host "📱 Verifica que tu aplicación esté funcionando correctamente." -ForegroundColor Cyan 