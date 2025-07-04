module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: '/root/LucioAcademy/server',
      script: 'build/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
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
        NODE_ENV: 'production'
      }
    }
  ]
}; 