const express = require('express');
const router = express.Router();
const { queryAll, queryOne, executeRun } = require('../database');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/society/info
router.get('/info', async (req, res) => {
  res.json({
    societyInfo: {
      name: "Smart Society Residency & Heights",
      address: "Plot 42, Sector 18, Palm Beach Road, Navi Mumbai - 400706",
      registrationNo: "HSG/NMB/2021/8492",
      totalFlats: 48,
      blocks: ["Block A", "Block B", "Block C", "Block D"],
    }
  });
});

// GET /api/society/flats
router.get('/flats', verifyToken, async (req, res) => {
  try {
    const flats = await queryAll('SELECT * FROM flats ORDER BY flat_number ASC');
    res.json(flats.map(f => ({
      flatNumber: f.flat_number,
      ownerName: f.owner_name,
      block: f.block,
      sqft: f.sqft,
      flatType: f.flat_type,
      residentType: f.resident_type,
      phone: f.phone,
      status: f.status
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flat directory.' });
  }
});

// POST /api/society/flats (Admin only)
router.post('/flats', verifyToken, isAdmin, async (req, res) => {
  try {
    const { flatNumber, ownerName, block, sqft, flatType, residentType, phone, status } = req.body;
    if (!flatNumber || !ownerName || !block || !sqft) {
      return res.status(400).json({ error: 'Flat number, owner name, block, and sqft area are required.' });
    }

    const existing = await queryOne('SELECT flat_number FROM flats WHERE flat_number = ?', [flatNumber]);
    if (existing) {
      return res.status(400).json({ error: `Flat ${flatNumber} already exists in database.` });
    }

    await executeRun(
      `INSERT INTO flats (flat_number, owner_name, block, sqft, flat_type, resident_type, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [flatNumber, ownerName, block, sqft, flatType || '2 BHK', residentType || 'Owner', phone || '', status || 'Occupied']
    );

    res.status(201).json({ message: 'Flat record created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create flat record.' });
  }
});

module.exports = router;
