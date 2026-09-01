const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'society.db');
const db = new sqlite3.Database(dbPath);

// Helper Promise wrappers for database operations
const queryAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const queryOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const executeRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

// Initialize Tables and Relational Schema
const initDatabase = async () => {
  console.log('[Database] Initializing relational SQL database tables...');

  db.serialize(async () => {
    // 1. Users Table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        designation TEXT,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        flat_number TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Flats Table
    db.run(`
      CREATE TABLE IF NOT EXISTS flats (
        flat_number TEXT PRIMARY KEY,
        owner_name TEXT NOT NULL,
        block TEXT NOT NULL,
        sqft INTEGER NOT NULL,
        flat_type TEXT NOT NULL,
        resident_type TEXT NOT NULL,
        phone TEXT,
        status TEXT DEFAULT 'Occupied'
      )
    `);

    // 3. Maintenance Config Table
    db.run(`
      CREATE TABLE IF NOT EXISTS maintenance_config (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sqft_rate REAL NOT NULL,
        fixed_water_charge REAL NOT NULL,
        elevator_charge REAL NOT NULL,
        security_charge REAL NOT NULL,
        parking_charge REAL NOT NULL,
        late_fee_amount REAL NOT NULL
      )
    `);

    // 4. Maintenance Bills Table
    db.run(`
      CREATE TABLE IF NOT EXISTS bills (
        id TEXT PRIMARY KEY,
        invoice_no TEXT UNIQUE NOT NULL,
        flat_number TEXT NOT NULL,
        resident_name TEXT NOT NULL,
        bill_period TEXT NOT NULL,
        issue_date TEXT NOT NULL,
        due_date TEXT NOT NULL,
        sqft INTEGER NOT NULL,
        sqft_charge REAL NOT NULL,
        water_charge REAL NOT NULL,
        elevator_charge REAL NOT NULL,
        security_charge REAL NOT NULL,
        parking_charge REAL NOT NULL,
        debit_note_charge REAL DEFAULT 0,
        debit_note_reason TEXT DEFAULT '',
        late_fee REAL DEFAULT 0,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'PENDING',
        paid_date TEXT,
        payment_method TEXT,
        transaction_id TEXT,
        FOREIGN KEY (flat_number) REFERENCES flats(flat_number)
      )
    `);

    // 5. Payments History Table
    db.run(`
      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        bill_id TEXT NOT NULL,
        invoice_no TEXT NOT NULL,
        flat_number TEXT NOT NULL,
        resident_name TEXT NOT NULL,
        amount_paid REAL NOT NULL,
        payment_date TEXT NOT NULL,
        payment_mode TEXT NOT NULL,
        provider TEXT,
        txn_ref TEXT NOT NULL,
        receipt_no TEXT UNIQUE NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (bill_id) REFERENCES bills(id)
      )
    `);

    // 6. Complaints Table
    db.run(`
      CREATE TABLE IF NOT EXISTS complaints (
        id TEXT PRIMARY KEY,
        ticket_no TEXT UNIQUE NOT NULL,
        flat_number TEXT NOT NULL,
        resident_name TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        priority TEXT NOT NULL,
        description TEXT NOT NULL,
        date_filed TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'Pending',
        assigned_staff TEXT DEFAULT '',
        admin_notes TEXT DEFAULT '',
        history_json TEXT NOT NULL
      )
    `);

    // 7. Hall Bookings Table
    db.run(`
      CREATE TABLE IF NOT EXISTS hall_bookings (
        id TEXT PRIMARY KEY,
        booking_ref TEXT UNIQUE NOT NULL,
        flat_number TEXT NOT NULL,
        resident_name TEXT NOT NULL,
        venue TEXT NOT NULL,
        event_type TEXT NOT NULL,
        event_title TEXT NOT NULL,
        booking_date TEXT NOT NULL,
        time_slot TEXT NOT NULL,
        guest_count INTEGER NOT NULL,
        total_fee REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'Pending',
        admin_remarks TEXT DEFAULT '',
        date_requested TEXT NOT NULL
      )
    `);

    // 8. Notices / Broadcasts Table
    db.run(`
      CREATE TABLE IF NOT EXISTS notices (
        id TEXT PRIMARY KEY,
        notice_no TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        priority TEXT NOT NULL,
        date_posted TEXT NOT NULL,
        posted_by TEXT NOT NULL,
        content TEXT NOT NULL,
        is_door_to_door_replacement INTEGER DEFAULT 1,
        rsvp_count INTEGER DEFAULT 0,
        acknowledgements_json TEXT DEFAULT '[]'
      )
    `);

    // Seed Data Setup if tables are empty
    const userCount = await queryOne('SELECT COUNT(*) as count FROM users');
    if (userCount && userCount.count === 0) {
      console.log('[Database] Seeding initial database tables...');
      
      const adminPass = await bcrypt.hash('123', 10);
      const resPass = await bcrypt.hash('123', 10);

      // Seed Users
      await executeRun(`INSERT INTO users (id, username, password_hash, name, role, designation, email, phone, flat_number) VALUES
        ('u-admin-1', 'admin', ?, 'Rajesh Sharma', 'admin', 'Society General Secretary', 'secretary@smartsociety.org', '+91 98201 44321', 'A-501'),
        ('u-admin-2', 'treasurer', ?, 'Vikram Seth', 'admin', 'Society Treasurer', 'treasurer@smartsociety.org', '+91 98192 11092', 'B-402'),
        ('u-res-1', 'priya', ?, 'Priya Patel', 'resident', 'Resident Owner', 'priya.patel@gmail.com', '+91 99870 12345', 'A-402'),
        ('u-res-2', 'amitabh', ?, 'Amitabh Roy', 'resident', 'Resident Tenant', 'amitabh.roy@yahoo.com', '+91 98205 67890', 'B-102'),
        ('u-res-3', 'neha', ?, 'Neha Kulkarni', 'resident', 'Resident Owner', 'neha.k@outlook.com', '+91 97690 44556', 'C-303')
      `, [adminPass, adminPass, resPass, resPass, resPass]);

      // Seed Flats
      await executeRun(`INSERT INTO flats (flat_number, owner_name, block, sqft, flat_type, resident_type, phone, status) VALUES
        ('A-101', 'Suresh Menon', 'Block A', 1100, '2 BHK', 'Owner', '+91 98112 00101', 'Occupied'),
        ('A-102', 'Rohan Deshmukh', 'Block A', 1250, '3 BHK', 'Owner', '+91 98112 00102', 'Occupied'),
        ('A-402', 'Priya Patel', 'Block A', 1250, '3 BHK', 'Owner', '+91 99870 12345', 'Occupied'),
        ('A-501', 'Rajesh Sharma', 'Block A', 1600, 'Penthouse', 'Owner', '+91 98201 44321', 'Occupied'),
        ('B-102', 'Amitabh Roy', 'Block B', 950, '2 BHK', 'Tenant', '+91 98205 67890', 'Occupied'),
        ('B-402', 'Vikram Seth', 'Block B', 1300, '3 BHK', 'Owner', '+91 98192 11092', 'Occupied'),
        ('C-303', 'Neha Kulkarni', 'Block C', 1400, '3 BHK', 'Owner', '+91 97690 44556', 'Occupied'),
        ('D-201', 'Ananya Sen', 'Block D', 1050, '2 BHK', 'Tenant', '+91 98300 11223', 'Occupied'),
        ('D-404', 'Karan Johar', 'Block D', 1200, '3 BHK', 'Owner', '+91 98210 99887', 'Vacant')
      `);

      // Seed Maintenance Config
      await executeRun(`INSERT INTO maintenance_config (sqft_rate, fixed_water_charge, elevator_charge, security_charge, parking_charge, late_fee_amount) VALUES
        (2.5, 400, 350, 600, 300, 250)
      `);

      // Seed Bills
      await executeRun(`INSERT INTO bills (id, invoice_no, flat_number, resident_name, bill_period, issue_date, due_date, sqft, sqft_charge, water_charge, elevator_charge, security_charge, parking_charge, debit_note_charge, debit_note_reason, late_fee, total_amount, status, paid_date, payment_method, transaction_id) VALUES
        ('bill-2026-08-A402', 'INV-2026-08-014', 'A-402', 'Priya Patel', 'August 2026', '2026-08-01', '2026-08-15', 1250, 3125, 400, 350, 600, 300, 500, 'Independence Day & Cultural Event Fund', 0, 5275, 'PENDING', NULL, NULL, NULL),
        ('bill-2026-07-A402', 'INV-2026-07-014', 'A-402', 'Priya Patel', 'July 2026', '2026-07-01', '2026-07-15', 1250, 3125, 400, 350, 600, 300, 0, '', 0, 4775, 'PAID', '2026-07-10', 'UPI (GooglePay)', 'UPI9823104928'),
        ('bill-2026-08-B102', 'INV-2026-08-022', 'B-102', 'Amitabh Roy', 'August 2026', '2026-08-01', '2026-08-15', 950, 2375, 400, 350, 600, 300, 500, 'Independence Day & Cultural Event Fund', 0, 4525, 'PENDING', NULL, NULL, NULL),
        ('bill-2026-06-B102', 'INV-2026-06-022', 'B-102', 'Amitabh Roy', 'June 2026', '2026-06-01', '2026-06-15', 950, 2375, 400, 350, 600, 300, 1000, 'Monsoon Roof Waterproofing Special Debit', 250, 5275, 'OVERDUE', NULL, NULL, NULL),
        ('bill-2026-08-C303', 'INV-2026-08-038', 'C-303', 'Neha Kulkarni', 'August 2026', '2026-08-01', '2026-08-15', 1400, 3500, 400, 350, 600, 300, 500, 'Independence Day & Cultural Event Fund', 0, 5650, 'PAID', '2026-08-02', 'HDFC Credit Card', 'TXN7781920041')
      `);

      // Seed Payments
      await executeRun(`INSERT INTO payments (id, bill_id, invoice_no, flat_number, resident_name, amount_paid, payment_date, payment_mode, provider, txn_ref, receipt_no, status) VALUES
        ('pay-101', 'bill-2026-07-A402', 'INV-2026-07-014', 'A-402', 'Priya Patel', 4775, '2026-07-10', 'UPI', 'Google Pay', 'UPI9823104928', 'RCP-2026-0791', 'SUCCESS'),
        ('pay-102', 'bill-2026-08-C303', 'INV-2026-08-038', 'C-303', 'Neha Kulkarni', 5650, '2026-08-02', 'CREDIT_CARD', 'HDFC Bank', 'TXN7781920041', 'RCP-2026-0805', 'SUCCESS')
      `);

      // Seed Complaints
      await executeRun(`INSERT INTO complaints (id, ticket_no, flat_number, resident_name, title, category, priority, description, date_filed, status, assigned_staff, admin_notes, history_json) VALUES
        ('cmp-001', 'TKT-2026-801', 'A-402', 'Priya Patel', 'Elevator 2 Making Grinding Noise', 'Elevator', 'High', 'Elevator 2 in Block A produces a screeching noise between 3rd and 5th floors. Needs urgent inspection by technician.', '2026-07-28', 'In Progress', 'Otis Elevator Engineer - Ramesh', 'Technician visited on July 30. Replacement bearing part ordered, installation scheduled for Aug 3.', ?),
        ('cmp-002', 'TKT-2026-802', 'B-102', 'Amitabh Roy', 'Water Seepage in Balcony', 'Plumbing', 'Medium', 'Rainwater is pooling near balcony drain and leaking down to B-002 balcony ceiling during heavy showers.', '2026-07-30', 'Pending', 'Society Plumber - Mahesh', '', ?),
        ('cmp-003', 'TKT-2026-709', 'C-303', 'Neha Kulkarni', 'Parking Slot B-14 Obstruction', 'Security', 'Low', 'A guest vehicle (MH-04-AB-9921) was parked in my designated slot without notice.', '2026-07-20', 'Resolved', 'Security Guard Desk', 'Security guard contacted guest owner and vehicle was moved to guest parking bay.', ?)
      `, [
        JSON.stringify([{ date: '2026-07-28 10:15 AM', note: 'Ticket submitted by resident' }, { date: '2026-07-29 02:30 PM', note: 'Status changed to In Progress by Admin Rajesh Sharma' }]),
        JSON.stringify([{ date: '2026-07-30 04:45 PM', note: 'Ticket submitted by resident' }]),
        JSON.stringify([{ date: '2026-07-20 08:00 AM', note: 'Ticket submitted' }, { date: '2026-07-20 09:30 AM', note: 'Resolved by Gate Guard Suresh' }])
      ]);

      // Seed Hall Bookings
      await executeRun(`INSERT INTO hall_bookings (id, booking_ref, flat_number, resident_name, venue, event_type, event_title, booking_date, time_slot, guest_count, total_fee, status, admin_remarks, date_requested) VALUES
        ('hb-101', 'HB-2026-081', 'A-402', 'Priya Patel', 'Main Clubhouse Community Hall', 'Birthday Party', 'Aarav''s 5th Birthday Party', '2026-08-20', 'Evening (4:00 PM - 10:00 PM)', 65, 3500, 'Approved', 'Approved by Secretary. Please ensure DJ music volume is reduced by 9:30 PM.', '2026-07-25'),
        ('hb-102', 'HB-2026-082', 'C-303', 'Neha Kulkarni', 'Terrace Event Deck', 'Ring Ceremony', 'Rohan & Sneha Ring Ceremony', '2026-09-05', 'Full Day (9:00 AM - 10:00 PM)', 110, 6000, 'Pending', '', '2026-08-01')
      `);

      // Seed Notices
      await executeRun(`INSERT INTO notices (id, notice_no, title, category, priority, date_posted, posted_by, content, is_door_to_door_replacement, rsvp_count, acknowledgements_json) VALUES
        ('not-001', 'NOT-2026-089', 'Annual General Body Meeting (AGM) 2026 Announcement', 'Meeting Announcement', 'Urgent', '2026-07-29', 'Rajesh Sharma (Secretary)', 'All residents and flat owners are hereby informed that the Annual General Body Meeting (AGM) for FY 2025-26 will be held on Sunday, August 16, 2026 at 10:30 AM in the Society Clubhouse. Agenda includes financial audit presentation, rooftop solar project approval, and security vendor renewal.', 1, 28, ?),
        ('not-002', 'NOT-2026-088', 'Independence Day Cultural Festival & Flag Hoisting', 'Festival Event', 'Normal', '2026-07-27', 'Cultural Committee', 'Join us for Flag Hoisting at 8:30 AM on August 15th at the Society Main Lawn, followed by kids drawing competition and evening cultural performances. Refreshments will be served.', 0, 42, ?),
        ('not-003', 'NOT-2026-085', 'Monsoon Water Tank Deep Cleaning Schedule', 'Maintenance Update', 'High', '2026-07-22', 'Society Office', 'Underground & Overhead water tanks will be drained and disinfected on Wednesday, August 5 between 9:00 AM and 4:00 PM. Water supply will remain suspended during these hours. Please store adequate water in advance.', 0, 35, ?)
      `, [
        JSON.stringify(['A-402', 'C-303', 'A-501', 'B-402']),
        JSON.stringify(['A-402', 'B-102', 'C-303']),
        JSON.stringify(['A-402', 'B-102', 'C-303', 'D-201'])
      ]);

      console.log('[Database] Database tables seeded successfully!');
    }
  });
};

module.exports = {
  db,
  initDatabase,
  queryAll,
  queryOne,
  executeRun
};
