const express = require('express');
const router = express.Router();
const { queryAll, queryOne, executeRun } = require('../database');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/payments/history
router.get('/history', verifyToken, async (req, res) => {
  try {
    let sql = 'SELECT * FROM payments';
    const params = [];

    if (req.user.role === 'resident' && req.user.flatNumber) {
      sql += ' WHERE flat_number = ?';
      params.push(req.user.flatNumber);
    }

    sql += ' ORDER BY payment_date DESC';

    const payments = await queryAll(sql, params);
    res.json(payments.map(p => ({
      id: p.id,
      billId: p.bill_id,
      invoiceNo: p.invoice_no,
      flatNumber: p.flat_number,
      residentName: p.resident_name,
      amountPaid: p.amount_paid,
      paymentDate: p.payment_date,
      paymentMode: p.payment_mode,
      provider: p.provider,
      txnRef: p.txn_ref,
      receiptNo: p.receipt_no,
      status: p.status
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payment history.' });
  }
});

// POST /api/payments/checkout (Pay bill)
router.post('/checkout', verifyToken, async (req, res) => {
  try {
    const { billId, paymentMode, provider, txnRef } = req.body;
    if (!billId || !paymentMode) {
      return res.status(400).json({ error: 'Bill ID and payment mode are required.' });
    }

    const bill = await queryOne('SELECT * FROM bills WHERE id = ?', [billId]);
    if (!bill) {
      return res.status(404).json({ error: 'Maintenance bill not found.' });
    }

    if (bill.status === 'PAID') {
      return res.status(400).json({ error: 'This maintenance bill is already paid.' });
    }

    const paidDate = new Date().toISOString().split('T')[0];
    const transactionId = txnRef || `TXN${Date.now().toString().slice(-8)}`;
    const receiptNo = `RCP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const payId = `pay-${Date.now()}`;

    // Update Bill Status
    await executeRun(
      `UPDATE bills SET status = 'PAID', paid_date = ?, payment_method = ?, transaction_id = ? WHERE id = ?`,
      [paidDate, `${paymentMode} (${provider || 'Direct'})`, transactionId, billId]
    );

    // Record Payment Entry
    await executeRun(
      `INSERT INTO payments (id, bill_id, invoice_no, flat_number, resident_name, amount_paid, payment_date, payment_mode, provider, txn_ref, receipt_no, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'SUCCESS')`,
      [payId, billId, bill.invoice_no, bill.flat_number, bill.resident_name, bill.total_amount, paidDate, paymentMode, provider || 'Online Portal', transactionId, receiptNo]
    );

    res.json({
      message: 'Payment completed successfully!',
      payment: {
        id: payId,
        receiptNo,
        transactionId,
        amountPaid: bill.total_amount,
        paidDate
      }
    });
  } catch (err) {
    console.error('Error executing payment:', err);
    res.status(500).json({ error: 'Server error processing payment.' });
  }
});

// GET /api/payments/receipt/:id
router.get('/receipt/:id', verifyToken, async (req, res) => {
  try {
    const payment = await queryOne('SELECT * FROM payments WHERE id = ? OR bill_id = ? OR receipt_no = ?', [req.params.id, req.params.id, req.params.id]);
    if (!payment) {
      return res.status(404).json({ error: 'Payment receipt record not found.' });
    }

    const bill = await queryOne('SELECT * FROM bills WHERE id = ?', [payment.bill_id]);

    res.json({
      payment: {
        id: payment.id,
        receiptNo: payment.receipt_no,
        invoiceNo: payment.invoice_no,
        flatNumber: payment.flat_number,
        residentName: payment.resident_name,
        amountPaid: payment.amount_paid,
        paymentDate: payment.payment_date,
        paymentMode: payment.payment_mode,
        provider: payment.provider,
        txnRef: payment.txn_ref
      },
      bill: bill ? {
        billPeriod: bill.bill_period,
        sqft: bill.sqft,
        sqftCharge: bill.sqft_charge,
        waterCharge: bill.water_charge,
        elevatorCharge: bill.elevator_charge,
        securityCharge: bill.security_charge,
        parkingCharge: bill.parking_charge,
        debitNoteCharge: bill.debit_note_charge,
        debitNoteReason: bill.debit_note_reason,
        lateFee: bill.late_fee,
        totalAmount: bill.total_amount
      } : null
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve payment receipt details.' });
  }
});

module.exports = router;
