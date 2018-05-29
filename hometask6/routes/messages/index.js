const express = require('express');

const getRoot = require('./GET');
const postRoot = require('./POST');
const jsonPage = require('./GET/json');
const addNewMessage = require('./GET/new');
const getJsonMessage = require('./GET/json-message');
const getJsonMessages = require('./GET/json-messages');

const router = express.Router();

module.exports = router
  .get('/', getRoot)
  .post('/', postRoot)
  .get('/new', addNewMessage)
  .get('/json', jsonPage)
  .get('/get-json-message', getJsonMessage)
  .get('/get-json-messages', getJsonMessages);
