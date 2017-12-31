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

const ToDoList = sequelize.define('ToDoList', {
  location: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
  emailPerson: {
    type: Sequelize.STRING,
  },
  email_user: {
    type: Sequelize.STRING,
  },
});

module.exports.createToDoList = (userEmail, location, time, date, emailPerson, cb) => {
  ToDoList.sync().then(() =>
    ToDoList.create({
      email_user: userEmail,
      time,
      location,
      date,
      emailPerson,
    })
      .then(result => cb(null, result))
      .catch(err => cb(err)));
};

module.exports.getUserToDoList = (userEmail, cb) => {
  ToDoList.findAll({ where: { email_user: userEmail } })
    .then(todo => cb(null, todo))
    .catch(err => cb(err));
};
