# 🚀 Lucio Academy - Inicio Rápido

## 📋 Resumen del Proyecto

**Lucio Academy** es una plataforma de educación en trading con:
- **Frontend**: Next.js con TypeScript
- **Backend**: Express.js con TypeScript
- **Base de datos**: MongoDB
- **Autenticación**: NextAuth.js con Google OAuth
- **WebSockets**: Socket.io para tiempo real
- **Pagos**: Stripe
- **Almacenamiento**: Cloudinary

## 🎯 Estado Actual

✅ **Desplegado y funcionando en:**
- **URL**: https://lucioacademyfx.com
- **IP**: 31.97.157.193
- **SSL**: Configurado con Let's Encrypt
- **CORS**: Configurado para ambos dominios (con y sin www)

## 📁 Estructura de Archivos de Despliegue

```
deployment/
├── README.md              # Documentación completa
├── QUICK-START.md         # Esta guía
├── nginx-config           # Configuración de Nginx
├── ecosystem.config.js    # Configuración de PM2
├── deploy.sh             # Script de despliegue automático
├── setup-server.sh       # Script de configuración inicial
├── backup.sh             # Script de backup
└── env.example           # Variables de entorno de ejemplo
```

## ⚡ Comandos Rápidos

### Verificar Estado
```bash
# Estado de servicios
pm2 status
systemctl status nginx

# Logs
pm2 logs
tail -f /var/log/nginx/error.log
```

### Despliegue Rápido
```bash
cd /root/LucioAcademy
./deployment/deploy.sh
```

### Backup
```bash
./deployment/backup.sh
```

### Reiniciar Servicios
```bash
pm2 restart all
systemctl reload nginx
```

## 🔧 Configuración Importante

### CORS (Backend)
```typescript
// server/app.ts
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.lucioacademyfx.com",
      "http://www.lucioacademyfx.com", 
      "https://lucioacademyfx.com",
      "http://lucioacademyfx.com"
    ],
    credentials: true
  })
);
```

### Variables de Entorno Críticas
```env
# Frontend
NEXTAUTH_URL=https://lucioacademyfx.com
NEXT_PUBLIC_API_URL=https://lucioacademyfx.com/api/v1
NEXT_PUBLIC_SOCKET_URL=wss://lucioacademyfx.com

# Backend
PORT=8000
MONGODB_URL=tu-mongodb-url
JWT_SECRET=tu-jwt-secret
```

## 🛠️ Solución de Problemas Comunes

### Error de CORS
- Verificar configuración en `server/app.ts`
- Asegurar que ambos dominios estén en origins

### SSL Issues
```bash
certbot certificates
certbot renew
```

### PM2 Issues
```bash
pm2 logs backend
pm2 logs frontend
pm2 restart all
```

### Nginx Issues
```bash
nginx -t
systemctl reload nginx
```

## 📞 Contacto y Soporte

- **Dominio**: https://lucioacademyfx.com
- **Admin**: https://lucioacademyfx.com/admin
- **API**: https://lucioacademyfx.com/api/v1

## 🔄 Mantenimiento

### Actualizaciones Automáticas
```bash
# Configurar cron para renovar SSL
crontab -e
0 12 * * * /usr/bin/certbot renew --quiet

# Configurar cron para backups diarios
0 2 * * * /root/LucioAcademy/deployment/backup.sh
```

### Monitoreo
- Revisar logs regularmente
- Monitorear uso de recursos
- Verificar certificados SSL
- Hacer backups regulares

---

**¡Tu plataforma está lista y funcionando! 🎉** 