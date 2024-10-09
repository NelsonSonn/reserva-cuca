const userService = require('../services/userService');

const findUserById = async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' }); 
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.userLogin({ email, password });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body, req.user.userId);
    
    if (user) {
      res.status(200).json(user); 
    } else {
      res.status(404).json({ message: 'User not found' }); 
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id, req.user.userId); 
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  findUserById,
  userLogin,
  createUser,
  updateUser,
  deleteUser,
};