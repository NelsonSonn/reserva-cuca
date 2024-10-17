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
    //detalhar muito bem pro frontend os possíveis erros no cadastro (data incompleta/errada, sala já reservada, etc)
    res.status(201).json(reserve);
  } catch (error) {
    if (error.message === 'Reserve already registered') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const updateReserve = async (req, res) => {
  try {
    const reserve = await reserveService.updateReserve(req.params.id, req.body);

    if (reserve) {
      res.status(200).json(reserve);
    } 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteReserve = async (req, res) => {
  try {
    await reserveService.deleteReserve(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveReserve = async (req, res) => {
  try{
    const approvedReserve = await reserveService.approveReserve(req.params.id);

    if(approvedReserve){
      res.status(201).send();
    }else if(error.message === 'Only pending or cancelled reserves can be approved.'){
      res.status(400).json({ message: error.message });
    }
    
  } catch (error){
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReserves,
  createReserve,
  updateReserve,
  deleteReserve,
  approveReserve,
};
