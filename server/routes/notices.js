const express = require('express');
const router = express.Router();
const { queryAll, queryOne, executeRun } = require('../database');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/notices
router.get('/', verifyToken, async (req, res) => {
  try {
    const notices = await queryAll('SELECT * FROM notices ORDER BY date_posted DESC');
    res.json(notices.map(n => ({
      id: n.id,
      noticeNo: n.notice_no,
      title: n.title,
      category: n.category,
      priority: n.priority,
      datePosted: n.date_posted,
      postedBy: n.posted_by,
      content: n.content,
      isDoorToDoorReplacement: Boolean(n.is_door_to_door_replacement),
      rsvpCount: n.rsvp_count,
      acknowledgements: JSON.parse(n.acknowledgements_json || '[]')
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch society notices.' });
  }
});

// POST /api/notices (Admin publish notice / broadcast)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, category, priority, content, isDoorToDoorReplacement } = req.body;
    if (!title || !category || !content) {
      return res.status(400).json({ error: 'Title, category, and notice content are required.' });
    }

    const noticeId = `not-${Date.now()}`;
    const noticeNo = `NOT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const datePosted = new Date().toISOString().split('T')[0];
    const postedBy = `${req.user.name} (${req.user.designation || 'Secretary'})`;

    await executeRun(
      `INSERT INTO notices (id, notice_no, title, category, priority, date_posted, posted_by, content, is_door_to_door_replacement, rsvp_count, acknowledgements_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      [noticeId, noticeNo, title, category, priority || 'Normal', datePosted, postedBy, content, isDoorToDoorReplacement ? 1 : 0, JSON.stringify([req.user.flatNumber || 'Admin'])]
    );

    res.status(201).json({
      message: 'Notice broadcast published and dispatched to all residents!',
      notice: {
        id: noticeId,
        noticeNo,
        title,
        datePosted,
        postedBy
      }
    });
  } catch (err) {
    console.error('Error creating notice:', err);
    res.status(500).json({ error: 'Failed to publish society notice.' });
  }
});

// POST /api/notices/:id/rsvp (Resident acknowledge / RSVP)
router.post('/:id/rsvp', verifyToken, async (req, res) => {
  try {
    const notice = await queryOne('SELECT * FROM notices WHERE id = ?', [req.params.id]);
    if (!notice) {
      return res.status(404).json({ error: 'Notice not found.' });
    }

    const acks = JSON.parse(notice.acknowledgements_json || '[]');
    const userFlat = req.user.flatNumber || 'A-402';

    if (!acks.includes(userFlat)) {
      acks.push(userFlat);
      const newCount = notice.rsvp_count + 1;

      await executeRun(
        `UPDATE notices SET rsvp_count = ?, acknowledgements_json = ? WHERE id = ?`,
        [newCount, JSON.stringify(acks), req.params.id]
      );
    }

    res.json({ message: 'RSVP / Notice acknowledgement recorded.', acknowledgements: acks });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record RSVP acknowledgement.' });
  }
});

module.exports = router;
