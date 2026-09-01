const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('./database');

// Import Route Handlers
const authRoutes = require('./routes/auth');
const societyRoutes = require('./routes/society');
const maintenanceRoutes = require('./routes/maintenance');
const paymentRoutes = require('./routes/payments');
const complaintRoutes = require('./routes/complaints');
const bookingRoutes = require('./routes/bookings');
const noticeRoutes = require('./routes/notices');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/society', societyRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/notices', noticeRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Smart Society Management System API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Initialize Database Schemas & Start Express Server
const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 Smart Society REST API Server running on port ${PORT}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('[Fatal] Failed to start backend server:', err);
  }
};

startServer();
