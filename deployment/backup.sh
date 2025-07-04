#!/bin/bash

echo "💾 Iniciando backup de Lucio Academy..."

# Configuración
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
PROJECT_DIR="/root/LucioAcademy"

# Crear directorio de backup si no existe
mkdir -p $BACKUP_DIR

# Backup del código
echo "📦 Haciendo backup del código..."
tar -czf $BACKUP_DIR/lucio-academy-code-$DATE.tar.gz -C /root LucioAcademy

# Backup de la configuración de Nginx
echo "🌐 Haciendo backup de Nginx..."
cp /etc/nginx/sites-available/lucioacademyfx.com $BACKUP_DIR/nginx-config-$DATE

# Backup de la configuración de PM2
echo "🚀 Haciendo backup de PM2..."
pm2 save
cp ~/.pm2/dump.pm2 $BACKUP_DIR/pm2-dump-$DATE

# Backup de certificados SSL (solo referencias, no los archivos reales)
echo "🔒 Haciendo backup de configuración SSL..."
certbot certificates > $BACKUP_DIR/ssl-certificates-$DATE.txt

# Backup de variables de entorno (sin secretos)
echo "⚙️ Haciendo backup de configuración..."
cp $PROJECT_DIR/client/.env $BACKUP_DIR/frontend-env-$DATE 2>/dev/null || echo "Frontend .env no encontrado"
cp $PROJECT_DIR/server/.env $BACKUP_DIR/backend-env-$DATE 2>/dev/null || echo "Backend .env no encontrado"

# Limpiar backups antiguos (mantener solo los últimos 7 días)
echo "🧹 Limpiando backups antiguos..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "nginx-config-*" -mtime +7 -delete
find $BACKUP_DIR -name "pm2-dump-*" -mtime +7 -delete
find $BACKUP_DIR -name "ssl-certificates-*" -mtime +7 -delete
find $BACKUP_DIR -name "frontend-env-*" -mtime +7 -delete
find $BACKUP_DIR -name "backend-env-*" -mtime +7 -delete

echo "✅ Backup completado!"
echo "📁 Ubicación: $BACKUP_DIR"
echo "📊 Archivos creados:"
ls -la $BACKUP_DIR/*$DATE* 