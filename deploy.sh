#!/bin/bash

echo "🚀 Deploying Hospital Management System to Render..."

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo "📦 Installing Render CLI..."
    curl -s https://render.com/download.sh | sh
fi

# Login to Render
echo "🔐 Logging into Render..."
render login

# Deploy using render.yaml
echo "📤 Deploying services..."
render deploy

echo "✅ Deployment complete!"
echo "🌐 Your app will be available at:"
echo "   Frontend: https://hospital-frontend.onrender.com"
echo "   Backend: https://hospital-backend.onrender.com" 