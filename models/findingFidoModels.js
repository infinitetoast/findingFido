const Sequelize = require('sequelize');

const sequelize = new Sequelize('finding_fido', 'PrestonWinstead', null, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

User.sync({ force: true }).then(() => {
  return User.create({
    firstName: 'John',
    lastName: 'Hancock',
  });
});

const Pet = sequelize.define('pet', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

Pet.sync({ force: true }).then(() => {
  return Pet.create({
    firstName: 'John',
    lastName: 'Hancock',
  });
});

const Message = sequelize.define('message', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

Message.sync({ force: true }).then(() => {
  return Message.create({
    firstName: 'John',
    lastName: 'Hancock',
  });
});
