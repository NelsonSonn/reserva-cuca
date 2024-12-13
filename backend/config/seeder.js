const User = require('../models/User');
const { encryptPassword } = require('../utils/passwordUtils');

async function createDefaultUser() {
  try {
    const user = await User.findOne({ where: { email: 'gerencia@redecuca.com' } });
    if (!user) {
      const hashedPassword = await encryptPassword('gerencia@cuca');
      await User.create({
        name: 'Gerencia',
        email: 'gerencia@redecuca.com',
        password: hashedPassword,
        role: 'GERENCY',
        telephone: '(85)99999-9999'
      });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = createDefaultUser;