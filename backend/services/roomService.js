const Room = require('../models/Room');

const findRoomById = async (id) => {
   const room = await Room.findByPk(id);

   if (!room) {
      throw new Error('Room not found');
   }

   return room;
};

const findAllRooms = async () => {
   return await Room.findAll();
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
   await room.destroy();
};

module.exports = {
    findRoomById,
    findAllRooms,
    createRoom,
    updateRoom,
    deleteRoom,
};

