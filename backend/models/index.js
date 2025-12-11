// backend/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'users', timestamps: false });

const File = sequelize.define('File', {
  filename: { type: DataTypes.STRING, allowNull: false },
  originalname: { type: DataTypes.STRING, allowNull: false },
  path: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.INTEGER, allowNull: false },
  privacy: { type: DataTypes.ENUM('public', 'private'), allowNull: false },
  uploaded_by: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'files', timestamps: false });

User.hasMany(File, { foreignKey: 'uploaded_by' });
File.belongsTo(User, { foreignKey: 'uploaded_by' });

module.exports = { sequelize, User, File, DataTypes };
