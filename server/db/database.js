const Sequelize = require('sequelize');
if (process.env.NODE_ENV !== 'production') {
  require('../../localsecrets');
}

// const db = new Sequelize(
//   process.env.DATABASE_URL || 'postgres://75.128.12.8:5432/victorfullstack',
//   {
//     logging: false, // unless you like the logs
//     // ...and there are many other options you may want to play with
//   }
// );

// uses home Ubuntu Server for database
const db = new Sequelize(
  'victorfullstack',
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: '75.128.12.8',
    dialect: 'postgres',
  }
);

module.exports = db;
