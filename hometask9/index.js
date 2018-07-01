const express = require('express');
const path = require('path');
require('./config');

const routes = require('./routes');


const app = express();

app.set('view engine', 'ejs');
app.set('layout', 'layouts/general');
app.set('views', path.join(__dirname, 'views'));

routes(app);

app.listen(process.env.PORT, () => global.console.log(`Server started on localhost:${process.env.PORT}/`));
