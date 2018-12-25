const db = require('./database');
const Sequelize = require('sequelize');

// created my own sessions table where you can vary the postgres schema
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
    schema: 'test', // Can change schema to whatever you want
  }
);

module.exports = Sessions;
