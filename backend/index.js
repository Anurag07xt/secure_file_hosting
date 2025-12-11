// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const app = express();
app.use(cors());
app.use(express.json());

// serve uploads statically (for downloads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// routes
app.use('/api', authRoutes);
app.use('/api', fileRoutes);

// sync database and start
const PORT = process.env.PORT || 4000;
sequelize.sync()
  .then(() => {
    console.log('DB synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB sync error', err));
