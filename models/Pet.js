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

const Pet = sequelize.define('pet', {
  name: {
    type: Sequelize.STRING,
  },
  kind: {
    type: Sequelize.STRING,
  },
  characteristics: {
    type: Sequelize.STRING,
  },
  id_User: {
    type: Sequelize.INTEGER,
  },
});

module.exports.createPet = (name, kind, characteristics, userId, cb) => {
  Pet.sync({ force: true }).then(() => {
    return Pet.create({
      name: name,
      kind: kind,
      characteristics: characteristics,
      id_User: userId,
    })
      .then(pet => cb(null, pet))
      .catch(err => cb(err));
  });
};