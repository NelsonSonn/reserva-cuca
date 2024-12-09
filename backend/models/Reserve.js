const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserve = sequelize.define('Reserve', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // referência à tabela 'users'
          key: 'id',      // chave primária na tabela referenciada
        },
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'id',      
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reserveStatus: {
        type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'), 
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false, 
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    }, {
      timestamps: true,
      paranoid: true,
});
    
module.exports = Reserve;
