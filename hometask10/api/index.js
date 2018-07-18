const { Router } = require('express');

const routes = Router();

// Users API
routes.use('/users', require('./users/'));


module.exports = routes;
