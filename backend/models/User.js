const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone:{
    type:DataTypes.STRING,
    allowNull:false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('GERENCY', 'SUPERVISOR', 'COORDINATOR', 'TEACHER'),
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
  } 
}, {
  paranoid: true, // habilita o soft delete
  timestamps: true
}); 

module.exports = User;