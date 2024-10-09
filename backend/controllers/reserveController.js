const reserveService = require('../services/reserveService');

const getAllReserves = async (req, res) => {
  try {
    const reserves = await reserveService.findAllReserves(req.query);
    res.status(200).json(reserves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reserves', error });
  }
};

const createReserve = async (req, res) => {
  try {
    const reserve = await reserveService.createReserve(req.body);
    res.status(201).json({
      success: true,
      message: 'Reserve created successfully',
      data: reserve,
    });
  } catch (error) {
    if (error.message === 'All fields are required.') {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error.message === 'Invalid reserve status.') {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error.message === 'Start time must be before end time.') {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error.message === 'The specified room does not exist.') {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else if (error.message === 'The room is already reserved for the specified time interval.') {
      res.status(409).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error creating reserve',
        error: error.message,
      });
    }
  }
};

const updateReserve = async (req, res) => {
  try {
    const reserve = await reserveService.updateReserve(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Reserve updated successfully',
      data: reserve,
    });
  } catch (error) {
    if (error.message === 'All fields are required.') {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error.message === 'Invalid reserve status.') {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error.message === 'Start time must be before end time.') {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else if (error.message === 'The specified room does not exist.') {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else if (error.message === 'The room is already reserved for the specified time interval.') {
      res.status(409).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error updating reserve',
        error: error.message,
      });
    }
  }
};

const deleteReserve = async (req, res) => {
  try {
    await reserveService.deleteReserve(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Reserve not found') {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error deleting reserve',
        error: error.message,
      });
    }
  }
};

const approveReserve = async (req, res) => {
  try {
    const approvedReserve = await reserveService.approveReserve(req.params.id);

    if (approvedReserve) {
      res.status(201).json({
        success: true,
        message: 'Reserve approved successfully',
        data: approvedReserve,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Reserve not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error approving reserve',
      error: error.message,
    });
  }
};

module.exports = {
  getAllReserves,
  createReserve,
  updateReserve,
  deleteReserve,
  approveReserve,
};
