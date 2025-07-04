#!/bin/bash

echo "🔧 Configurando servidor para Lucio Academy..."

# Actualizar sistema
echo "📦 Actualizando sistema..."
apt update && apt upgrade -y

# Instalar Node.js 18+
echo "📦 Instalando Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instalar PM2
echo "📦 Instalando PM2..."
npm install -g pm2

# Instalar Nginx
echo "📦 Instalando Nginx..."
apt install nginx -y

# Instalar Certbot para SSL
echo "📦 Instalando Certbot..."
apt install certbot python3-certbot-nginx -y

# Instalar TypeScript
echo "📦 Instalando TypeScript..."
npm install -g typescript ts-node

# Configurar firewall
echo "🔥 Configurando firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable

# Crear directorio del proyecto
echo "📁 Creando directorio del proyecto..."
mkdir -p /root/LucioAcademy

echo "✅ Configuración del servidor completada!"
echo "📝 Próximos pasos:"
echo "1. Clonar el repositorio: git clone https://github.com/tu-usuario/lucio-academy.git /root/LucioAcademy"
echo "2. Configurar variables de entorno"
echo "3. Instalar dependencias"
echo "4. Configurar Nginx"
echo "5. Obtener certificado SSL"
echo "6. Iniciar servicios con PM2" 