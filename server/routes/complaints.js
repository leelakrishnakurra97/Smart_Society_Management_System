const express = require('express');
const router = express.Router();
const { queryAll, queryOne, executeRun } = require('../database');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/complaints
router.get('/', verifyToken, async (req, res) => {
  try {
    let sql = 'SELECT * FROM complaints';
    const params = [];

    if (req.user.role === 'resident' && req.user.flatNumber) {
      sql += ' WHERE flat_number = ?';
      params.push(req.user.flatNumber);
    }

    sql += ' ORDER BY date_filed DESC';

    const complaints = await queryAll(sql, params);
    res.json(complaints.map(c => ({
      id: c.id,
      ticketNo: c.ticket_no,
      flatNumber: c.flat_number,
      residentName: c.resident_name,
      title: c.title,
      category: c.category,
      priority: c.priority,
      description: c.description,
      dateFiled: c.date_filed,
      status: c.status,
      assignedStaff: c.assigned_staff,
      adminNotes: c.admin_notes,
      history: JSON.parse(c.history_json || '[]')
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints list.' });
  }
});

// POST /api/complaints (Log new complaint)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, category, priority, description } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ error: 'Title, category, and detailed description are required.' });
    }

    const complaintId = `cmp-${Date.now()}`;
    const ticketNo = `TKT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const dateFiled = new Date().toISOString().split('T')[0];
    const flatNumber = req.user.flatNumber || 'A-402';
    const residentName = req.user.name || 'Resident';

    const initialHistory = [{
      date: `${dateFiled} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      note: `Ticket submitted by ${residentName} (${flatNumber})`
    }];

    await executeRun(
      `INSERT INTO complaints (id, ticket_no, flat_number, resident_name, title, category, priority, description, date_filed, status, assigned_staff, admin_notes, history_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', '', '', ?)`,
      [complaintId, ticketNo, flatNumber, residentName, title, category, priority || 'Medium', description, dateFiled, JSON.stringify(initialHistory)]
    );

    res.status(201).json({
      message: 'Complaint ticket registered successfully',
      complaint: {
        id: complaintId,
        ticketNo,
        title,
        category,
        priority: priority || 'Medium',
        status: 'Pending',
        dateFiled
      }
    });
  } catch (err) {
    console.error('Error creating complaint:', err);
    res.status(500).json({ error: 'Failed to submit complaint.' });
  }
});

// PUT /api/complaints/:id/status (Admin update status & notes)
router.put('/:id/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const { status, assignedStaff, adminNotes } = req.body;
    const complaint = await queryOne('SELECT * FROM complaints WHERE id = ?', [req.params.id]);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint ticket not found.' });
    }

    const history = JSON.parse(complaint.history_json || '[]');
    const now = `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    if (status && status !== complaint.status) {
      history.push({
        date: now,
        note: `Status updated from '${complaint.status}' to '${status}' by Admin ${req.user.name}`
      });
    }

    if (adminNotes && adminNotes !== complaint.admin_notes) {
      history.push({
        date: now,
        note: `Secretary Remark added: ${adminNotes}`
      });
    }

    await executeRun(
      `UPDATE complaints SET status = ?, assigned_staff = ?, admin_notes = ?, history_json = ? WHERE id = ?`,
      [status || complaint.status, assignedStaff !== undefined ? assignedStaff : complaint.assigned_staff, adminNotes !== undefined ? adminNotes : complaint.admin_notes, JSON.stringify(history), req.params.id]
    );

    res.json({ message: 'Complaint status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update complaint status.' });
  }
});

module.exports = router;
