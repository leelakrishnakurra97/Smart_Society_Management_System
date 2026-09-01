const express = require('express');
const router = express.Router();
const { queryAll, queryOne, executeRun } = require('../database');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/maintenance/config
router.get('/config', verifyToken, async (req, res) => {
  try {
    const config = await queryOne('SELECT * FROM maintenance_config ORDER BY id DESC LIMIT 1');
    if (!config) {
      return res.json({
        sqftRate: 2.5,
        fixedWaterCharge: 400,
        elevatorCharge: 350,
        securityCharge: 600,
        parkingCharge: 300,
        lateFeeAmount: 250
      });
    }

    res.json({
      sqftRate: config.sqft_rate,
      fixedWaterCharge: config.fixed_water_charge,
      elevatorCharge: config.elevator_charge,
      securityCharge: config.security_charge,
      parkingCharge: config.parking_charge,
      lateFeeAmount: config.late_fee_amount
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch maintenance config.' });
  }
});

// POST /api/maintenance/config (Admin only)
router.post('/config', verifyToken, isAdmin, async (req, res) => {
  try {
    const { sqftRate, fixedWaterCharge, elevatorCharge, securityCharge, parkingCharge, lateFeeAmount } = req.body;
    await executeRun(
      `INSERT INTO maintenance_config (sqft_rate, fixed_water_charge, elevator_charge, security_charge, parking_charge, late_fee_amount) VALUES (?, ?, ?, ?, ?, ?)`,
      [sqftRate || 2.5, fixedWaterCharge || 400, elevatorCharge || 350, securityCharge || 600, parkingCharge || 300, lateFeeAmount || 250]
    );

    res.json({ message: 'Maintenance configuration updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update maintenance configuration.' });
  }
});

// GET /api/maintenance/bills
router.get('/bills', verifyToken, async (req, res) => {
  try {
    let sql = 'SELECT * FROM bills';
    const params = [];

    // Residents can only see their own flat bills unless admin
    if (req.user.role === 'resident' && req.user.flatNumber) {
      sql += ' WHERE flat_number = ?';
      params.push(req.user.flatNumber);
    }

    sql += ' ORDER BY issue_date DESC';

    const bills = await queryAll(sql, params);
    res.json(bills.map(b => ({
      id: b.id,
      invoiceNo: b.invoice_no,
      flatNumber: b.flat_number,
      residentName: b.resident_name,
      billPeriod: b.bill_period,
      issueDate: b.issue_date,
      dueDate: b.due_date,
      sqft: b.sqft,
      sqftCharge: b.sqft_charge,
      waterCharge: b.water_charge,
      elevatorCharge: b.elevator_charge,
      securityCharge: b.security_charge,
      parkingCharge: b.parking_charge,
      debitNoteCharge: b.debit_note_charge,
      debitNoteReason: b.debit_note_reason,
      lateFee: b.late_fee,
      totalAmount: b.total_amount,
      status: b.status,
      paidDate: b.paid_date,
      paymentMethod: b.payment_method,
      transactionId: b.transaction_id
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch maintenance bills.' });
  }
});

// POST /api/maintenance/generate (Admin only)
router.post('/generate', verifyToken, isAdmin, async (req, res) => {
  try {
    const { billPeriod, dueDate, debitNoteCharge, debitNoteReason } = req.body;
    if (!billPeriod || !dueDate) {
      return res.status(400).json({ error: 'Bill period and due date are required.' });
    }

    const config = await queryOne('SELECT * FROM maintenance_config ORDER BY id DESC LIMIT 1') || {
      sqft_rate: 2.5,
      fixed_water_charge: 400,
      elevator_charge: 350,
      security_charge: 600,
      parking_charge: 300,
      late_fee_amount: 250
    };

    const flats = await queryAll("SELECT * FROM flats WHERE status = 'Occupied'");
    const issueDate = new Date().toISOString().split('T')[0];
    const extraDebit = Number(debitNoteCharge) || 0;

    let generatedCount = 0;

    for (const flat of flats) {
      const billId = `bill-${Date.now()}-${flat.flat_number.replace('-', '')}`;
      const invoiceNo = `INV-${Date.now().toString().slice(-6)}-${flat.flat_number.replace('-', '')}`;
      
      const sqftCharge = Math.round(flat.sqft * config.sqft_rate);
      const waterCharge = config.fixed_water_charge;
      const elevatorCharge = config.elevator_charge;
      const securityCharge = config.security_charge;
      const parkingCharge = config.parking_charge;

      const totalAmount = sqftCharge + waterCharge + elevatorCharge + securityCharge + parkingCharge + extraDebit;

      await executeRun(
        `INSERT INTO bills (id, invoice_no, flat_number, resident_name, bill_period, issue_date, due_date, sqft, sqft_charge, water_charge, elevator_charge, security_charge, parking_charge, debit_note_charge, debit_note_reason, late_fee, total_amount, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, 'PENDING')`,
        [billId, invoiceNo, flat.flat_number, flat.owner_name, billPeriod, issueDate, dueDate, flat.sqft, sqftCharge, waterCharge, elevatorCharge, securityCharge, parkingCharge, extraDebit, debitNoteReason || '', totalAmount]
      );

      generatedCount++;
    }

    res.status(201).json({
      message: `Successfully calculated and generated ${generatedCount} maintenance bills for ${billPeriod}.`,
      generatedCount
    });
  } catch (err) {
    console.error('Error generating bills:', err);
    res.status(500).json({ error: 'Failed to generate monthly maintenance bills.' });
  }
});

module.exports = router;
