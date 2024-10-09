const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const reserveRoutes = require('./routes/reserveRoutes');
const createDefaultUser = require('./config/seeder');
const swagger = require('./swagger');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api/', roomRoutes);
app.use('/api/', reserveRoutes)

swagger(app);

require('dotenv').config();

sequelize.sync({force: false})
  .then(() => {
    createDefaultUser()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
