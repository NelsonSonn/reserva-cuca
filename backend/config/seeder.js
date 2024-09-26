const User = require('../models/User');

async function createDefaultUser() {
  try {
    const user = await User.findOne({ where: { email: 'gerencia@redecuca.com' } });
    if (!user) {
      await User.create({
        name: 'Gerencia',
        email: 'gerencia@redecuca.com',
        password: 'gerencia@cuca',
        role: 'GERENCY',
        telephone: '(85)9 9999-9999'
      });
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = createDefaultUser;