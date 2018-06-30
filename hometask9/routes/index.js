const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');

const api = require('../api');


module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(sassMiddleware({
    src: path.join(__dirname, '..', 'views', 'styles'),
    dest: path.join(__dirname, '..', 'views', 'assets'),
    outputStyle: 'compressed',
    prefix: '/assets',
  }));
  app.use(expressLayouts);
  app.use(favicon(path.join(__dirname, '..', 'views', 'assets', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, '..', 'views')));

  app.use('/', api);

  app.use((err, req, res, next) => {
    res.status(400).send({ message: err && err.message ? err.message : err });
  });
};
