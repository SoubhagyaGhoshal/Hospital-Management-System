#!/bin/bash

echo "🚀 Starting Cliniva Demo Server..."
echo "📊 This will start a local server for testing the application"
echo "🔗 The frontend will connect to this local server"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "backend/package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing dependencies..."
cd backend
npm install

echo ""
echo "🚀 Starting demo server on http://localhost:4000"
echo "🔗 Frontend will connect to this server"
echo "👤 Login credentials: admin/admin123"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the demo server
node deploy-demo.js 