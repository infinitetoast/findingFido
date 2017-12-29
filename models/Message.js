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

const Message = sequelize.define('message', {
  body: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  email_user: {
    type: Sequelize.STRING,
  },
});

module.exports.createMessage = (body, userEmail, cb) => {
  Message.sync().then(() =>
    Message.create({
      body,
      email_user: userEmail,
      createdAt: new Date(),
    })
      .then(result => cb(null, result))
      .catch(err => cb(err)));
};
