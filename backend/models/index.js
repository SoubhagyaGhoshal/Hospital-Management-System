const neo4j = require('neo4j-driver');

const uri = process.env.COGNODB_URI || "bolt+s://db-6bfad97a.databases.cognodb.com";
const user = process.env.COGNODB_USER || "hospitalbackend";
const password = process.env.COGNODB_PASSWORD || "8295a3966ef97c131e43138109687f29";

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  disableLosslessIntegers: true // Converts Neo4j integers to standard JS numbers automatically
});

const checkConnection = async () => {
  try {
    const serverInfo = await driver.getServerInfo();
    console.log('✅ Connected to CognoDB successfully');
    return true;
  } catch (error) {
    console.error('❌ Connection error to CognoDB:', error);
    return false;
  }
};

const getSession = () => driver.session();

module.exports = {
  driver,
  checkConnection,
  getSession
};
