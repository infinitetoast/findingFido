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

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  photo: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  extra: {
    type: Sequelize.STRING,
  },
});

module.exports.createUser = (name, email, password, address, extra, cb) => {
  User.sync({ force: true }).then(() => {
    return User.create({
      name: name,
      email: email,
      password: password,
      address: address,
      extra: extra,
      photo: null,
    })
      .then(user => cb(null, user))
      .catch(err => cb(err));
  });
};

// Used for testing purposes only, will be deleted in production
module.exports.getUser = (email, cb) => {
  User.findOne({ email: email })
    .then(user => cb(null, user))
    .catch(err => cb(err));
};
