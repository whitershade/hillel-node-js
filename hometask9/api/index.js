const express = require('express');
const messages = require('./messages');


const router = express.Router();

router.use('/messages', messages);

router
  .get('/', (req, res) => {
    res.redirect('/messages');
  });

router.all('/*', (req, res) => res.sendStatus(404));


module.exports = router;
