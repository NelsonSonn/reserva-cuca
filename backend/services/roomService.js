const Room = require('../models/Room');
const { Op } = require('sequelize');

const findRoomById = async (id) => {
   const room = await Room.findByPk(id);

   if (!room) {
      throw new Error('Room not found');
   }

   return room;
};

const findAllRooms = async (filters) => {
  const query = {};

  if (filters.cucaName) {
    query.cucaName = filters.cucaName;
  }
  if (filters.responsibleSector) {
    query.responsibleSector = filters.responsibleSector;
  }
  if (filters.roomType) {
    query.roomType = filters.roomType;
  }
  if (filters.roomCapability) {
    query.roomCapability = { [Op.lte]: parseInt(filters.roomCapability) }; 
  }
  if (filters.name) {
    query.name = { [Op.like]: `%${filters.name}%` }; 
  }

  return await Room.findAll({ where: query });
};

const createRoom = async (roomData) => {
   const existingRoom = await Room.findOne({ where: { name: roomData.name, cucaName: roomData.cucaName } });

   if (existingRoom) {
      throw new Error('Room already registered');
   }

   const room = await Room.create(roomData);
   return room;
};

const updateRoom = async (id, roomData) => {
   const room = await findRoomById(id);

   await Room.update(roomData, { where: { id: room.id }});

   const updatedRoom = await findRoomById(id);

   return updatedRoom;
};

const deleteRoom = async (id) => {
   const room = await findRoomById(id);
   room.destroy();
};

module.exports = {
    findRoomById,
    findAllRooms,
    createRoom,
    updateRoom,
    deleteRoom,
};