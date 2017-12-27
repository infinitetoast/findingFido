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

const Photo = sequelize.define('photo', {
  url: {
    type: Sequelize.STRING,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.addPhoto = (url, userId) => {
  Photo.sync({ force: true }).then(() => {
    return Photo.create({
      url: url,
      id_User: userId,
    });
  });
};