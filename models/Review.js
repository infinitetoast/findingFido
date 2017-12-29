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

const Review = sequelize.define('review', {
  body: {
    type: Sequelize.STRING,
  },
  email_user: {
    type: Sequelize.STRING,
  },
});

module.exports.createReview = (userEmail, body, cb) => {
  Review.sync().then(() =>
    Review.create({
      body,
      email_user: userEmail,
    })
      .then(review => cb(null, review))
      .catch(err => cb(err)));
};
