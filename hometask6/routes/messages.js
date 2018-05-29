const messages = [{ createdAt: '11.12.2003', user: 'user', message: 'message' }];

const express = require('express');

const router = express.Router();

router
  .get('/', (req, res) => {
    res.send(messages);
  });


module.exports = router;
