const Sequelize = require('sequelize');

const sequelize = new Sequelize('finding_fido', 'PrestonWinstead', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Message = sequelize.define('message', {
  body: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.createMessage = (body, userId) => {
  Message.sync({ force: true }).then(() => {
    return Message.create({
      body: body,
      id_User: userId,
      createdAt: new Date(),
    });
  });
};
