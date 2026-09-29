const db = require('./models/index');

async function test() {
  console.log("Testing connection...");
  const isConnected = await db.checkConnection();
  if (isConnected) {
    console.log("Successfully connected to CognoDB Graph Database!");
    const session = db.getSession();
    try {
      const result = await session.run('RETURN 1 AS num');
      console.log("Query test returned:", result.records[0].get('num'));
    } catch(e) {
      console.log("Query failed:", e);
    } finally {
      await session.close();
      await db.driver.close();
    }
  } else {
    console.log("Failed to connect.");
  }
}

test();
