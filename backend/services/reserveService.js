const Reserve = require('../models/Reserve');
const { Op, fn, col } = require('sequelize');

const findReserveById = async (id) => {
   const reserve = await Reserve.findByPk(id);

   if (!reserve) {
      throw new Error('Reserve not found');
   }

   return reserve;
};

const findAllReserves = async (filters) => {

   //reservas de um cuca, reservas de um usuario, de um setor, intervalo de data, horário (talvez), atual

   try {
      const query = {};

      if (filters.reserveStatus) {
         query.reserveStatus = filters.reserveStatus;
      }

      if (filters.dateReserveFilter) {
         return await getAllReservesByDate(filters.dateReserveFilter);
      }

      return await Reserve.findAll({ where: query });

   } catch (error) {
      return {
         message: 'Error fetching reserves',
         error: error.message || error
      };
   }
};


const createReserve = async (reserveData) => {
   const existingReserve = await Reserve.findOne({ where: { startDate: reserveData.startDate } });

   //TODO: criar função pra organizar as datas

   if (existingReserve) {
      throw new Error('It already has a reserve for this room on this date');
   }

   if (new Date(reserveData.startTime) >= new Date(reserveData.endTime)) {
      throw new Error('Start time must be before end time');
   }

   reserveData.reserveStatus = 'PENDING';

   const reserve = await Reserve.create(reserveData);
   return reserve;
};

const updateReserve = async (id, reserveData) => {
   const reserve = await findReserveById(id);

   await Reserve.update(reserveData, { where: { id: reserve.id }});

   const updatedReserve = await findReserveById(id);

   return updatedReserve;
};

const deleteReserve = async (id) => {
   const reserve = await findReserveById(id);
   reserve.destroy();
};

const approveReserve = async (id) => {};

const getAllReservesByDate = async (date) => {
   try {
      const reserves = await Reserve.findAll({
         where: {
            [Op.and]: [
               {startDate: { [Op.lte]: date }}, // A reserva pode começar antes ou no próprio dia
               {endDate: { [Op.gte]: date }} // E terminar depois ou no próprio dia
            ]}});

      return reserves;

   } catch (error) {
      throw new Error('GetAllReservesByDate error', error);
   }
};

module.exports = {
    findReserveById,
    findAllReserves,
    createReserve,
    updateReserve,
    deleteReserve,
    approveReserve,
};