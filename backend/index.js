const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const swagger = require('./swagger');
const createDefaultUser = require('./config/seeder');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api/', roomRoutes);

swagger(app);

require('dotenv').config();

sequelize.sync()
  .then(() => {
    createDefaultUser()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
