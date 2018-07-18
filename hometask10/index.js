require('./config');
const express = require('express');
const routes = require('./routes');

const app = express();

routes(app);

app.listen(process.env.PORT, () => {
  global.console.log(`Server started with env: ${process.env.NODE_ENV} on port ${process.env.PORT}`);
});


module.exports = app;
