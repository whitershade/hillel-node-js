const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/home');
});

router.get('/images', (req, res) => {
  res.render('pages/images');
});


module.exports = router;
