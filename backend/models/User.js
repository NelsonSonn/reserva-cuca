const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthDate:{
    type:DataTypes.DATEONLY,
    allowNull:false
  },
  telephone:{
    type:DataTypes.STRING,
    allowNull:false
  },
  role: {
    type: DataTypes.ENUM('GERENCY', 'SUPERVISOR', 'COORDINATOR', 'TEACHER'),
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
  } 
}, {
  paranoid: true, // habilita a exclusão suave
}); 

module.exports = User;
