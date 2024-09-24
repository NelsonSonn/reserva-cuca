const { encryptPassword, comparePassword } = require('../utils/passwordUtils');
const User = require('../models/User');

const findUserById = async (id) => {
   const user = await User.findByPk(id);

   if (!user) {
      throw new Error('User not found');
   }

   return user;
};

const findAllUsers = async () => {
   return await User.findAll();
};


const createUser = async (userData) => {
   const existingUser = await User.findOne({ where: { email: userData.email } });
   const hashedPassword = await encryptPassword(userData.password);
   userData.password = hashedPassword

   if (existingUser) {
      throw new Error('Email already registered');
   }

   const user = await User.create(userData);
   return user;
};

const updateUser = async (id, userData) => {
   const user = await findUserById(id);

   // Atualiza o usuário, passando os dados e a condição
   const updatedUser = await User.update(userData, {
      where: { id: user.id },
      returning: true, // Retorna o usuário atualizado
      plain: true // Retorna o primeiro registro encontrado
   });

   return updatedUser;
};

const deleteUser = async (id) => {
   const user = await findUserById(id);
   await user.destroy();
};

module.exports = {
   findAllUsers,
   findUserById,
   createUser,
   updateUser,
   deleteUser,
};
