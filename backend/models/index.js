const neo4j = require('neo4j-driver');

const uri = process.env.COGNODB_URI || "bolt+s://db-6bfad97a.databases.cognodb.com";
const user = process.env.COGNODB_USER || "hospitalbackend";
const password = process.env.COGNODB_PASSWORD || "8295a3966ef97c131e43138109687f29";

let driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  disableLosslessIntegers: true, // Converts Neo4j integers to standard JS numbers automatically
  maxConnectionPoolSize: 50,
  connectionAcquisitionTimeout: 10000, // 10s timeout to acquire a connection
  connectionTimeout: 10000, // 10s timeout to establish a connection
});

let isConnected = false;

/**
 * Attempt to connect to CognoDB with retry + exponential backoff.
 * @param {number} maxRetries - Maximum number of retry attempts (default 5)
 * @param {number} baseDelay  - Initial delay in ms before first retry (default 2000)
 * @returns {Promise<boolean>} true if connected, false if all retries exhausted
 */
const checkConnection = async (maxRetries = 5, baseDelay = 2000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const serverInfo = await driver.getServerInfo();
      console.log(`✅ Connected to CognoDB successfully (attempt ${attempt}/${maxRetries})`);
      console.log(`   Server address: ${serverInfo.address}`);
      isConnected = true;
      return true;
    } catch (error) {
      const delay = baseDelay * Math.pow(2, attempt - 1); // 2s, 4s, 8s, 16s, 32s
      console.warn(`⚠️  CognoDB connection attempt ${attempt}/${maxRetries} failed: ${error.message}`);
      if (attempt < maxRetries) {
        console.log(`   Retrying in ${delay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error('❌ All CognoDB connection attempts exhausted.');
  isConnected = false;
  return false;
};

/**
 * Background reconnection loop. Keeps trying every 30s until the DB is reachable.
 */
const startBackgroundReconnect = () => {
  const RECONNECT_INTERVAL = 30000; // 30 seconds

  const reconnectLoop = async () => {
    while (!isConnected) {
      console.log('🔄 Attempting background reconnection to CognoDB...');
      try {
        // Recreate the driver in case the old one is in a bad state
        driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
          disableLosslessIntegers: true,
          maxConnectionPoolSize: 50,
          connectionAcquisitionTimeout: 10000,
          connectionTimeout: 10000,
        });
        const serverInfo = await driver.getServerInfo();
        console.log(`✅ Background reconnection to CognoDB succeeded! Server: ${serverInfo.address}`);
        isConnected = true;
        global.dbConnected = true;
        return;
      } catch (error) {
        console.warn(`⚠️  Background reconnection failed: ${error.message}`);
        console.log(`   Will retry in ${RECONNECT_INTERVAL / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, RECONNECT_INTERVAL));
      }
    }
  };

  // Fire and forget — runs in the background
  reconnectLoop().catch(err => {
    console.error('❌ Background reconnect loop crashed:', err);
  });
};

const getSession = () => {
  if (!isConnected) {
    throw new Error('Database is not connected. Please try again later.');
  }
  return driver.session();
};

const getConnectionStatus = () => isConnected;

module.exports = {
  get driver() { return driver; },
  checkConnection,
  getSession,
  getConnectionStatus,
  startBackgroundReconnect,
};
