const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('reservacuca', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
