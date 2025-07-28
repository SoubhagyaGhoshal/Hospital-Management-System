import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utils/ApiUtils/ApiUtils.jsx';

function ConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [backendUrl, setBackendUrl] = useState('');
  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    // Get the current backend URL
    const isProduction = process.env.NODE_ENV === 'production';
    const url = isProduction 
      ? import.meta.env.VITE_API_URL || "https://hospital-backend-eme3.onrender.com/api"
      : "http://localhost:4000/api";
    setBackendUrl(url);

    // Test the connection
    const runTests = async () => {
      const results = {};
      
      // Test 1: Basic connection
      try {
        const response = await fetch(url + '/');
        results.basicConnection = response.ok ? '✅ Success' : '❌ Failed';
      } catch (error) {
        results.basicConnection = '❌ Error: ' + error.message;
      }

      // Test 2: Admin login
      try {
        const response = await apiRequest('post', '/admin', {
          username: 'admin',
          password: 'admin123'
        });
        results.adminLogin = response && response.token ? '✅ Success' : '❌ Failed';
      } catch (error) {
        results.adminLogin = '❌ Error: ' + error.message;
      }

      // Test 3: Health check
      try {
        const response = await fetch('http://localhost:4000/health');
        results.healthCheck = response.ok ? '✅ Success' : '❌ Failed';
      } catch (error) {
        results.healthCheck = '❌ Error: ' + error.message;
      }

      setTestResults(results);
      setConnectionStatus('Tests completed');
    };

    runTests();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', backgroundColor: '#f5f5f5' }}>
      <h3>Backend Connection Test</h3>
      <p><strong>Backend URL:</strong> {backendUrl}</p>
      <p><strong>Status:</strong> {connectionStatus}</p>
      <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
      
      <h4>Test Results:</h4>
      <ul>
        <li><strong>Basic Connection:</strong> {testResults.basicConnection}</li>
        <li><strong>Admin Login:</strong> {testResults.adminLogin}</li>
        <li><strong>Health Check:</strong> {testResults.healthCheck}</li>
      </ul>
    </div>
  );
}

export default ConnectionTest; 