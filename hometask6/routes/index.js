const express = require('express');

const images = require('./images');
const messages = require('./messages');
const json = require('./json');


const router = express.Router();

router.use('/images', images);
router.use('/messages', messages);
router.use('/json', json);

router.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home' });
});

router.all('/*', (req, res) => res.sendStatus(404));


module.exports = router;
