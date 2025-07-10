// import express from 'express';
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const productsRoutes = require('./routes/products');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/auth');
const authRoutesAdmin = require('./routes/auth_admin');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect to database
connectDB()
  .then(() => console.log('MongoDB connected yeah!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

//admin routes
app.use('/admin/auth', authRoutesAdmin);

// give access to folder uploads
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
