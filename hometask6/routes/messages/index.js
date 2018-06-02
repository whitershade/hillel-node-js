const express = require('express');

const getRoot = require('./GET');
const postRoot = require('./POST');
const addNewMessage = require('./GET/new');


const router = express.Router();

module.exports = router
  .get('/', getRoot)
  .post('/', postRoot)
  .get('/new', addNewMessage);
