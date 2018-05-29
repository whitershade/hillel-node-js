const express = require('express');

const images = require('./images');
const messages = require('./messages');


const router = express.Router();

router.use('/images', images);
router.use('/messages', messages);

router.get('/', (req, res) => {
  res.render('pages/home');
});


module.exports = router;
