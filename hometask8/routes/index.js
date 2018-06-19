const express = require('express');
const json = require('./json');
const messages = require('./messages');
const Message = require('../models/message');


const router = express.Router();

router.use('/json', json);
router.use('/messages', messages);

router
  .get('/', (req, res) => {
    Message
      .find()
      .then((messages) => {
        res.render('pages/messages', { title: 'Messages', messages });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  });

router.all('/*', (req, res) => res.sendStatus(404));


module.exports = router;
