const db = require('../models/index');

/**
 * Middleware that returns 503 Service Unavailable when the database is not connected.
 * This gives the frontend a clear, actionable error instead of a generic 500.
 */
const requireDatabase = (req, res, next) => {
  if (!db.getConnectionStatus()) {
    return res.status(503).json({
      error: 'Service temporarily unavailable',
      message: 'Database is currently unreachable. The server is attempting to reconnect automatically. Please try again in a few moments.',
      retryAfter: 30,
    });
  }
  next();
};

module.exports = { requireDatabase };
