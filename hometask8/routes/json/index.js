const express = require('express');

const jsonPage = require('./GET/json');
const getJsonMessage = require('./GET/json-messages');


const router = express.Router();

module.exports = router
  .get('/', jsonPage)
  .get('/get-json-messages', getJsonMessage);
