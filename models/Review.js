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

const Review = sequelize.define('review', {
  body: {
    type: Sequelize.STRING,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.createReview = (user, body, cb) => {
  Review.sync({ force: true }).then(() => {
    return Review.create({
      body: body,
      id_User: user,
    })
      .then((review) => {
        cb(null, review);
      })
      .catch((err) => {
        cb(err);
      });
  });
};
