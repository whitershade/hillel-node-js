const express = require('express');
const checkIfFileWithMessagesExists = require('./messages/checkIfFileWithMessagesExists');
const checkIfFileWithMessagesIsEmpty = require('./messages/checkIfFileWithMessagesIsEmpty');
const checkStructureOfCreatingMessage = require('./messages/checkStructureOfCreatingMessage');

const router = express.Router();

module.exports = router
  .use('/messages', checkIfFileWithMessagesExists)
  .use('/messages', checkIfFileWithMessagesIsEmpty)
  .use('/messages', checkStructureOfCreatingMessage);
