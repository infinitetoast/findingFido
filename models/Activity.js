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

const Activity = sequelize.define('activity', {
  location: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
  email_user: {
    type: Sequelize.STRING,
  },
});

module.exports.createActivity = (userEmail, location, time, date, cb) => {
  Activity.sync({ force: true }).then(() =>
    Activity.create({
      email_user: userEmail,
      time,
      location,
      date,
    })
      .then(result => cb(null, result))
      .catch(err => cb(err)));
};

module.exports.getUserActivities = (userEmail, cb) => {
  Activity.find({ email_user: userEmail })
    .then(activities => cb(null, activities))
    .catch(err => cb(err));
};

module.exports.getActivitiesByTime = (time, date, cb) => {
  Activity.findAll({ time, date })
    .then(activities => cb(null, activities))
    .catch(err => cb(err));
};
