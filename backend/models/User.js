const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
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
}
});

module.exports = User;
