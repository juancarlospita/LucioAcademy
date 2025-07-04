#!/bin/bash

echo "Setting up Lucio Academy services..."

# Navigate to project directory
cd /root/LucioAcademy

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install

# Start backend service
echo "Starting backend service..."
pm2 start server.ts --name backend --interpreter ts-node

# Install client dependencies
echo "Installing client dependencies..."
cd ../client
npm install

# Start frontend service
echo "Starting frontend service..."
pm2 start npm --name frontend -- start

# Check status
echo "Checking service status..."
pm2 status

# Test ports
echo "Testing if services are listening..."
netstat -tlnp | grep -E ':(3000|8000)'

echo "Setup complete!" 