const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://bvjcwjye:YkiJ4pvf6lTtuJDyp8v23KqGQoeuasvL@baasu.db.elephantsql.com:5432/bvjcwjye', {
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
  email_user: {
    type: Sequelize.STRING,
  },
});

module.exports.addPhoto = (url, userEmail, cb) => {
  Photo.sync({ force: true }).then(() =>
    Photo.create({
      url,
      email_user: userEmail,
    })
      .then(result => cb(null, result))
      .catch(err => cb(err)));
};

module.exports.findUserPhotos = (userEmail, cb) => {
  Photo.findAll({ where: { email_user: userEmail } })
    .then(photos => cb(null, photos))
    .catch(err => cb(err));
};
