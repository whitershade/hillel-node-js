const api = require('./api');
const express = require('express');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsersModel = require('./api/users/model').model;


module.exports = (app) => {
  app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
      maxAge: 100000,
    },
    store: new MongoDBStore({
      uri: process.env.MONGODB_URI,
      collection: 'mySessions',
    }),
  }));

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    UsersModel.checkUser.bind(UsersModel),
  ));

  passport.serializeUser(UsersModel.serializeUser.bind(UsersModel));
  passport.deserializeUser(UsersModel.deserializeUser.bind(UsersModel));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api', api);

  app.use((err, req, res, next) => {
    console.error('SOME ERR', err);
    res.status(400).send({ message: err && err.message ? err.message : err });
  });
};
