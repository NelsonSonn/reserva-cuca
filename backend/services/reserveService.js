const Reserve = require('../models/Reserve');
const Room = require('../models/Room');
const roomService = require('./roomService');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

const findReserveById = async (id) => {
   const reserve = await Reserve.findByPk(id);

   if (!reserve) {
      throw new Error('Reserve not found');
   }

   return reserve;
};

const findAllReserves = async (filters) => {
   try {
      const query = {
         where: {},
         attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt'] },
         include: []
      };

      console.log(await getAllReservesByDateOrRoom(filters.date, filters.room_id))

      if (filters.reserveStatus) {
         query.where.reserveStatus = filters.reserveStatus;
      }

      if (filters.dateReserveFilter) {
         return await getAllReservesByDateOrRoom(filters.dateReserveFilter);
      }
      
      if(filters.cucaName){
         query.include.push({
            model: Room,
            required: true, 
            where: {
               cucaName: filters.cucaName
            }
         });
      }

      if(filters.user_id){
         query.where.user_id = filters.user_id;
      }

      if(filters.responsibleSector){
         query.where.responsibleSector = filters.responsibleSector;
      }

      if (filters.startDate && filters.endDate) {
         if (new Date(filters.startDate) > new Date(filters.endDate)) {
            throw new Error('Start time must be before end time');
         }
         query.where = {
            ...query.where,
            [Op.or]: [
               {
                  startDate: {
                     [Op.between]: [filters.startDate, filters.endDate]
                  }
               },
               {
                  endDate: {
                     [Op.between]: [filters.endDate, filters.endDate]
                  }
               },
               {
                [Op.and]: [
                  { startDate: { [Op.lte]: filters.startDate } },
                  { endDate: { [Op.gte]: filters.endDate } }
                ]
               }
            ]
         };
      }

      if (filters.startDate) {
         query.where.startDate = {
            [Op.gte]: filters.startDate
         };
      }

      if (filters.endDate) {
         query.where.endDate = {
            [Op.lte]: filters.endDate
         };
      }

      if(filters.date && filters.room_id){
        return await getAllReservesByDateOrRoom(filters.date, filters.room_id);
     }
      
      return await Reserve.findAll(query);

   } catch (error) {
      return {
         message: 'Error fetching reserves',
         error: error.message || error
      };
   }
};

const createReserve = async (reserveData) => {
  const { user_id, room_id, description, startDate, endDate, startTime, endTime } = reserveData;

  if (!user_id || !room_id || !description || !startDate || !endDate || !startTime || !endTime) {
    throw new Error('All fields are required.');
  }

  if (new Date(startDate) > new Date(endDate)) {
    throw new Error('Start date must be before end date.');
  }

   if (new Date(startTime) >= new Date(endTime)) {
    throw new Error('Start time must be before end time.');
  }

  try {
    
    await roomService.findRoomById(room_id);
    
    const conflictingReserves = await Reserve.findAll({
    where: {
      room_id: room_id,
      [Op.or]: [
        {
          startDate: {
            [Op.lte]: endDate
          },
          endDate: {
            [Op.gte]: startDate
          },
          [Op.and]: [
            {
              startTime: {
                [Op.lte]: endTime
              },
              endTime: {
                [Op.gte]: startTime
              }
            }
          ]
        }
      ]
    }
  });

    if (conflictingReserves.length > 0) {
      throw new Error('The room is already reserved for the specified time interval.');
    }

    reserveData.reserveStatus = 'PENDING';

    const result = await sequelize.transaction(async (t) => {
      const reserve = await Reserve.create(reserveData, { transaction: t });
      return reserve;
    });

    return result;
  } catch (error) {
    if (error.message === 'Room not found') {
      throw new Error('The specified room does not exist.');

    } else if (error.message === 'The room is already reserved for the specified time interval.') {
      throw new Error(error.message);

    } else {
      throw new Error(`Error creating reserve: ${error.message}`);
    }
  }
};

const updateReserve = async (id, reserveData) => {
  const { user_id, room_id, description, reserveStatus, startDate, endDate, startTime, endTime } = reserveData;

  if (!user_id || !room_id || !description || !reserveStatus || !startDate || !endDate  || !startTime || !endTime) {
    throw new Error('All fields are required.');
  }

  if (!['PENDING', 'CONFIRMED', 'CANCELLED'].includes(reserveStatus)) {
    throw new Error('Invalid reserve status.');
  }

  if (new Date(startDate) > new Date(endDate)) {
    throw new Error('Start date must be before end date.');
  }

   if (new Date(startTime) >= new Date(endTime)) {
    throw new Error('Start time must be before end time.');
  }

  try {

    await roomService.findRoomById(room_id);

    const reserve = await findReserveById(id);

    const conflictingReserves = await Reserve.findAll({
      where: {
        room_id: room_id,
        id: { [Op.ne]: id }, 
        [Op.or]: [
          {
            startDate: {
              [Op.lte]: endDate
            },
            endDate: {
              [Op.gte]: startDate
            },
            [Op.and]: [
              {
                startTime: {
                  [Op.lte]: endTime
                },
                endTime: {
                  [Op.gte]: startTime
                }
              }
            ]
          }
        ]
      }
    });

    if (conflictingReserves.length > 0) {
      throw new Error('The room is already reserved for the specified time interval.');
    }

    const result = await sequelize.transaction(async (t) => {
      await Reserve.update(reserveData, { where: { id: reserve.id }, transaction: t });
      const updatedReserve = await findReserveById(id, { transaction: t });
      return updatedReserve;
    });

    return result;

  } catch (error) {
    if (error.message === 'Room not found') {
      throw new Error('The specified room does not exist.');

    } else if (error.message === 'The room is already reserved for the specified time interval.') {
      throw new Error(error.message);
      
    } else {
      throw new Error(`Error updating reserve: ${error.message}`);
    }
  }
};
const deleteReserve = async (id) => {
   const reserve = await findReserveById(id);
   reserve.destroy();
};

const approveReserve = async (id) => {
  const reserve = await findReserveById(id);

  if (reserve.reserveStatus === 'PENDING' || reserve.reserveStatus === 'CANCELLED') {
    reserve.reserveStatus = 'CONFIRMED';
    await reserve.save();
  } else {
    throw new Error('Only pending or cancelled reserves can be approved.');
  }

  return reserve;
};

const getAllReservesByDateOrRoom = async (date, roomId) => {
  const query = {
    where: {}
  };

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    query.where[Op.or] = [
      { startDate: { [Op.between]: [startOfDay, endOfDay] } },
      { endDate: { [Op.between]: [startOfDay, endOfDay] } },
      {
        [Op.and]: [
          { startDate: { [Op.lte]: startOfDay } },
          { endDate: { [Op.gte]: endOfDay } }
        ]
      }
    ];
  }

  if (roomId) {
    query.where.room_id = roomId;
  }

  return await Reserve.findAll(query);
};

module.exports = {
    findReserveById,
    findAllReserves,
    createReserve,
    updateReserve,
    deleteReserve,
    approveReserve,
};