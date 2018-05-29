const express = require('express');
const checkIfFileWithMessagesExists = require('./messages/checkIfFileWithMessagesExists');
const checkIfFileWithMessagesIsEmpty = require('./messages/checkIfFileWithMessagesIsEmpty');


const router = express.Router();

router.use('/', checkIfFileWithMessagesExists);
router.use('/', checkIfFileWithMessagesIsEmpty);


module.exports = router;
