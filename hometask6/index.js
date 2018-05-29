const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const expressLayouts = require('express-ejs-layouts');


const router = require('./routes');
const middlewares = require('./middlewares');

require('./utils/clearOutdatedMessages');

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
app.use(middlewares);
app.use(router);
app.all('/*', (req, res) => res.sendStatus(404));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => global.console.log(`Server started on localhost:${PORT}/`));
