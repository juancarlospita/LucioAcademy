# Script simple para actualizar VPS
Write-Host "Iniciando actualizacion del VPS..." -ForegroundColor Green

# Solicitar IP del VPS
$VPS_IP = Read-Host "Ingresa la IP de tu VPS"
$VPS_USER = "root"

Write-Host "Conectando a $VPS_USER@$VPS_IP..." -ForegroundColor Yellow

# Comandos para ejecutar en el VPS
$commands = @"
echo 'Actualizando codigo desde GitHub...'
cd /root/LucioAcademy
git pull origin main
echo 'Actualizando backend...'
cd server
npm install
npm run build
pm2 restart backend
echo 'Actualizando frontend...'
cd ../client
npm install
npm run build
pm2 restart frontend
echo 'Verificando estado...'
pm2 status
echo 'Actualizacion completada!'
"@

# Ejecutar comandos en el VPS
Write-Host "Ejecutando comandos en el VPS..." -ForegroundColor Yellow
ssh $VPS_USER@$VPS_IP $commands

Write-Host "Proceso completado!" -ForegroundColor Green 