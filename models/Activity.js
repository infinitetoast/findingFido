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

const Activity = sequelize.define('activity', {
  body: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.DATE,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.createActivity = (body, location, userId, time) => {
  Activity.sync({ force: true }).then(() => {
    return Activity.create({
      body: body,
      id_User: userId,
      time: time,
      location: location,
    });
  });
};
