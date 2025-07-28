import React, { useState, useEffect } from 'react';
import { testConnection } from '../utils/ApiUtils/ApiUtils';

function ConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [backendUrl, setBackendUrl] = useState('');

  useEffect(() => {
    // Get the current backend URL
    const isProduction = process.env.NODE_ENV === 'production';
    const url = isProduction 
      ? import.meta.env.VITE_API_URL || "https://hospital-backend.onrender.com/api"
      : "http://localhost:4000/api";
    
    setBackendUrl(url);

    // Test the connection
    testConnection()
      .then((success) => {
        setConnectionStatus(success ? '✅ Connected!' : '❌ Failed to connect');
      })
      .catch((error) => {
        setConnectionStatus('❌ Connection failed');
        console.error('Connection test error:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Backend Connection Test</h3>
      <p><strong>Backend URL:</strong> {backendUrl}</p>
      <p><strong>Status:</strong> {connectionStatus}</p>
      <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
    </div>
  );
}

export default ConnectionTest; 