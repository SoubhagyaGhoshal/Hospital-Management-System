const db = require("../models/index");
const { generateToken } = require("../middleware/Auth");

const adminService = {
  findAdminService: async (username, password) => {
    if (!username || !password) {
      throw new Error("username and password are required!");
    }

    const session = db.getSession();
    try {
      // First, ensure the default admin exists
      await session.run(`
        MERGE (a:Admin {username: 'admin'})
        ON CREATE SET a.password = 'admin123', a.role = 'admin', a.id = 'admin-uuid-1'
      `);

      const result = await session.run(
        'MATCH (u:Admin {username: $username}) RETURN u',
        { username }
      );

      if (result.records.length === 0) {
        throw new Error("admin not exit!");
      }

      const user = result.records[0].get('u').properties;

      if (user.password != password) {
        throw new Error("password is does not match!");
      }

      const payload = {
        username: user.username,
        id: user.id,
      };

      const token = generateToken(payload);

      return { user, token };
    } finally {
      await session.close();
    }
  },

  getAdminService: async (username) => {
    const session = db.getSession();
    try {
      const result = await session.run(
        'MATCH (u:Admin {username: $username}) RETURN u',
        { username }
      );
      if (result.records.length === 0) return null;
      return result.records[0].get('u').properties;
    } finally {
      await session.close();
    }
  },
};

module.exports = adminService;
