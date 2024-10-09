const sequelize = require('../config/database');
const User = require('./User');
const Room = require('./Room');
const Reserve = require('./Reserve');

User.hasMany(Reserve, { foreignKey: 'user_id' });
Room.hasMany(Reserve, { foreignKey: 'room_id' });
Reserve.belongsTo(User, { foreignKey: 'user_id' });
Reserve.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = {
  sequelize,
  User,
  Room,
  Reserve,
};