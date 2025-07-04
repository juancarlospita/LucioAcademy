# Lucio Academy - Deployment Guide

## 🚀 Configuración del Servidor VPS

### Información del Servidor
- **IP**: 31.97.157.193
- **Dominio**: lucioacademyfx.com
- **Sistema**: Ubuntu 22.04 LTS

### Estructura del Proyecto
```
/root/LucioAcademy/
├── client/          # Frontend Next.js
├── server/          # Backend Express
└── deployment/      # Scripts y configuraciones
```

## 📋 Prerrequisitos

### 1. Instalar Dependencias del Sistema
```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instalar PM2
npm install -g pm2

# Instalar Nginx
apt install nginx -y

# Instalar Certbot para SSL
apt install certbot python3-certbot-nginx -y

# Instalar TypeScript
npm install -g typescript ts-node
```

### 2. Configurar Firewall
```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

## 🔧 Configuración del Proyecto

### 1. Clonar Repositorio
```bash
cd /root
git clone https://github.com/tu-usuario/lucio-academy.git LucioAcademy
cd LucioAcademy
```

### 2. Configurar Variables de Entorno

#### Frontend (.env)
```bash
cd client
cp .env.example .env
```

```env
NEXTAUTH_URL=https://lucioacademyfx.com
NEXTAUTH_SECRET=tu-secret-aqui
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret

# API URLs
NEXT_PUBLIC_API_URL=https://lucioacademyfx.com/api/v1
NEXT_PUBLIC_SOCKET_URL=wss://lucioacademyfx.com
```

#### Backend (.env)
```bash
cd ../server
cp .env.example .env
```

```env
PORT=8000
MONGODB_URL=tu-mongodb-url
JWT_SECRET=tu-jwt-secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=tu-email@gmail.com
SMTP_PASSWORD=tu-app-password
REDIS_URL=tu-redis-url
```

### 3. Instalar Dependencias
```bash
# Frontend
cd /root/LucioAcademy/client
npm install

# Backend
cd /root/LucioAcademy/server
npm install
```

## 🌐 Configuración de Nginx

### Archivo de Configuración Principal
```bash
nano /etc/nginx/sites-available/lucioacademyfx.com
```

```nginx
server {
    listen 80;
    server_name lucioacademyfx.com www.lucioacademyfx.com;
    
    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lucioacademyfx.com www.lucioacademyfx.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/lucioacademyfx.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lucioacademyfx.com/privkey.pem;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API
    location /api/v1/ {
        proxy_pass http://localhost:8000/api/v1/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # NextAuth routes (frontend)
    location /api/auth/ {
        proxy_pass http://localhost:3000/api/auth/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # WebSocket
    location /socket.io/ {
        proxy_pass http://localhost:8000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Activar Configuración
```bash
ln -s /etc/nginx/sites-available/lucioacademyfx.com /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 🔒 Configuración SSL

### Obtener Certificado SSL
```bash
certbot --nginx -d lucioacademyfx.com -d www.lucioacademyfx.com
```

### Renovar Automáticamente
```bash
crontab -e
# Agregar esta línea:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🚀 Configuración de PM2

### Archivo de Configuración PM2
```bash
nano /root/LucioAcademy/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: '/root/LucioAcademy/server',
      script: 'dist/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8000
      }
    },
    {
      name: 'frontend',
      cwd: '/root/LucioAcademy/client',
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```

### Iniciar Servicios
```bash
cd /root/LucioAcademy
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📦 Scripts de Despliegue

### Script de Despliegue Automático
```bash
nano /root/LucioAcademy/deploy.sh
```

```bash
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
```

### Hacer Ejecutable
```bash
chmod +x /root/LucioAcademy/deploy.sh
```

## 🔄 Comandos Útiles

### Verificar Estado de Servicios
```bash
pm2 status
pm2 logs
nginx -t
systemctl status nginx
```

### Reiniciar Servicios
```bash
pm2 restart all
systemctl reload nginx
```

### Ver Logs
```bash
pm2 logs backend
pm2 logs frontend
tail -f /var/log/nginx/error.log
```

### Despliegue Rápido
```bash
cd /root/LucioAcademy
./deploy.sh
```

## 🛠️ Solución de Problemas

### CORS Issues
- Verificar configuración en `server/app.ts`
- Asegurar que ambos dominios estén en la lista de origins

### SSL Issues
- Verificar certificados: `certbot certificates`
- Renovar manualmente: `certbot renew`

### PM2 Issues
- Verificar logs: `pm2 logs`
- Reiniciar servicios: `pm2 restart all`

### Nginx Issues
- Verificar configuración: `nginx -t`
- Ver logs: `tail -f /var/log/nginx/error.log`

## 📝 Notas Importantes

1. **Backup**: Hacer backup regular de la base de datos
2. **Monitoreo**: Configurar monitoreo de servicios
3. **Logs**: Revisar logs regularmente
4. **Updates**: Mantener sistema actualizado
5. **Security**: Mantener firewall configurado

## 🔗 Enlaces Útiles

- **Dominio**: https://lucioacademyfx.com
- **Admin Panel**: https://lucioacademyfx.com/admin
- **API Docs**: https://lucioacademyfx.com/api/v1 