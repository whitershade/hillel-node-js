const express = require('express');
const checkIfFileWithMessagesExists = require('./messages/checkIfFileWithMessagesExists');
const checkIfFileWithMessagesIsEmpty = require('./messages/checkIfFileWithMessagesIsEmpty');
const checkStructureOfCreatingMessage = require('./messages/checkStructureOfCreatingMessage');


const router = express.Router();

router.use('/messages', checkIfFileWithMessagesExists);
router.use('/messages', checkIfFileWithMessagesIsEmpty);
router.use('/messages', checkStructureOfCreatingMessage);


module.exports = router;
