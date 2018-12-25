const db = require('./database');
const Sequelize = require('sequelize');

const Sessions = db.define(
  'Sessions',
  {
    sid: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    expires: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    data: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    schema: 'test',
  }
);

module.exports = Sessions;
