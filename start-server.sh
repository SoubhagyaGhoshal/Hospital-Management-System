#!/bin/bash

# Hospital Management System - Server Start Script
# This script ensures proper server startup with correct configuration

echo "🏥 Starting Hospital Management System Server..."

# Kill any existing processes on port 4000
echo "🔧 Checking for existing processes on port 4000..."
lsof -ti:4000 | xargs kill -9 2>/dev/null || echo "✅ No existing processes found"

# Wait a moment for processes to be killed
sleep 2

# Navigate to backend directory
cd backend

# Start server with proper configuration
echo "🚀 Starting server with correct configuration..."
NODE_ENV=development SECRET_KEY=hospital_management_secret_key_2024_secure_and_unique node server.js 