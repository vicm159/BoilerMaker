const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const session = require('express-session');
const passport = require('passport');
const { db, Users } = require('./db');
const app = express();
if (process.env.NODE_ENV !== 'production') {
  require('../localsecrets');
}

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static middleware
app.use(express.static(path.join(__dirname, '../public')));

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Uses the Sessions table i defined sessions.js file On a side note
// I noticed I did not have to include the postgres schema for this to
// work am wondering what would happen if we had a Sessions table in
// the public schema
const dbStore = new SequelizeStore({ db: db, table: 'Sessions' });

// sessions middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: dbStore, // this is using postgres db for session storage
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  Users.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use('/auth', require('./auth'));
app.use('/api', require('./routes'));

// send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app;
