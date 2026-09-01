const express = require('express');
const router = express.Router();
const { queryAll, queryOne, executeRun } = require('../database');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/bookings
router.get('/', verifyToken, async (req, res) => {
  try {
    let sql = 'SELECT * FROM hall_bookings';
    const params = [];

    if (req.user.role === 'resident' && req.user.flatNumber) {
      sql += ' WHERE flat_number = ?';
      params.push(req.user.flatNumber);
    }

    sql += ' ORDER BY booking_date ASC';

    const bookings = await queryAll(sql, params);
    res.json(bookings.map(b => ({
      id: b.id,
      bookingRef: b.booking_ref,
      flatNumber: b.flat_number,
      residentName: b.resident_name,
      venue: b.venue,
      eventType: b.event_type,
      eventTitle: b.event_title,
      bookingDate: b.booking_date,
      timeSlot: b.time_slot,
      guestCount: b.guest_count,
      totalFee: b.total_fee,
      status: b.status,
      adminRemarks: b.admin_remarks,
      dateRequested: b.date_requested
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hall bookings.' });
  }
});

// GET /api/bookings/check-availability?venue=...&date=...&timeSlot=...
router.get('/check-availability', verifyToken, async (req, res) => {
  try {
    const { venue, date, timeSlot } = req.query;
    if (!venue || !date || !timeSlot) {
      return res.status(400).json({ error: 'Venue, date, and time slot are required parameters.' });
    }

    const conflict = await queryOne(
      `SELECT * FROM hall_bookings WHERE venue = ? AND booking_date = ? AND time_slot = ? AND status IN ('Approved', 'Pending')`,
      [venue, date, timeSlot]
    );

    res.json({
      available: !conflict,
      conflictingBooking: conflict ? {
        bookingRef: conflict.booking_ref,
        flatNumber: conflict.flat_number,
        eventTitle: conflict.event_title,
        status: conflict.status
      } : null
    });
  } catch (err) {
    res.status(500).json({ error: 'Error checking hall availability.' });
  }
});

// POST /api/bookings (Submit new booking request)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { venue, eventType, eventTitle, bookingDate, timeSlot, guestCount } = req.body;
    if (!venue || !eventType || !eventTitle || !bookingDate || !timeSlot) {
      return res.status(400).json({ error: 'Venue, event type, event title, date, and time slot are required.' });
    }

    // Check for Overlapping / Conflicting Booking
    const conflict = await queryOne(
      `SELECT * FROM hall_bookings WHERE venue = ? AND booking_date = ? AND time_slot = ? AND status IN ('Approved', 'Pending')`,
      [venue, bookingDate, timeSlot]
    );

    if (conflict) {
      return res.status(409).json({
        error: `Slot Conflict! The venue '${venue}' is already booked or requested for ${bookingDate} (${timeSlot}) by Flat ${conflict.flat_number}.`
      });
    }

    const bookingId = `hb-${Date.now()}`;
    const bookingRef = `HB-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const flatNumber = req.user.flatNumber || 'A-402';
    const residentName = req.user.name || 'Resident';
    const dateRequested = new Date().toISOString().split('T')[0];

    // Calculate fee based on venue & timeSlot
    let totalFee = 3500;
    if (venue.includes('Terrace')) totalFee = 5000;
    if (venue.includes('Lawn')) totalFee = 4500;
    if (timeSlot.includes('Full Day')) totalFee = Math.round(totalFee * 1.6);

    await executeRun(
      `INSERT INTO hall_bookings (id, booking_ref, flat_number, resident_name, venue, event_type, event_title, booking_date, time_slot, guest_count, total_fee, status, admin_remarks, date_requested)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', '', ?)`,
      [bookingId, bookingRef, flatNumber, residentName, venue, eventType, eventTitle, bookingDate, timeSlot, guestCount || 50, totalFee, dateRequested]
    );

    res.status(201).json({
      message: 'Hall booking request submitted successfully!',
      booking: {
        id: bookingId,
        bookingRef,
        venue,
        bookingDate,
        timeSlot,
        status: 'Pending',
        totalFee
      }
    });
  } catch (err) {
    console.error('Error submitting booking:', err);
    res.status(500).json({ error: 'Failed to process hall booking request.' });
  }
});

// PUT /api/bookings/:id/status (Admin Approve/Reject)
router.put('/:id/status', verifyToken, isAdmin, async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;
    if (!status || !['Approved', 'Rejected', 'Pending'].includes(status)) {
      return res.status(400).json({ error: 'Valid status (Approved, Rejected) is required.' });
    }

    const booking = await queryOne('SELECT * FROM hall_bookings WHERE id = ?', [req.params.id]);
    if (!booking) {
      return res.status(404).json({ error: 'Booking request not found.' });
    }

    await executeRun(
      `UPDATE hall_bookings SET status = ?, admin_remarks = ? WHERE id = ?`,
      [status, adminRemarks || (status === 'Approved' ? `Approved by Secretary ${req.user.name}` : `Booking rejected by Secretary`), req.params.id]
    );

    res.json({ message: `Hall booking request ${status.toLowerCase()} successfully.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update booking status.' });
  }
});

module.exports = router;
