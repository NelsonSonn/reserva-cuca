const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
  roomType: {
    type: DataTypes.ENUM('LABORATORY', 'THEATER', 'CINEMA', 'COWORK', 'LIBRARY', 'STUDIO','CINECLUBE', 'MULTIUSO'),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cucaName: {
    type: DataTypes.ENUM('BARRA', 'PICI', 'MONBUDIM', 'JOSE_WALTER', 'JANGURUSSU'),
    allowNull: false
  },
  roomCapability:{
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  responsibleSector:{
    type: DataTypes.ENUM('SPORT', 'CULTURE', 'TECHNOLOGY', 'GERENCY', 'RH'),
    allowNull: false
  }
},{
  timestamps: true
});

module.exports = Room;
