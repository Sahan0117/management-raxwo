const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD

=======
>>>>>>> feature-yashini
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Connect to MongoDB using .env variable
=======
// MongoDB Connection
>>>>>>> feature-yashini
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("❌ MongoDB URI is missing! Add MONGODB_URI to your .env file.");
  process.exit(1);
}

<<<<<<< HEAD
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
=======
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
>>>>>>> feature-yashini
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
  res.send('shopmanager Management API');
});

<<<<<<< HEAD


// Import and use routers
=======
// Routes
>>>>>>> feature-yashini
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const dashboardRoutes = require('./routes/dashboard');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const cashierRoutes = require("./routes/cashierRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const customerRoutes = require('./routes/customerRoutes');
const productRepairRoutes = require('./routes/productsRepair');
const supplierRoutes = require('./routes/suppliers');
const salaryRoutes = require("./routes/salary");
<<<<<<< HEAD
const deviceIssuesRouter = require("./routes/deviceIssues"); // New router
const deviceTypesRoutes = require("./routes/deviceTypes"); // Add this line

app.use("/api/deviceTypes", deviceTypesRoutes); // Add this line
app.use("/api/deviceIssues", deviceIssuesRouter); // Add this line
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use("/api/cashiers", cashierRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use('/api', customerRoutes);
app.use('/api/productsRepair', productRepairRoutes);
app.use("/api/salaries", salaryRoutes);

// Global error handler - must be after all routes
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);

  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }

  // Set appropriate status code
  const statusCode = err.statusCode || 500;

  // Return error in JSON format
=======
const deviceIssuesRouter = require("./routes/deviceIssues");
const deviceTypesRoutes = require("./routes/deviceTypes");

app.use("/api/deviceTypes", deviceTypesRoutes);
app.use("/api/deviceIssues", deviceIssuesRouter);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/cashiers", cashierRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api", customerRoutes);
app.use("/api/productsRepair", productRepairRoutes);
app.use("/api/salaries", salaryRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler caught:', err);

  if (res.headersSent) return next(err);

  const statusCode = err.statusCode || 500;
>>>>>>> feature-yashini
  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.stack,
    timestamp: new Date().toISOString()
  });
});

<<<<<<< HEAD
// Handle 404 errors for routes that don't exist
=======
// 404 handler
>>>>>>> feature-yashini
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    error: 'Not Found',
    timestamp: new Date().toISOString()
  });
});

<<<<<<< HEAD
// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
=======
// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
>>>>>>> feature-yashini
