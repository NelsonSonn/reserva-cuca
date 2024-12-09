const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('reservacuca', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00',
});

module.exports = sequelize;