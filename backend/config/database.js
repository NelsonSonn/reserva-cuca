const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('reservacuca', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  
  dialectOptions: {
    timezone: 'Etc/GMT0',
  },
  timezone: '-03:00'
});

module.exports = sequelize;