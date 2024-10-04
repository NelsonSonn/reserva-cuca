const { encryptPassword, comparePassword } = require('../utils/passwordUtils');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

const userLogin = async (userData) => {
   const user = await User.findOne({ where: { email: userData.email } });
   
   if (!user) {
     throw new Error('Email not registered');
   }
 
   const isPasswordValid = comparePassword(userData.password, user.password);
   if (!isPasswordValid) {
     throw new Error('Password does not match');
   }
 
   const token = jwt.sign(
     { userId: user.id, role: user.role }, // payload com id e role
      process.env.SECRET_KEY,
     { expiresIn: '1h' } 
   );
 
   return { token, user };
 };

const createUser = async (userData) => {
   const existingUser = await User.findOne({ where: { email: userData.email } });
   const hashedPassword = await encryptPassword(userData.password);
   userData.password = hashedPassword

   if (existingUser) {
      throw new Error('Email already registered');
   }

   if(!validateEmail(userData.email)){
      throw new Error('Email format not valid')
   }

   if(!validatePhoneNumber(userData.telephone)){
      throw new Error('Telephone format not valid')
   }

   const user = await User.create(userData);
   return user;
};

const updateUser = async (id, userData, userLoggedId) => {
   const user = await findUserById(id);
   const userLogged = await findUserById(userLoggedId);

   if(userLogged.role != 'GERENCY' && userLogged.email != user.email){
      throw new Error('You dont have permission to update different users');
   }

   if (user.email != userData.email) {
      const existingUser = await User.findOne({ where: { email: userData.email } });

      if(existingUser){
         throw new Error('Email already in use');
      }
   }

   if(!validateEmail(userData.email)){
      throw new Error('Email format not valid')
   }

   if(!validatePhoneNumber(userData.telephone)){
      throw new Error('Telephone format not valid');
   }

   await User.update(userData, { where: { id: user.id }});
   const updatedUser = await User.findOne({ where: { id: user.id}});
   return updatedUser;
};

const deleteUser = async (id, userLoggedId) => {
   const userLogged = await findUserById(userLoggedId);
   const user = await findUserById(id);

   if(userLogged.role != 'GERENCY' && userLogged.email != user.email){
      throw new Error('You dont have permission to delete different users');
   }
   
   await user.destroy();
};

const validatePhoneNumber = (num) => /\(\d{2}\)\d{4,5}-\d{4}/.test(num);
const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

module.exports = {
   findAllUsers,
   findUserById,
   userLogin,
   createUser,
   updateUser,
   deleteUser,
};
