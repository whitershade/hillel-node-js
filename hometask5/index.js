const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');

const app = express();
const router = require('./routes');
const logger = require('./middlewares/logger');

const writeRequestsLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'requests.txt'), { flags: 'a' });

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(writeRequestsLogStream));
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);
app.use((err, req, res, next) => res.sendStatus(500));

app.all('/*', (req, res) => res.sendStatus(404));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}/`);
});
