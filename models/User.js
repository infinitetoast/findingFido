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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  photo: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.INTEGER,
  },
  extra: {
    type: Sequelize.STRING,
  },
});

module.exports.createUser = (name, email, address, city, state, zip, extra, cb) => {
  User.sync().then(() =>
    User.create({
      name,
      email,
      address,
      city,
      state,
      zip,
      extra,
    }))
    .then(user => cb(null, user))
    .catch(err => cb(err));
};

// Creates a user with only the name and email filled out
// module.exports.initialCreateUser = (email, password, cb) => {
//   User.sync().then(() =>
//     User.create({
//       name: null,
//       email,
//       password,
//       address: null,
//       extra: null,
//       photo: null,
//       city: null,
//       state: null,
//       zip: null,
//     })
//       .then(user => cb(null, user))
//       .catch(err => cb(err)));
// };

// // Fills out the rest of the columns for a new user
// module.exports.finishUser = (userEmail, name, address, city, state, zip, extra, cb) => {
//   User.findOne({
//     email: userEmail,
//   })
//     .then((user) => {
//       user.updateAttributes({
//         name,
//         address,
//         city,
//         state,
//         zip,
//         extra,
//       })
//         .then(result => cb(null, result))
//         .catch(err => cb(err));
//     });
// };

module.exports.getUser = (email, cb) => {
  User.findOne({ email })
    .then(user => cb(null, user))
    .catch(err => cb(err));
};

module.exports.updateUser = (userEmail, updateKey, updateValue, cb) => {
  User.findOne({ email: userEmail })
    .then((user) => {
      user.updateAttributes({
        updateKey: updateValue,
      })
        .then(updated => cb(null, updated))
        .catch(err => cb(err));
    });
};

module.exports.deleteUser = (userEmail, cb) => {
  User.findOne({ email: userEmail })
    .then(user => user.destroy())
    .then(() => cb(null, 'Success'))
    .catch(err => cb(err));
};

// Only used in the development environment
module.exports.getUsers = (cb) => {
  User.findAll()
    .then(users => cb(null, users))
    .catch(err => cb(err));
};
