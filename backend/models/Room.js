const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
  roomType: {
    type: DataTypes.ENUM('LABORATORY', 'THEATER', 'CINEMA', 'COWORK', 'LIBRARY', 'STUDIO', ),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cucaName: {
    type: DataTypes.ENUM('BARRA', 'PICI', 'MOBUDIM', 'JOSE WALTER', 'JANGURUSSU'),
    allowNull: false
  }
});

module.exports = Room;
