const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env variables
dotenv.config();


const connectDB = require('./config/db');
connectDB();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/categories', categoryRoutes);



// Routes
app.get('/', (req, res) => {
  res.send('SpendWise API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log("Server running on port 5000");
});

