const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { queryOne, executeRun } = require('../database');
const { JWT_SECRET, verifyToken } = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await queryOne('SELECT * FROM users WHERE username = ?', [username.toLowerCase().trim()]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const tokenPayload = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      flatNumber: user.flat_number
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

    // Return user object without password_hash
    const { password_hash, ...userProfile } = user;

    res.json({
      message: 'Login successful',
      token,
      user: {
        ...userProfile,
        flatNumber: user.flat_number
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error during login authentication.' });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, password, name, email, phone, flatNumber, role, designation } = req.body;

    if (!username || !password || !name || !email) {
      return res.status(400).json({ error: 'Please provide username, password, name, and email.' });
    }

    const existing = await queryOne('SELECT id FROM users WHERE username = ? OR email = ?', [username.toLowerCase(), email.toLowerCase()]);
    if (existing) {
      return res.status(400).json({ error: 'Username or Email is already registered.' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const userId = `u-${Date.now()}`;
    const userRole = role === 'admin' ? 'admin' : 'resident';

    await executeRun(
      `INSERT INTO users (id, username, password_hash, name, role, designation, email, phone, flat_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, username.toLowerCase(), password_hash, name, userRole, designation || (userRole === 'admin' ? 'Committee Member' : 'Resident Owner'), email, phone || '', flatNumber || '']
    );

    const newUser = await queryOne('SELECT id, username, name, role, designation, email, phone, flat_number FROM users WHERE id = ?', [userId]);

    const token = jwt.sign({
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
      flatNumber: newUser.flat_number
    }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        ...newUser,
        flatNumber: newUser.flat_number
      }
    });
  } catch (err) {
    console.error('Error in registration:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// GET /api/auth/me
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await queryOne('SELECT id, username, name, role, designation, email, phone, flat_number FROM users WHERE id = ?', [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    res.json({
      user: {
        ...user,
        flatNumber: user.flat_number
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error retrieving profile.' });
  }
});

module.exports = router;
