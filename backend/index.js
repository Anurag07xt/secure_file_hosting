require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');

const app = express();

// enable CORS
app.use(cors());

// serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// parse JSON for normal API routes (after multer routes)
app.use(express.json());

// routes
app.use('/api', authRoutes);
app.use('/api', fileRoutes);

// start server after DB sync
const PORT = process.env.PORT || 4000;
sequelize.sync()
  .then(() => {
    console.log('DB synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB sync error', err));
