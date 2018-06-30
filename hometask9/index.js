const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');
require('./config');

const router = require('./api');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'views', 'styles'),
  dest: path.join(__dirname, 'views', 'assets'),
  outputStyle: 'compressed',
  prefix: '/assets',
}));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/general');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'views', 'assets', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(router);

app.listen(process.env.PORT, () => global.console.log(`Server started on localhost:${process.env.PORT}/`));
