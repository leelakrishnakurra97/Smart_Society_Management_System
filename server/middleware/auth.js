const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'smart-society-secret-jwt-key-2026';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No authorization token provided.' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired authorization token.' });
  }
};

// Middleware to authorize Admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Forbidden. Admin privileges required for this action.' });
  }
};

// Middleware to authorize Resident role or Admin
const isResident = (req, res, next) => {
  if (req.user && (req.user.role === 'resident' || req.user.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({ error: 'Forbidden. Resident access required.' });
  }
};

module.exports = {
  JWT_SECRET,
  verifyToken,
  isAdmin,
  isResident
};
