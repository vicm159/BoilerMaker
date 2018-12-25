const db = require('./database');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

const Users = db.define(
  'users',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    googleId: {
      type: Sequelize.STRING,
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue:
        'http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg',
    },
    password: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
  },
  {
    schema: 'test',
  }
);

// instance methods
Users.prototype.correctPassword = function(candidatePassword) {
  return Users.encryptPassword(candidatePassword, this.salt) === this.password;
};

// Users.prototype.sanitize = function() {
//   return _.omit(this.toJSON(), ['password', 'salt']);
// };

// class methods
Users.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

Users.encryptPassword = function(plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword(user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = Users.generateSalt();
    user.password = Users.encryptPassword(user.password, user.salt);
  }
}

Users.beforeCreate(setSaltAndPassword);

Users.beforeUpdate(setSaltAndPassword);

module.exports = Users;
