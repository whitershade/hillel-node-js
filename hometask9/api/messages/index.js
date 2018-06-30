const express = require('express');

const contollers = require('./controllers');
const checkStructureOfCreatingMessage = require('./middlewares');


const router = express.Router();


module.exports = router
  .get('/', contollers.getItems)
  .get('/new', contollers.renderCreateForm)
  .get('/:id', contollers.getItem)
  .post('/', checkStructureOfCreatingMessage, contollers.createItem);
