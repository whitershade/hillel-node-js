const express = require('express');

const contollers = require('./controllers');
const validation = require('./validation');
const middlewares = require('./middlewares');


const router = express.Router();


module.exports = router
  .get(
    '/',
    contollers.getItems,
  )
  .get(
    '/new',
    contollers.renderCreateForm,
  )
  .get(
    '/:id',
    contollers.getItem,
  )
  .post(
    '/',
    middlewares.validate(validation.addNewMessage),
    contollers.createItem,
  );
